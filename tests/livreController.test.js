import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import express from 'express';

const router = express.Router();

chai.use(chaiHttp);

const { expect } = chai;

describe('Livre Controller', () => {

  it('Création d\'un auteur', (done) => {
    // Supposons que vous ayez un modèle Auteur avec les champs nom et prenom
    const nom = 'TestUnitaire';
    const prenom = 'TestUnitaire';
  
    // Requête pour vérifier si l'auteur existe déjà
    chai.request(app)
      .get(`/api/livres/rechercherAuteur?nom=${nom}&prenom=${prenom}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
  
        // Si l'auteur n'existe pas encore, vous pouvez le créer
        if (res.body.length === 0) {
          chai.request(app)
            .get(`/api/livres/creerAuteur?nom=${nom}&prenom=${prenom}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        } else {
          // Si l'auteur existe déjà, vous pouvez afficher un message d'erreur ou faire d'autres actions
          console.log('L\'auteur existe déjà dans la base de données.');
          done();
        }
      });
  });

  it('Création d\'une catégorie', (done) => {
    const nomCategorie = 'TestUnitaire'; // Nom de la catégorie à tester
  
    // Requête pour vérifier si la catégorie existe déjà
    chai.request(app)
      .get(`/api/livres/rechercherCategorie?nom=${nomCategorie}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
  
        // Si la catégorie n'existe pas encore, vous pouvez la créer
        if (res.body.length === 0) {
          chai.request(app)
            .get(`/api/livres/creerCategorie?nom=${nomCategorie}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        } else {
          // Si la catégorie existe déjà, vous pouvez afficher un message d'erreur ou faire d'autres actions
          console.log('La catégorie existe déjà dans la base de données.');
          done();
        }
      });
  });
  

  it('Création d\'un livre', (done) => {
    const auteurId = 1; // ID de l'auteur du livre
    const categorieId = 1; // ID de la catégorie du livre
    const titre = 'TestUnitaireTitre'; // Titre du livre
    const emplacement = 'TestUnitaireEmplacement'; // Emplacement du livre
  
    // Requête pour vérifier si le livre existe déjà
    chai.request(app)
      .get(`/api/livres/rechercherLivreTests?auteurId=${auteurId}&categorieId=${categorieId}&titre=${titre}&emplacement=${emplacement}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
  
        // Si le livre n'existe pas encore, vous pouvez le créer
        if (res.body.length === 0) {
          chai.request(app)
            .get(`/api/livres/creerLivre?auteurId=${auteurId}&categorieId=${categorieId}&titre=${titre}&emplacement=${emplacement}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        } else {
          // Si le livre existe déjà, vous pouvez afficher un message d'erreur ou faire d'autres actions
          console.log('Le livre existe déjà dans la base de données.');
          done();
        }
      });
  });
  

  it('Récupération de la liste des livres', (done) => {
    chai.request(app)
      .get('/api/livres/recupListeLivres')
      .end((err, res) => {
        expect(res.body).to.have.length.above(0);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');

        done();
      });
      
  });

//  it('Création d\'un nouveau livre', (done) => {
  //  chai.request(app)
    //    .get('/api/livres/creerLivre?auteurId=1&categorieId=1&titre=titretest&emplacement=A')
      //  .end((err, res) => {
        //    expect(res).to.have.status(200);

          //  done();
        //});
//});

  it('Récupération des informations d\'un livre', (done) => {
    chai.request(app)
      .get('/api/livres/recupInfoLivre?livreId=5')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("titre").equal('Le pere goriot'); 
        expect(res.body[0]).to.have.property("categorieId").equal(1);

        done();
      });
      
  });

  it('Recherche d\'un livre', (done) => {
    chai.request(app)
      .get('/api/livres/rechercherLivres?titre=Dune')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("titre").equal('Dune'); 
        expect(res.body[0]).to.have.property("emplacement").equal('Étagère B2');
        
        done();
      });
      
  });

  it('Recherche d\'un emprunt', (done) => {
    chai.request(app)
      .get('/api/livres/rechercherEmprunt?utilisateurId=8&livreId=3')
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
      
  });

  it('Emprunt d\'un livre', (done) => {
    const utilisateurId = 1;
    const livreId = 1;
  
    // Requête pour vérifier si un emprunt existe déjà avec ces IDs
    chai.request(app)
      .get(`/api/livres/rechercherEmprunt?utilisateurId=${utilisateurId}&livreId=${livreId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
  
        // Si aucun emprunt correspondant n'est trouvé, vous pouvez procéder à l'emprunt du livre
        if (res.body.length === 0) {
          chai.request(app)
            .post('/api/livres/empruntLivre')
            .send({ utilisateurId: utilisateurId, livreId: livreId })
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        } else {
          // Si un emprunt correspondant est trouvé, vous pouvez afficher un message d'erreur ou faire d'autres actions
          console.log('Un emprunt avec ces IDs existe déjà.');
          done();
        }
      });
  });
  

  it('Suppression d\'un livre', (done) => {
    chai.request(app)
      .get('/api/livres/supprimerLivre?livreId=14')
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
      
  });

//  it('Créer un auteur', (done) => {
  //  chai.request(app)
    //  .get('/api/livres/creerAuteur?nom=nomTest&prenom=prenomTest')
      //.end((err, res) => {
        //expect(res).to.have.status(200);

        //done();
      //});
      
  //});

});
