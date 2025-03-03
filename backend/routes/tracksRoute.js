const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tracksControl = require('../controler/tracksControl');
const { upload } = require('../middleware/config-multer'); // Import correct de "upload"

const uploadMiddleware = upload.fields([
    { name: 'musicFile', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]);

// Création d'une nouvelle piste
router.post('/', auth, uploadMiddleware, tracksControl.createTrack);

// Récupération de toutes les pistes
router.get('/', tracksControl.getAllTracks);

// Récupération d'une piste par ID
router.get('/:id', tracksControl.getTrackById);

// Mise à jour d'une piste
router.put('/:id', auth, tracksControl.updateTrack);

// Suppression d'une piste
router.delete('/:id', auth, tracksControl.deleteTrack);

module.exports = router;