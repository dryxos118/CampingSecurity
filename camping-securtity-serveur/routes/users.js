const express = require("express");
const router = express.Router();
const { getUsers, getUsersById } = require("../controllers/users");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Opérations liées aux utilisateurs
 */

/**
 * @swagger
 *  /users/getUsers:
 *   get:
 *     tags:
 *       - "Users"
 *     summary: "Récupérer tous les utilisateurs"
 *     description: "Cette route permet de récupérer la liste de tous les utilisateurs."
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Succès - Liste des utilisateurs"
 *       401:
 *         description: "Authentification invalide"
 *       500:
 *         description: "Erreur serveur"
 */
router.route("/getUsers").get(getUsers);

/**
 * @swagger
 *  /users/getUserById/{id}:
 *   get:
 *     tags:
 *       - "Users"
 *     summary: "Récupérer un utilisateur par son ID"
 *     description: "Cette route permet de récupérer un utilisateur spécifique par son ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID de l'utilisateur à récupérer"
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Succès - Utilisateur trouvé"
 *       400:
 *         description: "Erreur - ID invalide"
 *       401:
 *         description: "Authentification invalide"
 *       404:
 *         description: "Erreur - Utilisateur non trouvé"
 *       500:
 *         description: "Erreur serveur"
 */
router.route("/getUserById/:id").get(getUsersById);

module.exports = router;
