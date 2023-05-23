function BDD_shop () {
    const pg = require('pg');
    
    const pool = new pg.Pool({
        user: 'roni',
        host: 'localhost',
        database: 'shop',
        password: 'mdp',
        port: 5432,
    });

    let bdd;

    this.connect = async function() {
        bdd = await pool.connect();
    };
    //AFFICHAGE
    this.recupererVetements = async function() {
        this.connect();
        const query = await bdd.query('SELECT * FROM vetements');
        return query.rows;
    };
    this.recupererTaillesDisponibles = async function() {
        this.connect();
        const query = await bdd.query('SELECT * FROM stocks');
        return query.rows;
    };

    // this.TaillesUnArticle = async function() {
    //     this.connect();
    //     try {
    //         const query = await bdd.query('SELECT taille FROM vetements');
    //     }
    // }

    //GERANT
    this.GerantLog = async function(nom, mdp) {
       this.connect();
        const query = await bdd.query('SELECT * FROM gerants WHERE nom = $1 AND mot_de_passe = $2', [nom, mdp]);
        return query.rowCount;
    }
    this.gerantID = async function(nom) {
        this.connect();
        const query = await bdd.query('SELECT id FROM gerants WHERE nom = $1', [nom]);
        return query.rows;
    }
    this.AjoutStock = async function(id_vetement, quantite, taille) {
        this.connect();
        const query = await bdd.query('INSERT INTO stocks(id,taille,quantite) VALUES($1, $2, $3)', [id_vetement, taille, quantite]);
    }
    this.AllCommands = async function() {
        this.connect();
        const query = await bdd.query('SELECT * FROM commandes');
        return query.rows;
    }
    this.SuppCommand = async function(id_command) {
        this.connect();
        const query = await bdd.query('DELETE FROM commandes WHERE id = $1', [id_command]);
           
    }
    //LOGIN ET SIGNUP
    this.Login = async function(mail, pswd) {
        this.connect();
        const query = await bdd.query('SELECT * FROM clients WHERE email = $1 AND mdp= $2', [mail, pswd]);
        return query.rowCount;
    }
    this.SignUp = async function(nom, prenom, mail, pswd) {
        this.connect();
        const query = await bdd.query('INSERT INTO clients(nom,prenom,email,mdp) VALUES ($1,$2,$3,$4)', [nom,prenom, mail, pswd]);
    }
    this.idLogin = async function(email, mdp) {
        this.connect();
        const query = await bdd.query('SELECT id FROM clients WHERE email = $1 AND mdp= $2', [email, mdp]);
        return query.rows;
    }

    //COMMANDES
    this.verifStocks = async function(id_vetement, taille, qte) {
        this.connect();
        const query = await bdd.query('SELECT * FROM stocks WHERE id = $1 AND taille = $2 AND quantite > $3', [id_vetement, taille, qte]);
        return query.rowCount;
    }
    this.updateStock = async function(id_vetement, taille, qte) {
        this.connect();
        const query = await bdd.query('UPDATE stocks SET quantite = quantite - $1 WHERE id = $2 AND taille = $3', [qte, id_vetement, taille]);
    }
    this.verifClients = async function(nom, mail) {
        this.connect();
        const query = await bdd.query('SELECT * FROM clients WHERE nom = $1 AND email = $2', [nom, mail]);
        return query.rowCount;
    }
    this.selectClient = async function(nom, mail) {
        this.connect();
        const query = await bdd.query('SELECT id FROM clients WHERE nom = $1 AND email = $2', [nom, mail]);
        return query.rows;
    }
    this.insertDefaultClients = async function(nom,prenom,mail,adr) {
        this.connect();
        const query = await bdd.query('INSERT INTO clients(nom,prenom,email,adresse,mdp) VALUES ($1,$2,$3,$4,$5)', [nom, prenom, mail,adr ,"defaultmdp"]);
    }
    this.passCommand = async function(id_client, id_vetement, date_cmd, taille,qte, num_cmd) {
        this.connect();
        const query = await bdd.query('INSERT INTO commandes(client_id, vetement_id, date_livraison, quantite, taille, numero_commande) VALUES ($1,$2,$3,$4,$5,$6)', [id_client,id_vetement,date_cmd,qte,taille,num_cmd]);
    }

    //FAVORIS
    this.allFavoris = async function(id_client){
        this.connect();
        const query = await bdd.query('SELECT * FROM favoris WHERE client_id=$1', [id_client]);
        return query.rows;
    }
}

module.exports = new BDD_shop();