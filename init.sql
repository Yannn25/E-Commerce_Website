--Connect to the PostgreSQL server using the psql command with a, 
--superuser account or an account that has the CREATEROLE privilege:
--psql -U postgres
CREATE DATABASE IF NOT EXISTS shop;
CREATE USER roni WITH PASSWORD 'mdp';
GRANT ALL PRIVILEGES ON DATABASE shop TO roni;
--GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vetements TO roni;
--GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE stocks TO roni;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE clients TO roni;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE gerants TO roni;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes TO roni;


-- Création de la table des vêtements
CREATE TABLE IF NOT EXISTS vetements (
    id_vetement SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description TEXT,
    prix DECIMAL(10, 2),
    image VARCHAR(512)
);
-- Création de la table des vêtements
CREATE TABLE IF NOT EXISTS stocks (
  id INT NOT NULL,
  taille VARCHAR(3) NOT NULL,
  quantite INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id, taille),
  FOREIGN KEY (id) REFERENCES Vetements(id)
);

-- Création de la table des clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) ,
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(255) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    pays VARCHAR(255),
    mot_de_passe VARCHAR(255),
);

-- Création de la table des gérants
CREATE TABLE IF NOT EXISTS gerants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mot_de_passe VARCHAR(100) NOT NULL
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
INSERT INTO vetements (nom, description, prix, image) VALUES 
    ('Chemise', 'Chemise en coton avec motif à carreaux', 29.99,'../img/products_img/product-4.jpg'),
    ('T-shirt', 'T-shirt en coton uni', 19.99,'../img/products_img/product-4.jpg'),
    ('Pantalon', 'Pantalon en denim avec coupe droite', 49.99,'../img/products_img/product-4.jpg');
INSERT INTO stocks(id_vetement,taille,quantite) VALUES
    (1,'L',3),
    (1,'M',4),
    (1,'XL',2),
    (2,'L',2),
    (2,'M',1),
    (2,'XS',1),
    (3,'XXL',2);

-- Insertion de données initiales dans la table des clients
INSERT INTO clients (nom, prenom, email, adresse, ville, code_postal, pays) VALUES
    ('Dupont', 'Jean', 'jean.dupont@example.com', '123 Rue des Fleurs', 'Paris', '75001', 'France'),
    ('Martin', 'Sophie', 'sophie.martin@example.com', '456 Avenue des Étoiles', 'Lyon', '69002', 'France'),
    ('Leclerc', 'Pierre', 'pierre.leclerc@example.com', '789 Rue du Soleil', 'Marseille', '13008', 'France');

INSERT INTO gerants(nom,prenom,email,mot_de_passe) VALUES
    ('roni','gerant','roni@mail.com','test');
-- Insertion de données initiales dans la table des commandes
INSERT INTO commandes (client_id, vetement_id, date_commande, quantite) VALUES
    (1, 1, '2023-04-10', 2),
    (2, 3, '2023-04-11', 1),
    (3, 2, '2023-04-12', 3);
