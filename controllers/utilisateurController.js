import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

const utilisateurController = (connection) => {

// Endpoint pour la création d'un utilisateur
router.get('/creerUtilisateur', (req, res, next) => {
  const { nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts } = req.query;

  // Vérifiez si les paramètres requis sont présents
  if (!nom || !prenom || !email || !motDePasse || !adresse || !ville ||!codePostal || !nbEmprunts) {
      return res.status(400).json({ message: "Les paramètres nom, prenom, email, motDePasse, adresse, ville, codePostal, nbEmprunts sont requis." });
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

  return router;
};

export default utilisateurController;
