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
        console.log("Connexion Base de Donnes reussi");
    };

    this.recupererVetements = async function() {
        this.connect();
        try {
            const query = await bdd.query('SELECT * FROM vetements');
            return query.rows;
        } finally {
            bdd.release();
        }
    };
    this.recupererTaillesDisponibles = async function() {
        this.connect();
        try {
            const query = await bdd.query('SELECT * FROM stocks');
            return query.rows;
        } finally {
            bdd.release();
        }
    };

    // this.TaillesUnArticle = async function() {
    //     this.connect();
    //     try {
    //         const query = await bdd.query('SELECT taille FROM vetements');
    //     }
    // }

    this.GerantLog = async function(nom, mdp) {
        this.connect();
        try {
            const query = await bdd.query('SELECT * FROM gerants WHERE nom = $1 AND mot_de_passe = $2', [nom, mdp]);
            //console.log(query.rowCount);
            return query.rowCount;
        } finally {
            bdd.release();
        }
    }
    this.AjoutStock = async function(id_vetement, quantite, taille) {
        this.connect();
        try {
            const query = await bdd.query('INSERT INTO stocks(id,taille,quantite) VALUES($1, $2, $3)', [id_vetement, taille, quantite]);
          //return query;
        } finally {
          bdd.release();
        }
    }
      
    this.AllCommands = async function() {
        this.connect();
        try {
            const query = await bdd.query('SELECT * FROM commandes');
            return query.rows;
        } finally {
            bdd.release();
        }
    }
    this.SuppCommand = async function(id_command) {
        this.connect();
        try {
            const query = await bdd.query('DELETE FROM commandes WHERE id = $1', [id_command]);
            //console.log(query.rowCount);
        } finally {
            bdd.release();
        }
    }
}

module.exports = new BDD_shop();