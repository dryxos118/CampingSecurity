# Camping Security API

## Description

Camping Security est une API RESTful utilisée pour gérer l'authentification des utilisateurs, les types d'hébergement, les réservations et l'accès sécurisé via des tokens JWT. Cette application est conçue pour fournir une gestion des utilisateurs et des réservations pour un service de camping.

## Stack technologique utilisée

- **Node.js** : JavaScript runtime pour exécuter le serveur et la logique backend.
- **Express** : Framework minimaliste pour créer des APIs RESTful.
- **JWT (JSON Web Tokens)** : Pour l'authentification sécurisée des utilisateurs.
- **MySQL** : Base de données relationnelle pour stocker les informations des utilisateurs, des réservations et des types d'hébergement.
- **Swagger** : Documentation interactive pour tester et documenter les API.
- **Bcrypt** : Pour le hachage sécurisé des mots de passe.
- **Winston** : Outil de logging pour gérer les erreurs et les informations du serveur.
- **HTTPS** : Sécurisation de la communication via SSL/TLS.

## Fonctionnalités

- Authentification des utilisateurs (avec JWT)
- Création, lecture, mise à jour et suppression des utilisateurs
- Gestion des types d'hébergement (ajout, récupération des types disponibles)
- Gestion des réservations (création, lecture, modification)
- Accès sécurisé avec des rôles d'utilisateur (Admin, Client)

## Installation

### Prérequis

- **Node.js** : Assurez-vous que Node.js est installé. Vous pouvez vérifier en exécutant `node -v` dans votre terminal.
- **MySQL** : Assurez-vous d'avoir MySQL installé et une base de données configurée.

### Étapes d'installation

1. **Clonez le repository**

```bash
git clone https://github.com/votre-utilisateur/camping-security-api.git
cd camping-security-api
```

2. **Installez les dépendances**

```bash
npm i
```

3. **Configuration de la base de données**

Créez une base de données MySQL nommée camping_paradise et appliquez la structure des tables (voir la section SQL ci-dessous).

4. **Fichier .env**

Créez un fichier .env à la racine du projet avec les configurations suivantes :

```plainetext
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=1d
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=camping_paradise
```

4. **Démarrer le serveur**

Une fois toutes les configurations effectuées, lancez le serveur :

```bash
npm start
```

Le serveur écoutera sur http://localhost:5000.

5. **(Facultatif) Https**

Génerer un certificat

#### local

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

#### Certificats Valides

Utilisez Let's Encrypt pour générer des certificats SSL valides gratuitement. Cela élimine les avertissements des navigateurs.

Enlever les commentaire qui commence par

```js
// Serveur HTTPS
```

Et commentais les

```js
// Serveur HTTP
```

## Endpoints API

### Authentification

#### `POST /api/v1/auth/login`

- **Description** : Connecter un utilisateur et retourner un token JWT.
- **Paramètres requis** : `email`, `password` dans le corps de la requête.
- **Réponse** : Retourne un token JWT et les informations de l'utilisateur.

#### `POST /api/v1/auth/register`

- **Description** : Créer un nouvel utilisateur.
- **Paramètres requis** : `firstName`, `lastName`, `email`, `password` dans le corps de la requête.
- **Réponse** : Retourne un token JWT et les informations de l'utilisateur.

### Utilisateurs

#### `GET /api/v1/users`

- **Description** : Obtenir la liste de tous les utilisateurs.
- **Sécurisé avec JWT (rôle admin uniquement)**

#### `GET /api/v1/users/:id`

- **Description** : Obtenir les détails d'un utilisateur spécifique.

### Types d'hébergement

#### `GET /api/v1/houseTypes`

- **Description** : Obtenir la liste des types d'hébergement disponibles.

#### `POST /api/v1/houseTypes`

- **Description** : Ajouter un nouveau type d'hébergement.
- **Paramètres requis** : `name` (nom du type d'hébergement).

### Réservations

#### `POST /api/v1/reservations`

- **Description** : Créer une nouvelle réservation.
- **Paramètres requis** : `userId`, `houseTypeId`, `clientName`, `email`, `checkInDate`, `checkOutDate`, `totalAmount`.

#### `GET /api/v1/reservations`

- **Description** : Récupérer toutes les réservations.

## Sécurisation de l'API

L'API est sécurisée principalement en utilisant les mécanismes suivants :

### Authentification avec JWT

L'authentification des utilisateurs repose sur **JSON Web Tokens (JWT)**. Lorsqu'un utilisateur se connecte via le point de terminaison `/auth/login`, il reçoit un **token JWT** valide pendant un certain temps. Ce token doit être inclus dans l'en-tête `Authorization` des requêtes ultérieures pour accéder à certaines ressources protégées.

### Middleware de sécurité

L'authentification est gérée par un middleware personnalisé qui vérifie la validité du token JWT. Le middleware vérifie que le token est présent dans l'en-tête de la requête (`Authorization`), le décode et attache les informations de l'utilisateur (telles que `userID` et `role`) à la requête.

### License

Aucune

### Auteur

Nom de l'auteur : Alexis

Date de création : 2024

Version de l'API : 1.0.0
