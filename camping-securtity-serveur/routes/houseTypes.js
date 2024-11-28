const express = require("express");
const {
  createHouseType,
  getAllHouseTypes,
  getHouseTypeById,
  updateHouseType,
  deleteHouseType,
} = require("../controllers/houseTypes");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HouseTypes
 *   description: Gestion des types de maison
 */

/**
 * @swagger
 * /houseTypes:
 *   post:
 *     tags: [HouseTypes]
 *     summary: Créer un nouveau type de maison
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tente Standard
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 20.00
 *               place:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Type de maison créé avec succès
 *       400:
 *         description: Erreur de requête
 */
router.post("/", createHouseType);

/**
 * @swagger
 * /houseTypes:
 *   get:
 *     tags: [HouseTypes]
 *     summary: Récupérer tous les types de maison
 *     responses:
 *       200:
 *         description: Liste des types de maison
 */
router.get("/", getAllHouseTypes);

/**
 * @swagger
 * /houseTypes/{id}:
 *   get:
 *     tags: [HouseTypes]
 *     summary: Récupérer un type de maison par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du type de maison
 *     responses:
 *       200:
 *         description: Détails du type de maison
 *       404:
 *         description: Type de maison introuvable
 */
router.get("/:id", getHouseTypeById);

/**
 * @swagger
 * /houseTypes/{id}:
 *   put:
 *     tags: [HouseTypes]
 *     summary: Mettre à jour un type de maison
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du type de maison
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chalet en Bois
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 70.00
 *               place:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Type de maison mis à jour
 *       404:
 *         description: Type de maison introuvable
 */
router.put("/:id", updateHouseType);

/**
 * @swagger
 * /houseTypes/{id}:
 *   delete:
 *     tags: [HouseTypes]
 *     summary: Supprimer un type de maison
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du type de maison
 *     responses:
 *       200:
 *         description: Type de maison supprimé avec succès
 *       404:
 *         description: Type de maison introuvable
 */
router.delete("/:id", deleteHouseType);

module.exports = router;
