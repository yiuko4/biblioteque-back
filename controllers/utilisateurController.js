import express from 'express';

const router = express.Router();

const utilisateurController = (connection) => {

// Endpoint pour la création d'un utilisateur
router.get('/creerUtilisateur', (req, res, next) => {
  const { nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!nom || !prenom || !email || !motDePasse || !adresse || !ville ||!codePostal || !nbEmprunts) {
      return res.status(400).json({ message: "Les paramètres nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts est requis." });
  }

  const query = 'INSERT INTO Utilisateurs (utilisateurId, nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts, Retard) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, 0);';
  const values = [nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});


  // Endpoint pour récupérer tous les utilisateurs
router.get('/recupUtilisateurs', (req, res, next) => {
  
  const query = 'SELECT * FROM Utilisateurs;';

  connection.query(query, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});

// Endpoint pour la récupération d'un utilisateur par Id
router.get('/recupInfoUtilisateur', (req, res, next) => {
  const { utilisateurId } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!utilisateurId) {
      return res.status(400).json({ message: "Le paramètre 'utilisateurId' est requis." });
  }

  const query = 'SELECT * FROM Utilisateurs WHERE utilisateurId = ?;';
  const values = [utilisateurId];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});


  return router;
};

export default utilisateurController;
