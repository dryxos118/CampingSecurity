const winston = require("winston");
const moment = require("moment");

// Configuration du logger
const logger = winston.createLogger({
  level: "info", // Niveau des logs
  transports: [
    // Log dans la console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          // Format de la date : 27/10/2024-13:54
          const formattedDate = moment().format("DD/MM/YYYY-HH:mm");
          return `[${level.toUpperCase()}] ${formattedDate} - ${message} ${
            stack || ""
          }`;
        })
      ),
    }),
    // Log dans un fichier avec la date du jour
    new winston.transports.File({
      filename: `logs/log-${moment().format("YYYY-MM-DD")}.log`, // Utilise moment pour la date
      level: "info", // Niveau des logs pour ce fichier
      format: winston.format.combine(
        winston.format.timestamp(), // Timestamp
        winston.format.printf(({ level, message, timestamp, stack }) => {
          // Format personnalisé pour les logs dans le fichier
          const formattedDate = moment().format("DD/MM/YYYY-HH:mm"); // Format de la date
          return `[${level.toUpperCase()}] ${formattedDate} - ${message} ${
            stack || ""
          }`;
        })
      ),
    }),
  ],
});

module.exports = logger;
