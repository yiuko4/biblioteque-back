import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import utilisateurController from '../controllers/utilisateurController.js';

// Route pour créer un utilisateur
router.get('/creerUtilisateur', utilisateurController(db));
// Route pour récupérer les utilisateurs
router.get('/recupUtilisateurs', utilisateurController(db));
// Route pour récupérer un utilisateur par Id
router.get('/recupInfoUtilisateur', utilisateurController(db));
// Route pour compter le nombre de retards
router.get('/nbRetardsUtilisateur', utilisateurController(db));
// Route pour envoyer un mail au bout de 30 jours d'emprunt
router.get('/sendEmail', utilisateurController(db));


export default router;
