import express from 'express';
import livreRoutes from './routes/livreRoute.js';
import utilisateurRoutes from './routes/utilisateurRoute.js';
import db from './config/db.js';
import cors from 'cors';
import corsOptions from './config/configCors.js';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  // Établir la connexion à la base de données
  connectionconnection.connect((err) => {
    if (err) {
      console.error('Erreur lors de la connexion à la base de données :', err);
      return;
    }
    console.log('Connexion à la base de données établie avec succès.');
  });

const app = express();
const port = process.env.PORT;

// Configuration CORS appliquée à toutes les requêtes
app.use(cors(corsOptions));
app.use(express.json());
// Routes
app.use('/api/livres', livreRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});

export default app;
