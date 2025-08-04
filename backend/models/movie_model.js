const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genres: {
        type: Array,
    },
    posterUrl: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 2,
    },
    featuredNow: {
        type: Boolean,
    },
    currentlyOnTheatres: {
        type: Boolean,
    },
},
    { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;