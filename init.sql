CREATE DATABASE shop;
CREATE USER roni WITH PASSWORD 'mdp';
GRANT ALL PRIVILEGES ON DATABASE shop TO roni;
\c shop;

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
  FOREIGN KEY (id) REFERENCES Vetements(id_vetement)
);

-- Création de la table des clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) ,
    email VARCHAR(255) NOT NULL,
    adresse VARCHAR(255),
    ville VARCHAR(255),
    code_postal VARCHAR(10),
    pays VARCHAR(255),
    mdp VARCHAR(255) NOT NULL
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
    vetement_id INTEGER REFERENCES vetements (id_vetement),
    date_livraison VARCHAR(16),
    quantite INT,
    taille VARCHAR(4),
    numero_commande VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS favoris (
    vetement_id INTEGER,
    client_id INTEGER,
    PRIMARY KEY (vetement_id, client_id),
    FOREIGN KEY (vetement_id) REFERENCES vetements (id_vetement),
    FOREIGN KEY (client_id) REFERENCES clients (id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vetements TO roni;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE stocks TO roni;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE clients TO roni;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE gerants TO roni;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes TO roni;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE favoris TO roni;
GRANT USAGE, SELECT ON SEQUENCE clients_id_seq TO roni;
GRANT USAGE, SELECT ON SEQUENCE gerants_id_seq TO roni;
GRANT USAGE, SELECT ON SEQUENCE commandes_id_seq TO roni;

-- Insertion de données initiales dans la table des vêtements
INSERT INTO vetements (nom, description, prix, image) VALUES 
    ('Chemise', 'Chemise en coton avec motif à carreaux', 29.99,'../img/products_img/product-4.jpg'),
    ('T-shirt', 'T-shirt en coton uni', 19.99,'../img/products_img/product-4.jpg'),
    ('Pantalon', 'Pantalon en denim avec coupe droite', 49.99,'../img/products_img/product-4.jpg'),
    ('Chemise', 'Chemise en coton à rayures', 29.99,'../img/products_img/product-4.jpg'),
    ('T-shirt', 'T-shirt en coton à motifs', 19.99,'../img/products_img/product-4.jpg'),
    ('Pantalon', 'Pantalon en lin avec coupe droite', 49.99,'../img/products_img/product-4.jpg'),
    ('Veste', 'Veste en jean avec fermeture éclair', 59.99,'../img/products_img/product-4.jpg'),
    ('Robe', 'Robe en soie avec imprimé floral', 69.99,'../img/products_img/product-4.jpg'),
    ('Jupe', 'Jupe en cuir avec fermeture éclair', 39.99,'../img/products_img/product-4.jpg'),
    ('Pull', 'Pull en laine avec col roulé', 49.99,'../img/products_img/product-4.jpg'),
    ('Jean', 'Jean en cuir avec lacets', 79.99,'../img/products_img/product-4.jpg');
INSERT INTO stocks(id,taille,quantite) VALUES
    (1,'S',4),
    (1,'L',3),
    (1,'M',4),
    (1,'XL',2),
    (2,'L',2),
    (2,'M',1),
    (2,'XS',1),
    (3,'XXL',2),
    (4,'M',6),
    (4,'L',5),
    (4,'XL',2),
    (5,'S',5),
    (5,'M',3),
    (5,'L',4),
    (5,'XL',1),
    (6,'S',2),
    (6,'M',3),
    (6,'L',4),
    (6,'XL',2),
    (7,'S',3),
    (7,'M',4),
    (7,'L',2),
    (7,'XL',1),
    (8,'XS',1),
    (8,'M',2),
    (8,'L',3),
    (8,'XL',1),
    (9,'S',2),
    (9,'M',2),
    (9,'L',1),
    (9,'XL',2),
    (10,'S',3),
    (10,'M',3),
    (10,'XL',4),
    (10,'XXL',2),
    (11,'S',2),
    (11,'M',4),
    (11,'L',3),
    (11,'XXL',2);

-- Insertion de données initiales dans la table des clients
INSERT INTO clients (nom, prenom, email, adresse, ville, code_postal, pays, mdp) VALUES
    ('Dupont', 'Jean', 'jean.dupont@example.com', '123 Rue des Fleurs', 'Paris', '75001', 'France', 'password1'),
    ('Martin', 'Sophie', 'sophie.martin@example.com', '456 Avenue des Étoiles', 'Lyon', '69002', 'France', 'password2'),
    ('Leclerc', 'Pierre', 'pierre.leclerc@example.com', '7119 Rue du Soleil', 'Marseille', '130011', 'France', 'password3');


INSERT INTO gerants(nom,prenom,email,mot_de_passe) VALUES
    ('roni','gerant','roni@mail.com','test'),
    ('test','gerant','test@mail.com','mdp');
    
-- Insertion de données initiales dans la table des commandes
INSERT INTO commandes (client_id, vetement_id, date_livraison, quantite, taille, numero_commande) VALUES
    (1, 1, '2023-04-10 12h00', 2,'L', '123455'),
    (2, 3, '2023-04-11 10h00', 1, 'S','42761'),
    (3, 2, '2023-04-12 18h30', 3, 'XL','62189');


