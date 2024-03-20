import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import express from 'express';

const router = express.Router();

chai.use(chaiHttp);

const { expect } = chai;

describe('Utilisateur Controller', () => {

  it('Création d\'un utilisateur', (done) => {
    // Données de l'utilisateur à créer
    const userData = {
      nom: 'Test',
      prenom: 'Unitaire',
      email: 'TestUnitaire@outlookfr',
      motDePasse: 'mdp',
      adresse: 'Test18',
      ville: 'Unitaire18',
      codePostal: '18150'
    };
  
     chai.request(app)
      .post('/api/utilisateurs/creerUtilisateur')
       .send(userData)
       .end((err, res) => {
        if (res.body.message === "Ces identifiants sont déjà utilisé.") {
           // Si la propriété "message" est "Emprunt non trouvé", alors l'emprunt n'a pas été trouvé (404)
           expect(res).to.have.status(400);
        } else {
          // Si la propriété "message" est différente de "Emprunt non trouvé", alors l'emprunt a été supprimé (200)
          expect(res).to.have.status(201);
         }

        done();
      });
  });
  

    it('Récupération de tous les utilisateurs', (done) => {
      chai.request(app)
        .get('/api/utilisateurs/recupUtilisateurs')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

    it('Récupération des infos d\'un utilisateur', (done) => {
      chai.request(app)
        .get('/api/utilisateurs/recupInfoUtilisateur?utilisateurId=4')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

    it('Envoie de mail', (done) => {
      chai.request(app)
        .get('/api/utilisateurs/sendEmail')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

    it('Recherche d\'un utilisateur par son nom', (done) => {
      chai.request(app)
        .get('/api/utilisateurs/rechercherUtilisateurParNom?nom=Dubois')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

    it('Retour d\'un livre', (done) => {
      chai.request(app)
        .post('/api/utilisateurs/retournerLivre')
        .send({ empruntId: 49 })
        .end((err, res) => {
          if (res.body.message === "Emprunt non trouvé.") {
            // Si la propriété "message" est "Emprunt non trouvé", alors l'emprunt n'a pas été trouvé (404)
            expect(res).to.have.status(404);
          } else {
            // Si la propriété "message" est différente de "Emprunt non trouvé", alors l'emprunt a été supprimé (200)
            expect(res).to.have.status(200);
          }
    
          done();
        });
    });
    
    
    

    
  });