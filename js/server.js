const BDD_shop = require('./BDD_Connexion');

async function run() {
    const hostname = 'localhost';
    const port = 9494;
    const express = require("express");
    const server = new express();
    const bodyParser = require('body-parser');
    server.use(bodyParser.json());
    server.use(express.json());
    server.use(express.urlencoded({extended:true}));
    server.use(express.static('public'));
    
    server.set('view engine', 'html');
    server.engine('html', require('ejs').renderFile);

    await BDD_shop.connect();

    function genererHTMLVetements(vetements) {
        let contenuHTML = "";
        for (let vetement of vetements) {
          contenuHTML += 
            "<tr>" + 
            "<td>" +
              "<div class='card'>" +
                "<img src='${vetement.image}' alt='${vetement.nom}' style='width:100%'>" +
                "<h1>'${vetement.nom}'</h1>" +
                "<p class='price'>'${vetement.prix}' €</p>" +
                "<p>'${vetement.description}'</p>" +
                "<p><button>Add to Cart</button></p>" +
              "</div>" +
            "</td>" +
            "</tr>";
        }
        return contenuHTML;
      }
      
      

    async function afficherVetements() {
        const vetements = await BDD_shop.recupererVetements();
        const contenuHTML = genererHTMLVetements(vetements);
        return contenuHTML;
    }

    server.get('/', async (req,res) => {
      const contenuHTML = await afficherVetements();  
      res.render('accueil.ejs', { contenuHTML });
    });
    server.get('/index', (req,res) => {
        res.render('index2.html'); 
    });
    server.get('/gerant', (req,res) => {
        res.render('Gérant.ejs'); 
    });
    server.get('/login', (req,res) => {
        res.render('login.ejs');
    });


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
run();