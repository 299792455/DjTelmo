const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const path = require('path');

// Middleware global
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(error => console.log('Connexion à MongoDB échouée !', error));

// Gestion des en-têtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
const userRoutes = require('./routes/userRoute');
const tracksRoutes = require('./routes/tracksRoute');
const eventsRoutes = require('./routes/eventsRoute');

app.use('/api/users', userRoutes);
app.use('/api/tracks', tracksRoutes);
app.use('/api/events', eventsRoutes);

// Rendre les dossiers accessibles publiquement
app.use('/musicFile', express.static(path.join(__dirname, 'musicFile'), { setHeaders: (res) => res.set('Access-Control-Allow-Origin', '*') }));
app.use('/coverImages', express.static(path.join(__dirname, 'coverImages'), { setHeaders: (res) => res.set('Access-Control-Allow-Origin', '*') }));

module.exports = app;
