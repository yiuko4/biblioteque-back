import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import express from 'express';

const router = express.Router();

chai.use(chaiHttp);

const { expect } = chai;

describe('Utilisateur Controller', () => {
  
    it('Créer un utilisateur', (done) => {
      chai.request(app)
        .get('/api/livres/creerUtilisateur')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

    it('Nombre de retards par utilisateur', (done) => {
      chai.request(app)
        .get('/api/livres/creerUtilisateur')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
        
    });

  });