const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth.js");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Opérations liées à l'authentification
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - "Auth"
 *     summary: Connecter un utilisateur
 *     description: Permet de connecter un utilisateur et de générer un token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "AH@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie avec un token
 *       400:
 *         description: Erreur d'authentification
 */
router.route("/login").post(login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - "Auth"
 *     summary: Enregistrer un nouvel utilisateur
 *     description: Crée un utilisateur avec un mot de passe sécurisé et retourne un token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "AH"
 *               lastName:
 *                 type: string
 *                 example: "AH"
 *               email:
 *                 type: string
 *                 example: "AH@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans les données envoyées
 */
router.route("/register").post(register);

module.exports = router;
