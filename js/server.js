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

  async function RecupVetements() {
    const vetements = await BDD_shop.recupererVetements();
    console.log(vetements);
    return vetements;
  }

  server.get('/', async (req,res) => {
    const contenus = await RecupVetements();  
    //console.log(contenus);
    const tailles = await BDD_shop.recupererTaillesDisponibles();
    res.render('../views/accueil.ejs', { contenus, tailles });
  });
  server.get('/product:id'), async (req,res) => {
    const id = req.params.id;
  }
  server.get('/index', (req,res) => {
    res.render('index2.ejs',);
  });
  server.get('/gerant', (req,res) => {
    res.render('Gérant.ejs', {connect : false}); 
  });

  server.set('view engine', 'ejs');
  server.get('/login', (req,res) => {
    res.render('login');
  });
  server.post('/loginUser', (req,res) => {
    res.render('login.ejs');
  });
  server.post('/gerant', async (req,res) => {
    let {nom, mdp} = req.body;
    //console.log({nom,mdp});
    const exits = await BDD_shop.GerantLog(nom,mdp);
    //console.log(exits);
    //console.log(exits == 1);
    if(exits == 1) {
      const contenus = await RecupVetements();
      res.render('Gérant.ejs',{connect : true, nom, contenus});
    } else {
      res.render('Gérant.ejs', {connect : false});
    }
  });
  server.get('/panier', (req,res) => {
    res.render('panier.ejs');
  });
  server.get('/favoris', (req,res) => {
    res.render('favoris.ejs');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


}
run();

