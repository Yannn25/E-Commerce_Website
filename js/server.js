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
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(express.static('public'));
  server.set('view engine', 'ejs');
  server.use(express.static('js'));

  //server.set('view engine', 'html');
  //server.engine('html', require('ejs').renderFile);
  await BDD_shop.connect();      
  async function RecupVetements() {
    const vetements = await BDD_shop.recupererVetements();
    return vetements;
  }
  server.get('/', async (req,res) => {
    const contenus = await RecupVetements();  
    //console.log(contenus);
    const tailles = await BDD_shop.recupererTaillesDisponibles();
    res.render('pages/index.ejs', { contenus, tailles });
  });
  server.get('/product:id', async (req,res) => {
    const id = req.params.id;
  });
  server.get('/gerant', async (req,res) => {
    const contenus = await RecupVetements();
    res.render('Gerant.ejs', {connect : false, stocks :true, nom : "test", contenus}); 
  });

  server.get('/login', (req,res) => {
    res.render('login');
  });
  server.post('/loginUser', (req,res) => {
    res.render('login.ejs');
  });
  server.post('/gerant', async (req,res) => {
    let {nom, mdp} = req.body;
    //console.log({nom,mdp});
    //const exits = await BDD_shop.GerantLog(nom,mdp);
    //console.log(exits);
    //console.log(exits == 1);
    //if(exits == 1) {
       res.redirect('/gerant/stocks');
    //  } else {
    //    res.render('Gerant.ejs', {connect : true});
    // }
  });
  server.get('/gerant/stocks', async (req, res) => {
    const contenus = await RecupVetements();
    res.render('Gerant.ejs', { connect : true,stocks: true, contenus });
  });
  server.post('/gerant/AddStocks', async (req, res) => {
    const idVetement = req.body.idVetement;
    const quantite = req.body.quantite; 
    const taille = req.body.taille;
    console.log('id : %d\nquant: %d\ntaille: %s\n', idVetement, quantite, taille);

    if (quantite === '' || isNaN(parseInt(quantite))) {
      console.error('La quantité fournie est invalide.');
      res.redirect('/gerant/stocks'); // Rediriger vers la page des stocks en cas d'erreur
      return;
    }
    try {
      await BDD_shop.AjoutStock(idVetement, quantite, taille);
      res.redirect('/gerant/stocks');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de stock :', error);
      res.redirect('/gerant/stocks'); // Rediriger vers la page des stocks en cas d'erreur
    }
  });
  
  
  
  server.get('/gerant/commandes', async (req, res) => {
    const commandes = await BDD_shop.AllCommands();
    res.render('Gerant.ejs', {connect : true, stocks : false, commandes});
  });
  server.post('/gerant/supprimer-commande', async (req, res) => {
    const commandeId = req.body.commandeId;
    await BDD_shop.SuppCommand(commandeId); 
    // Rediriger vers la page /gerant/commandes pour afficher la liste mise à jour des commandes
    res.redirect('/gerant/commandes');
    //307 pour redirect avec post
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

