

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
            const query = await bdd.query('SELECT * FROM VETEMENTS');
            return query.rows;
        } finally {
            bdd.release();
        }
    };

}

module.exports = new BDD_shop();