import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import utilisateurController from '../controllers/utilisateurController.js';
import livreController from "../controllers/livreController.js";

// Route pour créer un utilisateur
router.post('/creerUtilisateur', utilisateurController(db));
// Route pour récupérer les utilisateurs
router.get('/recupUtilisateurs', utilisateurController(db));
// Route pour récupérer un utilisateur par Id
router.get('/recupInfoUtilisateur', utilisateurController(db));
// Route pour récupérer les emprunts d'un utilisateur par Id
router.get('/recupInfoUtilisateur/:utilisateurId/emprunts', utilisateurController(db));
// Route pour envoyer un mail au bout de 30 jours d'emprunt
router.get('/sendEmail', utilisateurController(db));
// Route pour rechercher un utilisateur par son nom
router.get('/rechercherUtilisateurParNom', utilisateurController(db));
// Route pour retourner un livre
router.post('/retournerLivre', utilisateurController(db));

export default router;
