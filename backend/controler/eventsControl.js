const Event = require('../models/events');

// Vérifie si l'utilisateur est admin
const isAdmin = (req) => req.user && req.user.role === 'Admin';

// Créer un nouvel événement
exports.createEvent = async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    try {
      const event = new Event({ ...req.body });
      await event.save();
      res.status(201).json({ message: 'Événement créé avec succès', event });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Obtenir tous les événements
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un événement par ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) return res.status(404).json({ error: 'Événement non trouvé' });
      res.status(200).json({ message: 'Événement mis à jour avec succès', updatedEvent });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) return res.status(404).json({ error: 'Événement non trouvé' });
      res.status(200).json({ message: 'Événement supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
