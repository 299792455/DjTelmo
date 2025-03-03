const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true, trim: true },
    musicFile: { type: String, required: true }, // Chemin du fichier audio
    coverImage: { type: String, required: true } // Chemin de l'image de couverture
});
module.exports = mongoose.model('Track', trackSchema);