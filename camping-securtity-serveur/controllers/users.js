const db = require("../db");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { body, validationResult } = require("express-validator");

const getUsers = async (req, res, next) => {
  try {
    const [result] = await db.query("SELECT * FROM users");

    if (result.length === 0) {
      return next(new NotFoundError("Aucun utilisateur trouvé."));
    }

    res.status(StatusCodes.OK).json({ users: result });
  } catch (error) {
    console.error(error);
    return next(new BadRequestError("Erreur serveur"));
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    const [result] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (result.length === 0) {
      return next(new NotFoundError("Aucun utilisateur trouvé."));
    }

    res.status(StatusCodes.OK).json({ users: result });
  } catch (error) {
    console.error(error);
    return next(new BadRequestError("Erreur serveur"));
  }
};

module.exports = { getUsers, getUsersById };
