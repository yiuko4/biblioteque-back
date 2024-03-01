// routes/livreRoute.js
import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import livreController from '../controllers/livreController.js';

// Route pour créer un auteur
router.get('/creerAuteur', livreController(db));
// Route pour la création d'une catégorie
router.get('/creerCategorie', livreController(db));
// Route pour créer un livre
router.get('/creerLivre', livreController(db));
// Route pour récupérer la liste des livres
router.get('/recupListeLivres', livreController(db));
// Route nombre de livre empruntés par utilisateur
router.get('/nbEmpruntsUtilisateur', livreController(db));
// Route pour récupérer les infos d'un livre par Id
router.get('/recupInfoLivre', livreController(db));
// Route pour récupérer les infos d'un livre par Id
router.get('/empruntLivre', livreController(db));

export default router;
