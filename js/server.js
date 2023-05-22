const BDD_shop = require('./BDD_Connexion');
const Panier = require('./panier.js');


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

  await BDD_shop.connect();      
  async function RecupVetements() {
    const vetements = await BDD_shop.recupererVetements();
    return vetements;
  }
  server.get('/', async (req,res) => {
    const contenus = await RecupVetements();  
    const tailles = await BDD_shop.recupererTaillesDisponibles();
    res.render('accueil.ejs', { contenus, tailles });
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
  server.post('/login', async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const exits = await BDD_shop.Login(email, password);
    console.log(exits);
    console.log(exits == 1);
    if(exits == 1) {
       res.redirect('/');
    } else {
        res.render('login.ejs');//tenter un msg d'erreur
    }
  });
  server.post('/signUp', async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Vérifier si l'utilisateur existe déjà
    const userExists = await BDD_shop.Login(email, password);
    if (userExists == 1) {
      // L'utilisateur existe déjà, gérer le cas en conséquence
      res.render('login.ejs', { error: 'User already exists' });
      return;
    }
    const fullName = req.body.fullName;
    // Divise la chaîne fullName en nom et prénom
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const exits = await BDD_shop.SignUp(firstName, lastName,email, password);
    res.redirect('/favoris');
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
  server.post('/addPanier', (req, res) => {
    // Récupérer les données du produit à ajouter au panier depuis la requête
    const produit = {
      id: req.body.id,
      nom: req.body.nom,
      prix: req.body.prix,
      qte : req.body.quantite,
      taille : req.body.taille,
    };
    console.log(produit);
    // Créer une instance de la classe Panier
    const panier = new Panier();
    panier.addProduitPanier(produit);
    panier.savePanier();
    res.send('Produit ajouté au panier avec succès');
  });
  server.get('/favoris', (req,res) => {
    res.render('favoris.ejs');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
run();

