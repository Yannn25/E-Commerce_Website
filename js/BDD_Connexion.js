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
    }

    this.affiche_all = async function() {
        let t = []
        //const result = bdd.query('SELECT * FROM vetements');
       // for(let w of result.rows)
        //    t.push(w.word);
        return t;
    }

}

module.exports = new BDD_shop();