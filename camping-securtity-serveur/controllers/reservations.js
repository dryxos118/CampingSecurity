const db = require("../db");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const logger = require("../logger");

const createReservation = async (req, res, next) => {
  const {
    userId,
    houseTypeId,
    clientName,
    email,
    checkInDate,
    checkOutDate,
    totalAmount,
  } = req.body;

  if (
    !userId ||
    !houseTypeId ||
    !clientName ||
    !email ||
    !checkInDate ||
    !checkOutDate ||
    !totalAmount
  ) {
    const errorMsg = "Tous les champs sont obligatoires.";
    logger.error(`createReservation: ${errorMsg}`);
    return next(new BadRequestError(errorMsg));
  }

  try {
    const [userExists] = await db.query("SELECT id FROM users WHERE id = ?", [
      userId,
    ]);
    if (userExists.length === 0) {
      const errorMsg = `Aucun utilisateur trouvé pour l'ID ${userId}.`;
      logger.error(`createReservation: ${errorMsg}`);
      throw new BadRequestError(errorMsg);
    }

    const [houseTypeExists] = await db.query(
      "SELECT id FROM houseTypes WHERE id = ?",
      [houseTypeId]
    );
    if (houseTypeExists.length === 0) {
      const errorMsg = `Aucun type de maison trouvé pour l'ID ${houseTypeId}.`;
      logger.error(`createReservation: ${errorMsg}`);
      throw new BadRequestError(errorMsg);
    }

    const [result] = await db.query(
      "INSERT INTO reservations (userId, houseTypeId, clientName, email, checkInDate, checkOutDate, totalAmount) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        houseTypeId,
        clientName,
        email,
        checkInDate,
        checkOutDate,
        totalAmount,
      ]
    );

    res.status(StatusCodes.CREATED).json({ id: result.insertId });
  } catch (error) {
    logger.error(`createReservation: ${error.message}`);
    next(new BadRequestError("Impossible de créer la réservation."));
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const [reservations] = await db.query(`
      SELECT 
        reservations.*, 
        users.firstName AS userFirstName, 
        users.lastName AS userLastName, 
        houseTypes.name AS houseTypeName 
      FROM reservations
      INNER JOIN users ON reservations.userId = users.id
      INNER JOIN houseTypes ON reservations.houseTypeId = houseTypes.id
    `);

    res.status(StatusCodes.OK).json(reservations);
  } catch (error) {
    logger.error(`getAllReservations: ${error.message}`);
    next(new BadRequestError("Impossible de récupérer les réservations."));
  }
};

const getReservationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [reservations] = await db.query(
      `
      SELECT 
        reservations.*, 
        users.firstName AS userFirstName, 
        users.lastName AS userLastName, 
        houseTypes.name AS houseTypeName 
      FROM reservations
      INNER JOIN users ON reservations.userId = users.id
      INNER JOIN houseTypes ON reservations.houseTypeId = houseTypes.id
      WHERE reservations.id = ?
      `,
      [id]
    );

    if (reservations.length === 0) {
      const errorMsg = `Aucune réservation trouvée pour l'ID ${id}.`;
      logger.error(`getReservationById: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    res.status(StatusCodes.OK).json(reservations[0]);
  } catch (error) {
    logger.error(`getReservationById: ${error.message}`);
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  const { id } = req.params;
  const {
    houseTypeId,
    clientName,
    email,
    checkInDate,
    checkOutDate,
    totalAmount,
    status,
  } = req.body;

  try {
    const [reservationExists] = await db.query(
      "SELECT id FROM reservations WHERE id = ?",
      [id]
    );
    if (reservationExists.length === 0) {
      const errorMsg = `Aucune réservation trouvée pour l'ID ${id}.`;
      logger.error(`updateReservation: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    const [result] = await db.query(
      `
      UPDATE reservations 
      SET houseTypeId = ?, clientName = ?, email = ?, checkInDate = ?, checkOutDate = ?, totalAmount = ?, status = ? 
      WHERE id = ?
      `,
      [
        houseTypeId,
        clientName,
        email,
        checkInDate,
        checkOutDate,
        totalAmount,
        status,
        id,
      ]
    );

    res
      .status(StatusCodes.OK)
      .json({ id, message: "Réservation mise à jour avec succès." });
  } catch (error) {
    logger.error(`updateReservation: ${error.message}`);
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM reservations WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      const errorMsg = `Aucune réservation trouvée pour l'ID ${id}.`;
      logger.error(`deleteReservation: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    logger.error(`deleteReservation: ${error.message}`);
    next(error);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
