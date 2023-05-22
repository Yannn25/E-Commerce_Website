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
            let foundproduit = this.panier.find(p => p.id === produit.id);
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
        this.panier = this.panier.filter(p => p.id != produit.id);
        this.savePanier();
    }

    changeQuantite(idproduit, quantite) {
        let foundproduit = this.panier.find(p => p.id === idproduit);
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

} module.exports = Panier;

// const subtotal = document.querySelector(".subtotal");
// const confirmButton = document.getElementById("confirm-command");

// // Récupérez le panier et les informations nécessaires
// const panier = getPanier();
// const nbProduits = getNbProduitPanier();
// const prixTotal = getPrixTotal();

// // Affichez les informations du panier dans le tableau
// panier.forEach(produit => {
//   const row = document.createElement("tr");
//   const nomCol = document.createElement("td");
//   nomCol.textContent = produit.nom;
//   const prixCol = document.createElement("td");
//   prixCol.textContent = produit.prix;
//   const quantiteCol = document.createElement("td");
//   quantiteCol.textContent = produit.qte;

//   row.appendChild(nomCol);
//   row.appendChild(prixCol);
//   row.appendChild(quantiteCol);

//   tableBody.appendChild(row);
// });

// // Affichez le prix total
// subtotal.textContent = prixTotal;

// const button = document.getElementById("confirm-command");
// button.addEventListener("click", () => {
//   // Redirigez vers l'URL "/panier/commandes"
//   window.location.href = "/panier/commandes";
// });