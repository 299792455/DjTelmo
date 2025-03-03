const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const eventsControl = require('../controler/eventsControl');

// Création d'un nouvel événement
router.post('/', auth, eventsControl.createEvent);

// Récupération de tous les événements
router.get('/', eventsControl.getAllEvents);

// Récupération d'un événement par ID
router.get('/:id', eventsControl.getEventById);

// Mise à jour d'un événement
router.put('/:id', auth, eventsControl.updateEvent);

// Suppression d'un événement
router.delete('/:id', auth, eventsControl.deleteEvent);

module.exports = router;