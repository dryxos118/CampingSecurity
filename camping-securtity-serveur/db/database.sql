CREATE DATABASE IF NOT EXISTS camping_security;

-- Sélectionner la base de données
USE camping_security;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'admin') DEFAULT 'client'
);

-- Table des types de maisons
CREATE TABLE IF NOT EXISTS houseTypes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  capacity INT NOT NULL
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  houseTypeId INT,
  clientName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  checkInDate DATE NOT NULL,
  checkOutDate DATE NOT NULL,
  status ENUM('en attente', 'confirmée', 'annulée') DEFAULT 'en attente',
  totalAmount FLOAT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (houseTypeId) REFERENCES houseTypes(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO houseTypes (name, price, capacity)
VALUES
  ('Tente Standard', 20.00, 2),
  ('Tente Familiale', 35.00, 5),
  ('Chalet en Bois', 70.00, 4),
  ('Mobil-Home Luxe', 120.00, 6),
  ('Cabane dans les Arbres', 150.00, 3);