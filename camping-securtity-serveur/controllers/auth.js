const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { body, validationResult } = require("express-validator");
const logger = require("../logger");

const generateToken = (userId, firstName, role = "client") => {
  return jwt.sign(
    { userID: userId, firstName: firstName, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new BadRequestError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      )
    );
  }

  const { firstName, lastName, email, password, role = "client" } = req.body; // Récupérer le rôle, ou "user" par défaut

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      logger.info(`Register : Email déjà utilisé`);
      return next(new BadRequestError("Email déjà utilisé"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      "INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)", // Ajouter le champ role
      [firstName, lastName, email, hashedPassword, role]
    );

    const token = generateToken(result.insertId, firstName, role); // Passer le rôle lors de la création du token

    logger.info(`Register : User connecter ${email}`);

    res.status(StatusCodes.CREATED).json({ token, user: { firstName, role } }); // Inclure le rôle dans la réponse
  } catch (error) {
    logger.info(`Register : Erreur serveur`);
    return next(new BadRequestError("Erreur serveur"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.info(`Login : Veuillez fournir un email et un mot de passe`);
    return next(
      new BadRequestError("Veuillez fournir un email et un mot de passe")
    );
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      logger.error(`Login : Identifiants incorrects`);
      throw new BadRequestError("Identifiants incorrects");
    }

    const user = rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      logger.error(`Login : Identifiants incorrects`);
      throw new BadRequestError("Identifiants incorrects");
    }

    const token = generateToken(user.id, user.firstName, user.role);
    logger.info(`Login : User connecter ${email}`);

    res.status(StatusCodes.OK).json({
      token,
      user: { firstName: user.firstName, id: user.id, role: user.role },
    });
  } catch (error) {
    logger.error(`Login : Erreur serveur`);
    return next(new BadRequestError("Erreur serveur"));
  }
};

module.exports = { register, login };
