import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import utilisateurController from '../controllers/utilisateurController.js';

// Route pour compter le nombre de retards
router.get('/nbRetardsUtilisateur', utilisateurController(db));
// Route pour créer un utilisateur
router.get('/creerUtilisateur', utilisateurController(db));
// Route pour récupérer les utilisateurs
router.get('/recupUtilisateurs', utilisateurController(db));
// Route pour récupérer un utilisateur par Id
router.get('/recupInfoUtilisateur', utilisateurController(db));


export default router;
