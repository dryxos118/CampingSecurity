const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const logger = require("../logger");

const auth = (requiredRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.error(`auth : Authentification invalide`);
      throw new UnauthenticatedError("Authentification invalide");
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        userID: payload.userID,
        name: payload.firstName,
        role: payload.role,
      };

      logger.info(`user : ${req.user.name} : role : ${req.user.role}`);

      if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
        logger.error(`auth : Accès non autorisé pour ce rôle`);
        throw new UnauthorizedError("Accès non autorisé pour ce rôle");
      }

      next();
    } catch (error) {
      logger.error(`auth : Authentification invalide : ${error}`);
      throw new UnauthenticatedError("Authentification invalide");
    }
  };
};

module.exports = auth;
