const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    place : { type: String, required: true, trim: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
