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

    server.get('/', (req,res) => {
        let tab = BDD_shop.affiche_all();
        res.render('accueil.html', tab); 
    });
    server.get('/gerant', (req,res) => {
        res.render('Gérant.html'); 
    });


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
run();