require("dotenv").config();
require("express-async-errors");

// Serveur HTTPS
// const fs = require("fs");
// const https = require("https");

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const logger = require("./logger.js");
// swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// middleware
const authenticateUser = require("./middleware/authentication.js");
const notFound = require("./middleware/notFound.js");
// ROUTES
const authRouter = require("./routes/auth.js");
const usersRouter = require("./routes/users.js");
const houseTypesRouter = require("./routes/houseTypes.js");
const reservationsRouter = require("./routes/reservations.js");

// CREATE APP
const app = express();
app.use(express.json());
app.use(cors());

// DB CONNECTION
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    logger.error("Database connection failed:", err);
  } else {
    logger.info("Connected to database");
  }
});

// Serveur HTTPS
// Avec les fichier a la racine
// const sslOptions = {
//   key: fs.readFileSync("server.key"), // Clé privée SSL
//   cert: fs.readFileSync("server.cert"), // Certificat SSL
// };

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Camping Security",
      version: "1.0.0",
      description: "Une API pour l'authentification des utilisateurs",
    },
    servers: [
      {
        // Serveur HTTPS
        // url: "https://localhost:5000/api/v1",
        // Serveur HTTP
        url: "http://localhost:5000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// swagger doc
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// routes
app.use("/api/v1/users", authenticateUser(["admin"]), usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/houseTypes", houseTypesRouter);
app.use("/api/v1/reservations", reservationsRouter);

app.use(notFound);

// Serveur HTTPS
// const httpsServer = https.createServer(sslOptions, app);

// Serveur HTTPS
// httpsServer.listen(5000, () => {
//   console.log("Le serveur HTTPS écoute sur https://localhost:5000");
// });

// Serveur HTTP
app.listen(5000, () => {
  console.log("Le serveur HTTPS écoute sur http://localhost:5000");
});
