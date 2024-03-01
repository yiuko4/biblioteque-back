import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import livreController from '../controllers/utilisateurController.js';

// Route pour récupérer la liste des livres
//router.get('/', utilisateurController.getUtilisateur);

export default router;
