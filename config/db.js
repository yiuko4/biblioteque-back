import mysql from 'mysql';

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'mysql-bibliotheque-bdd.alwaysdata.net',
    user: '349194',
    password: '6A(?M{r#;~45hhZJ',
    database: 'bibliotheque-bdd_1'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données établie');
    }
});

export default db;
