-- Création de la table des vêtements
CREATE TABLE IF NOT EXISTS vetements (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description TEXT,
    prix DECIMAL(10, 2),
    taille VARCHAR(10),
    couleur VARCHAR(50)
);

-- Création de la table des clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    adresse VARCHAR(255),
    ville VARCHAR(255),
    code_postal VARCHAR(10),
    pays VARCHAR(255)
);

-- Création de la table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients (id),
    vetement_id INTEGER REFERENCES vetements (id),
    date_commande DATE,
    quantite INTEGER
);

-- Insertion de données initiales dans la table des vêtements
INSERT INTO vetements (nom, description, prix, taille, couleur)
VALUES ('Chemise', 'Chemise en coton avec motif à carreaux', 29.99, 'M', 'Bleu'),
       ('T-shirt', 'T-shirt en coton uni', 19.99, 'L', 'Blanc'),
       ('Pantalon', 'Pantalon en denim avec coupe droite', 49.99, 'S', 'Noir');

-- Insertion de données initiales dans la table des clients
INSERT INTO clients (nom, prenom, email, adresse, ville, code_postal, pays)
VALUES ('Dupont', 'Jean', 'jean.dupont@example.com', '123 Rue des Fleurs', 'Paris', '75001', 'France'),
       ('Martin', 'Sophie', 'sophie.martin@example.com', '456 Avenue des Étoiles', 'Lyon', '69002', 'France'),
       ('Leclerc', 'Pierre', 'pierre.leclerc@example.com', '789 Rue du Soleil', 'Marseille', '13008', 'France');

-- Insertion de données initiales dans la table des commandes
INSERT INTO commandes (client_id, vetement_id, date_commande, quantite)
VALUES (1, 1, '2023-04-10', 2),
       (2, 3, '2023-04-11', 1),
       (3, 2, '2023-04-12', 3);
