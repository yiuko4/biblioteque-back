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
// Route pour récupérer les infos d'un livre par Id
router.get('/recupInfoLivre', livreController(db));
// Route pour retourner un livre par Id

// Route pour récupérer les infos d'un livre par son nom
router.get('/rechercherLivres', livreController(db));
// Route pour récupérer les infos d'un livre pour test unitaire
router.get('/rechercherLivreTests', livreController(db));
// Route pour récupérer les infos d'un emprunt
router.get('/rechercherEmprunt', livreController(db));
// Route pour récupérer les infos d'un livre par Id
router.post('/empruntLivre', livreController(db));
// Route pour supprimer un livre a partir d'un id
router.get('/supprimerLivre', livreController(db));
// Route pour rechercher un auteur
router.get('/rechercherAuteur', livreController(db));
// Route pour rechercher une catégorie
router.get('/rechercherCategorie', livreController(db));


export default router;
