import express from 'express';
import livreRoutes from './routes/livreRoute.js';
import utilisateurRoutes from './routes/utilisateurRoute.js';
import db from './config/db.js';
import cors from 'cors';
import corsOptions from './config/configCors.js';

const app = express();
const port = 3000;

// Configuration CORS appliquée à toutes les requêtes
app.use(cors(corsOptions));

// Routes
app.use('/api/livres', livreRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});

export default app;
