import express from 'express';

const router = express.Router();

const livreController = (connection) => {
  // Endpoint pour récupérer tous les livres
  router.get('/recupListeLivres', (req, res, next) => {
    const query = `SELECT * FROM Livres;`;

    connection.query(query, (err, results) => {
      if (err) {
        next(err); // Gérer les erreur
      } else {
        res.json(results);
      }
    });
  });

  // Endpoint pour la création d'un auteur
  router.get('/creerAuteur', (req, res, next) => {
    const { nom, prenom } = req.query;

    // Vérifiez si les paramètres requis (nom et prenom) sont présents
    if (!nom || !prenom) {
        return res.status(400).json({ message: "Les paramètres 'nom' et 'prenom' sont requis." });
    }

    const query = `INSERT INTO Auteurs (auteurId, nom, prenom) VALUES (NULL, ?, ?);`;
    const values = [nom, prenom];

    connection.query(query, values, (err, results) => {
        if (err) {
            next(err); // Gérer les erreurs 
        } else {
            res.json(results);
        }
    });
});

// Endpoint pour la création d'une catégorie
router.get('/creerCategorie', (req, res, next) => {
  const { nom } = req.query;

  // Vérifiez si le paramètre requis (nom) est présent
  if (!nom) {
      return res.status(400).json({ message: "Le paramètre 'nom' est requi." });
  }

  const query = `INSERT INTO Categories (categorieId, nom) VALUES (NULL, ?);`;
  const values = [nom];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});

// Endpoint pour la création d'un livre
router.get('/creerLivre', (req, res, next) => {
  const { auteurId, categorieId, titre, emplacement } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!auteurId || !categorieId || !titre || !emplacement) {
      return res.status(400).json({ message: "Le paramètre 'auteurId', 'categorieId', 'titre', 'emplacement' sont requis." });
  }

  const query = `INSERT INTO Livres (livreId, auteurId, categorieId, titre, emplacement) VALUES (NULL, ?, ?, ?, ?);`;
  const values = [auteurId, categorieId, titre, emplacement];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});

// Endpoint pour la récupération d'un utilisateur par Id
router.get('/recupInfoLivre', (req, res, next) => {
  const { livreId } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!livreId) {
      return res.status(400).json({ message: "Le paramètre 'livreId' est requis." });
  }

  const query = 'SELECT * FROM Livres L INNER JOIN Emprunts E ON L.livreId = E.livreId WHERE L.livreId = ?;';
  const values = [livreId];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});

// Endpoint pour l'emprunt d'un livre
router.get('/empruntLivre', (req, res, next) => {
  const { utilisateurId, livreId } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!utilisateurId || !livreId) {
      return res.status(400).json({ message: "Le paramètre livreId et utilisateurId sont requis." });
  }

  const query = 'INSERT INTO Emprunts (empruntId, utilisateurId, livreId, dateEmprunt, dateRetourPrevue, dateRetourEffectif, etatLivre) VALUES (NULL, ?, ?, NOW(), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), NULL, Null);';
  const values = [utilisateurId, livreId];

  connection.query(query, values, (err, results) => {
      if (err) {
          next(err); // Gérer les erreurs 
      } else {
          res.json(results);
      }
  });
});

// Endpoint pour l'emprunt d'un livre
router.get('/supprimerLivre', (req, res, next) => {
  const { livreId } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!livreId) {
      return res.status(400).json({ message: "Le paramètre 'livreId' est requis." });
  }

  const query = 'DELETE FROM Livres WHERE livreId = ?';
  const values = [livreId];

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

export default livreController;
