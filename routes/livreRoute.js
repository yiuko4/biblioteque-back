// routes/livreRoute.js
import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import livreController from '../controllers/livreController.js';

// Route pour récupérer la liste des livres
router.get('/recupListeLivres', livreController(db));
// Route pour récupérer la liste des livres empruntés
router.get('/recupLivreEmprunt', livreController(db));

export default router;
