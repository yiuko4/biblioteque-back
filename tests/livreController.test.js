import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import express from 'express';

const router = express.Router();

chai.use(chaiHttp);

const { expect } = chai;

describe('Livre Controller', () => {
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

  it('Récupération d\'un livre', (done) => {
    chai.request(app)
      .get('/api/livres/recupInfoLivre?livreId=1')
      .end((err, res) => {
        //console.log(res.body);
        expect(res).to.have.status(200);
        //expect(res.body.titre);
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

  it('Nombre de livre empruntés par utilisateurs', (done) => {
    chai.request(app)
      .get('/api/livres/nbEmpruntsUtilisateur')
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
