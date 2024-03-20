import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

const utilisateurController = (connection) => {

// Endpoint pour la création d'un utilisateur
router.post('/creerUtilisateur', (req, res) => {
  const { nom, prenom, email, motDePasse, adresse, ville, codePostal } = req.body;

  // Vérifier d'abord si l'email existe déjà
  const checkQuery = 'SELECT * FROM Utilisateurs WHERE email = ?';
  connection.query(checkQuery, [email], (checkErr, checkResults) => {
      if (checkErr) {
          console.error(checkErr);
          res.status(500).json({ message: "Erreur lors de la recherche de l'email." });
      } else if (checkResults.length > 0) {
          // Si l'email existe déjà, renvoyer un message d'erreur
          res.status(400).json({ message: "Ces identifiants sont déjà utilisé." });
      } else {
          // Si l'email n'existe pas encore, insérer le nouvel utilisateur
          const insertQuery = 'INSERT INTO Utilisateurs (nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts, nbRetard) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0);';
          const values = [nom, prenom, email, motDePasse, adresse, ville, codePostal];

          connection.query(insertQuery, values, (insertErr, results) => {
              if (insertErr) {
                  console.error(insertErr);
                  res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
              } else {
                  res.status(201).json({ message: "Utilisateur créé avec succès.", utilisateurId: results.insertId });
              }
          });
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

    router.get('/recupInfoUtilisateur/:utilisateurId/emprunts', (req, res, next) => {
        const { utilisateurId } = req.params; // Utilisation de req.params pour une route paramétrée

        if (!utilisateurId) {
            return res.status(400).json({ message: "Le paramètre 'utilisateurId' est requis." });
        }

        // Requête pour récupérer les emprunts d'un utilisateur
        // Cette requête suppose l'existence d'une table `Emprunts` avec une colonne `utilisateurId`,
        // et une table `Livres` avec une colonne `livreId`.
        const query = `
    SELECT E.empruntId, E.dateEmprunt, E.dateRetourPrevue, E.dateRetourEffectif, L.titre, L.emplacement
    FROM Emprunts E
    JOIN Livres L ON E.livreId = L.livreId
    WHERE E.utilisateurId = ?;
  `;
        const values = [utilisateurId];

        connection.query(query, values, (err, results) => {
            if (err) {
                next(err); // Gérer les erreurs
            } else {
                res.json(results); // Retourne les emprunts de l'utilisateur avec les informations des livres
            }
        });
    });


// Endpoint pour l'envoi d'e-mails
router.get('/sendEmail', (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'lulu.gerome@outlook.fr',
      pass: 'Azerqsdf1234.',
    },
  });

  const mailOptions = {
    from: 'lulu.gerome@outlook.fr',
    to: 'lulu.gerome@outlook.fr',
    subject: 'Retour de votre emprunt',
    text: 'Votre emprunt date de 30 jours, il vous reste donc encore 30 jours avant de devoir le rendre'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    } else {
      console.log('E-mail envoyé: ' + info.response);
      res.status(200).json({ success: 'E-mail envoyé avec succès' });
    }
  });
});



// Endpoint pour récupérer un utilisateur par son nom
    router.get('/rechercherUtilisateurParNom', (req, res, next) => {
        const { nom } = req.query; // 'nom' est le paramètre passé dans la requête

        // Vérifiez si le paramètre 'nom' est présent
        if (!nom) {
            return res.status(400).json({ message: "Le paramètre 'nom' est requis pour la recherche." });
        }

        // Utilisez le caractère joker '%' pour trouver des utilisateurs dont le nom contient la chaîne de recherche
        const query = 'SELECT * FROM Utilisateurs WHERE nom LIKE ?;';
        const values = [`%${nom}%`]; // Assurez-vous que la base de données peut interpréter le joker '%'

        connection.query(query, values, (err, results) => {
            if (err) {
                return next(err); // Gérer les erreurs
            } else {
                res.json(results); // Retourne les résultats de la recherche
            }
        });
    });

  router.post('/retournerLivre', (req, res, next) => {
    const { empruntId } = req.body;

    if (!empruntId) {
        return res.status(400).json({ message: "Le paramètre 'empruntId' est requis." });
    }

    // Vérifier d'abord si l'emprunt existe
    const checkQuery = 'SELECT * FROM Emprunts WHERE empruntId = ?';
    connection.query(checkQuery, [empruntId], (checkErr, checkResults) => {
        if (checkErr) {
            next(checkErr); // Gérer les erreurs
        } else if (checkResults.length === 0) {
            res.status(404).json({ message: 'Emprunt non trouvé.' });
        } else {
            // Si l'emprunt existe, le supprimer de la base de données
            const deleteQuery = 'DELETE FROM Emprunts WHERE empruntId = ?';
            connection.query(deleteQuery, [empruntId], (deleteErr, deleteResults) => {
                if (deleteErr) {
                    next(deleteErr); // Gérer les erreurs
                } else {
                    res.json({ message: 'Le livre a été retourné et l\'emprunt supprimé avec succès.' });
                }
            });
        }
    });
});

return router;
};

export default utilisateurController;
