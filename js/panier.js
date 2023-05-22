const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local_storage');

class Panier {
    constructor() {
        let panier = localStorage.getItem("panier");
        if (panier != null) {
            this.panier = JSON.parse(panier);
        } else {
            this.panier = [];
        }
    }

    savePanier() {
        localStorage.setItem("panier", JSON.stringify(this.panier));
    }

    addProduitPanier(produit) {
        if (!Array.isArray(this.panier)) {
            this.panier = []; // Si this.panier n'est pas un tableau, initialisez-le comme un tableau vide
        }
        if (this.panier.length === 0) {
            produit.qte = 1;
            this.panier.push(produit);
        } else {
            let foundproduit = this.panier.find(p => p.id === produit.id && p.taille === produit.taille);
            if (foundproduit !== undefined) {
              foundproduit.qte++;
            } else {
              produit.qte = 1;
              this.panier.push(produit);
            }
            this.savePanier();
        }
    }
      

    removeProduitPanier(produit) {
        this.panier = this.panier.filter(p => p.id !== produit.id || p.taille !== produit.taille);
        this.savePanier();
    }

    changeQuantite(produit, quantite) {
        let foundproduit = this.panier.find(p => p.id === produit.id && p.taille === produit.taille);
        if (foundproduit !== undefined) {
            foundproduit.qte += parseInt(quantite);
            if (foundproduit.qte <= 0) {
                this.removeProduitPanier(foundproduit);
            } else {
                this.savePanier();
            }
        }
    }
    

    getNbProduitPanier() {
        let nb = 0;
        if(!this.panier.length) 
            return nb
        for(let prod of this.panier) {
            nb += prod.qte;
        }
        return nb;
    }

    getPrixTotal() {
        let total = 0;
        if(!this.panier.length) {
            return total;
        } else {
            for (let produit of this.panier) {
                total += produit.qte * produit.prix;
            }
            return total.toFixed(2);
        }
    }

    generateUniqueOrderNumber(id_client) {
        const timestamp = new Date().getTime();
        const nbProduits = this.getNbProduitPanier();
        // Générer une valeur aléatoire entre 100 et 999
        const random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        // Concaténer toutes les valeurs pour former le numéro de commande
        const numeroCommande = `${timestamp}_${id_client}_${nbProduits}_${random}`;
        return numeroCommande;
    }

    clearPanier = function() {
        localStorage.clear();
    }

} module.exports = Panier;