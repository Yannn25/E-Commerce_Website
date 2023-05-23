const BDD_shop = require('./BDD_Connexion');
const Panier = require('./panier.js');

async function run() {
  const hostname = 'localhost';
  const port = 9494;
  const express = require("express");
  const server = new express();
  const bodyParser = require('body-parser');
  const process = require('process');
  const session = require('express-session');
  server.use(bodyParser.json());
  server.use(express.json());
  server.use(express.urlencoded({extended:true}));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(express.static('public'));
  server.set('view engine', 'ejs');
  server.use(express.static('js'));

  server.use(session({
    secret: 'anonymeKey', 
    resave: false,
    saveUninitialized: true
  }));
  
  
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

  //LOGIN ET SIGNUP
  server.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
  });
  
  server.post('/login', async (req, res) => {
    if (req.session.clientID != undefined) {
      return res.redirect('/favoris');
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    console.log(email, password);
    const exits = await BDD_shop.Login(email, password);
    console.log(exits);
    console.log(exits == 1);
  
    if (exits == 1) {
      const clientId = await BDD_shop.idLogin(email, password);
      console.log(clientId);
      req.session.clientId = clientId;
      console.log(req.session.clientId);
      return res.render('favoris.ejs', { clientId: clientId });
    } else {
      return res.render('login.ejs', { error: 'Inscrivez vous dès maintenant' });
    }
  });
  
  server.post('/signUp', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Vérifier si l'utilisateur existe déjà
    const userExists = await BDD_shop.Login(email, password);
    if (userExists == 1) {
      return res.render('login.ejs', { error: 'Vous etes deja inscrit connectez vous!!!' });
    }
  
    const fullName = req.body.fullName;
    // Divise la chaîne fullName en nom et prénom
    const nameParts = fullName.split(' ');
    const nom = nameParts[0];
    const prenom = nameParts.slice(1).join(' ');
  
    await BDD_shop.SignUp(nom, prenom, email, password);
    const clientId = BDD_shop.selectClient(nom, email);
    req.session.clientId = clientId;
    console.log(req.session.clientId);
    return res.redirect('/favoris');
  });
  
  // FAVORIS
  server.get('/favoris', (req, res) => {
    console.log(req.session.clientId);
    if (!req.session.clientId) {
      return res.redirect('/login');
    }
    const clientId = req.session.clientId;
    // const favoris = BDD_shop.allFavoris(clientID); 
    return res.render('favoris.ejs', { clientId: clientId });
  });
  

  //GERANT
  server.get('/gerant', async (req, res) => {
    if (!req.session.gerantID) {
      res.redirect('/gerantLog');
    } else {
      const contenus = await RecupVetements();
      res.render('Gerant.ejs', { stocks: true, contenus });
    }
  });
  server.get('/gerantLog', async (req, res) => {
    res.render('GerantLogin.ejs');
  });
  server.post('/gerant', async (req, res) => {
    let { nom, mdp } = req.body;
    console.log('nom: '+nom+'mdp: ',mdp);
    const exits = await BDD_shop.GerantLog(nom, mdp);
    console.log(exits);
    console.log(exits == 1);
    if (exits == 1) {
      req.session.gerantId = BDD_shop.gerantID(nom);
      res.redirect('/gerant/stocks');
    } else {
      res.redirect('/gerantLog');
    }
  });
  server.get('/gerant/stocks', async (req, res) => {
    if (!req.session.gerantId) {
      res.redirect('/gerantLog');
    } else {
      const contenus = await RecupVetements();
      res.render('Gerant.ejs', { connect: true, stocks: true, contenus });
    }
  });
  server.post('/gerant/AddStocks', async (req, res) => {
    const idVetement = req.body.idVetement;
    const quantite = req.body.quantite;
    const taille = req.body.taille;
    try {
      await BDD_shop.AjoutStock(idVetement, quantite, taille);
      res.redirect('/gerant/stocks');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de stock :', error);
      res.redirect('/gerant/stocks'); // Rediriger vers la page des stocks en cas d'erreur
    }
  });
  server.get('/gerant/commandes', async (req, res) => {
    if (!req.session.gerantId) {
      res.redirect('/gerantLog');
    } else {
      const commandes = await BDD_shop.AllCommands();
      res.render('Gerant.ejs', { connect: true, stocks: false, commandes });
    }
  });
  server.post('/gerant/supprimer-commande', async (req, res) => {
    const commandeId = req.body.commandeId;
    await BDD_shop.SuppCommand(commandeId);
    res.redirect('/gerant/commandes');
    //307 pour redirect avec post
  });
  
  //PANIER
  process.on('beforeExit', () => {
    panier.clearPanier();
  });
  server.get('/panier', (req,res) => {
    const panier = new Panier();
    console.log(panier);
    const prixTotal = panier.getPrixTotal();
    console.log(prixTotal);
    res.render('panier.ejs', {panier, prixTotal});
  });
  server.post('/addPanier', (req, res) => {
    // Récupérer les données du produit à ajouter au panier depuis la requête
    const produit = {
      id: req.body.id,
      nom: req.body.nom,
      prix: req.body.prix,
      qte: req.body.quantite,
      taille: req.body.taille,
    };
    console.log(produit);
    const panier = new Panier();
    panier.addProduitPanier(produit);
    panier.savePanier();
    res.redirect('/panier')
  });
  server.post('/updateQuantity', (req, res) => {
    const qte = parseInt(req.body.qte);
    const productId  = req.body.id;
    const taille = req.body.taille
    const product = {
      id: productId,
      taille: taille
    }
    console.log(product, qte);
    const panier = new Panier();
    // Mettre à jour la quantité du produit dans le panier
    panier.changeQuantite(product, qte);
    panier.savePanier();
    res.redirect('/panier');
  });

  //COMMANDES
  server.get('/Commandes', (req,res) => {
    const panier = new Panier();
    res.render('Commandes.ejs', panier);
  });
  server.post('/sendCommandes', async (req,res) => {
    const { nom, prenom, adresse, email, heure_livraison} = req.body;
    const panier = new Panier();
    //Vérifier si le client existe déjà dans la base de données
    const clientExists = await BDD_shop.verifClients(nom, email);
    if (clientExists === 0) {
      // Si le client n'existe pas, l'ajouter à la base de données
      await BDD_shop.insertDefaultClients(nom, prenom, email, adresse);
    }
    const id_client = await BDD_shop.selectClient(nom,email);
    // Parcourir chaque produit dans le panier
    for (const produit of panier.panier) {
      const { id, taille, qte } = produit;
      // Vérifier la disponibilité de la quantité demandée en stock
      const stockAvailable = await BDD_shop.verifStocks(id, taille, qte);
      if (stockAvailable === 0) {
        res.render('confirmation.ejs' ,{check: `Quantité demandée indisponible pour le produit ${id} de taille ${taille}`});
      }
    }
    const numeroCommande = panier.generateUniqueOrderNumber(id_client);
    for (let produit of panier.panier) {
      const id_vetement = produit.id;
      const taille = produit.taille;
      const quantite = produit.qte;
      // Insertion de la commande dans la BDD et update du STOCKS
      await BDD_shop.passCommand(id_client, id_vetement, heure_livraison, taille, quantite, numeroCommande);
      await BDD_shop.updateStock(id_vetement, taille, quantite);
    }
    panier.clearPanier();
    res.render('confirmation.ejs', {check : "Votre commande est bien passer"});
  });
  
 

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
run();

