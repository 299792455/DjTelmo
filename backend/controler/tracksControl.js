const Track = require('../models/tracks');
const path = require('path'); // Assure-toi d'avoir importé 'path'

// Vérifie si l'utilisateur est admin
const isAdmin = (req) => req.user && req.user.role === 'Admin';


// Créer une nouvelle piste
exports.createTrack = async (req, res) => {
  if (!isAdmin(req)) {
    console.log('Accès refusé : Rôle utilisateur ->', req.user.role);
    return res.status(403).json({ error: 'Accès refusé : Vous devez être admin.' });
  }

  try {
    console.log('Requête reçue pour ajouter une piste');
    console.log('Corps de la requête :', req.body);

    // Vérifiez si le nombre maximum de pistes est atteint
    const existingTracks = await Track.find();
    if (existingTracks.length >= 5) {
      return res.status(400).json({ error: 'Limite de 5 pistes atteinte' });
    }

    // Vérifiez les fichiers uploadés
    if (!req.files.musicFile || !req.files.coverImage) {
      return res.status(400).json({ error: 'Les fichiers musicFile et coverImage sont requis.' });
    }

    const { title, artist, album, year, genre } = req.body;
    const musicFile = req.files.musicFile[0].path;
    const coverImage = req.files.coverImage[0].path;

    // Créez la nouvelle piste
    const track = new Track({ title, artist, album, year, genre, musicFile, coverImage });
    await track.save();

    res.status(201).json({ message: 'Piste créée avec succès', track });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllTracks = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const tracks = await Track.find().lean(); // Utilise lean() pour permettre les modifications directes

    // Transformer les chemins locaux en URLs publiques
    const updatedTracks = tracks.map((track) => ({
      ...track,
      musicFile: `${baseUrl}/musicFile/${path.basename(track.musicFile)}`,
      coverImage: `${baseUrl}/coverImages/${path.basename(track.coverImage)}`,
    }));

    res.status(200).json(updatedTracks); // Retourne les pistes avec les URLs publiques
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Obtenir une piste par ID
exports.getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Piste non trouvée' });
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une piste
exports.updateTrack = async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    try {
      const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTrack) return res.status(404).json({ error: 'Piste non trouvée' });
      res.status(200).json({ message: 'Piste mise à jour avec succès', updatedTrack });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Supprimer une piste
exports.deleteTrack = async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    try {
      const deletedTrack = await Track.findByIdAndDelete(req.params.id);
      if (!deletedTrack) return res.status(404).json({ error: 'Piste non trouvée' });
      res.status(200).json({ message: 'Piste supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
