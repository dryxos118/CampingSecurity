const express = require("express");
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Créer une nouvelle réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               houseTypeId:
 *                 type: integer
 *               clientName:
 *                 type: string
 *               email:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               totalAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Erreur de requête
 */
router.post("/", createReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Récupérer toutes les réservations
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get("/", getAllReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Récupérer une réservation par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation introuvable
 */
router.get("/:id", getReservationById);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     tags: [Reservations]
 *     summary: Mettre à jour une réservation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               houseTypeId:
 *                 type: integer
 *               clientName:
 *                 type: string
 *               email:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ['en attente', 'confirmée', 'annulée']
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation introuvable
 */
router.put("/:id", updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags: [Reservations]
 *     summary: Supprimer une réservation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation introuvable
 */
router.delete("/:id", deleteReservation);

module.exports = router;
