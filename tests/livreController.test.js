import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import express from 'express';

const router = express.Router();

chai.use(chaiHttp);

const { expect } = chai;

describe('Livre Controller', () => {
  it('devrait récupérer la liste des livres', (done) => {
    chai.request(app)
      .get('/api/livres/recupListeLivres')
      .end((err, res) => {
        console.log(res);
        expect(res.body).to.have.length.above(0);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');

        done();
      });
  });

});
