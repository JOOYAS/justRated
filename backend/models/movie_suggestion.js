const mongoose = require('mongoose');

const MovieSuggestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: String },
    imdbID: { type: String }, // optional, helps preventing duplicate
    requestCount: { type: Number, default: 1 },
});

const MovieSuggestion = mongoose.model('MovieSuggestion', MovieSuggestionSchema);

module.exports = MovieSuggestion;