const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    genres: Array,
    posterUrl: String,
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    featuredNow: {
        type: Boolean,
        default: false
    },
    currentlyOnTheatres: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;