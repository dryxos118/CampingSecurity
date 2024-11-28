const db = require("../db");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const logger = require("../logger");

const createHouseType = async (req, res, next) => {
  const { name, price, place } = req.body;

  if (!name || price === undefined || place === undefined) {
    const errorMsg =
      "Les champs 'name', 'price', et 'place' sont obligatoires.";
    logger.error(`createHouseType: ${errorMsg}`);
    return next(new BadRequestError(errorMsg));
  }

  try {
    const [result] = await db.query(
      "INSERT INTO houseTypes (name, price, place) VALUES (?, ?, ?)",
      [name, price, place]
    );
    res
      .status(StatusCodes.CREATED)
      .json({ id: result.insertId, name, price, place });
  } catch (error) {
    logger.error(`createHouseType: ${error.message}`);
    next(new BadRequestError("Impossible de créer le type de maison."));
  }
};

const getAllHouseTypes = async (req, res, next) => {
  try {
    const [houseTypes] = await db.query("SELECT * FROM houseTypes ORDER BY id");
    res.status(StatusCodes.OK).json(houseTypes);
  } catch (error) {
    logger.error(`getAllHouseTypes: ${error.message}`);
    next(new BadRequestError("Impossible de récupérer les types de maison."));
  }
};

const getHouseTypeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [houseTypes] = await db.query(
      "SELECT * FROM houseTypes WHERE id = ?",
      [id]
    );

    if (houseTypes.length === 0) {
      const errorMsg = `Aucun type de maison trouvé pour l'ID ${id}.`;
      logger.error(`getHouseTypeById: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    res.status(StatusCodes.OK).json(houseTypes[0]);
  } catch (error) {
    logger.error(`getHouseTypeById: ${error.message}`);
    next(error);
  }
};

const updateHouseType = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, place } = req.body;

  if (!name || price === undefined || place === undefined) {
    const errorMsg =
      "Les champs 'name', 'price', et 'place' sont obligatoires.";
    logger.error(`updateHouseType: ${errorMsg}`);
    return next(new BadRequestError(errorMsg));
  }

  try {
    const [result] = await db.query(
      "UPDATE houseTypes SET name = ?, price = ?, place = ? WHERE id = ?",
      [name, price, place, id]
    );

    if (result.affectedRows === 0) {
      const errorMsg = `Aucun type de maison trouvé pour l'ID ${id}.`;
      logger.error(`updateHouseType: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    res.status(StatusCodes.OK).json({ id, name, price, place });
  } catch (error) {
    logger.error(`updateHouseType: ${error.message}`);
    next(error);
  }
};

const deleteHouseType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM houseTypes WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      const errorMsg = `Aucun type de maison trouvé pour l'ID ${id}.`;
      logger.error(`deleteHouseType: ${errorMsg}`);
      throw new NotFoundError(errorMsg);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Type de maison supprimé avec succès." });
  } catch (error) {
    logger.error(`deleteHouseType: ${error.message}`);
    next(error);
  }
};

module.exports = {
  createHouseType,
  getAllHouseTypes,
  getHouseTypeById,
  updateHouseType,
  deleteHouseType,
};
