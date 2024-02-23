const express = require('express');
const db = require('./Connect_To_BDD');
const app = express();
const port = 3000;

//Requete API
app.get('/api/', (req, res) => {
    res.send('Bienvenue sur votre API !');
});

app.get('/api/testbdd', (req, res) => {
    db.query('SELECT ColTest1 FROM Test', (error, results) => {
        if (error) {
            console.error('Erreur de requête à la base de données :', error);
            res.status(500).send('Erreur interne du serveur');
        } else {
            // Assurez-vous que vous avez des résultats avant d'accéder à results[0]
            if (results.length > 0) {
                res.send(results[0].ColTest1.toString());
            } else {
                res.status(404).send('Aucun résultat trouvé');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});