import express from 'express';

const router = express.Router();

const livreController = (connection) => {
  // Endpoint pour récupérer tous les livres
  router.get('/recupListeLivres', (req, res, next) => {
    const query = `SELECT * FROM Livres;`;

    connection.query(query, (err, results) => {
      if (err) {
        next(err); // Gérer les erreurs avec le middleware d'erreur
      } else {
        res.json(results);
      }
    });
  });

  // Endpoint pour récupérer tous les livres actuellement empruntés
  router.get('/recupLivreEmprunt', (req, res, next) => {
    const query = `SELECT * FROM Emprunts;`;

    connection.query(query, (err, results) => {
      if (err) {
        next(err); // Gérer les erreurs avec le middleware d'erreur
      } else {
        res.json(results);
      }
    });
  });

  return router;
};

export default livreController;
