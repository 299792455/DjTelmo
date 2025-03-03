const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userControl = require('../controler/userControl');

// Connexion de l'utilisateur
router.post('/login', userControl.login);

// Récupération des informations de l'utilisateur connecté
router.get('/profile', auth, userControl.getUserProfile);

module.exports = router;
