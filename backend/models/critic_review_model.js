const mongoose = require('mongoose');

const criticReviewSchema = new mongoose.Schema({
    movie: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    criticName: {
        type: String,
        required: true,
    },
    //imdb or tmdb id , use here
    profilePicture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    opinion: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

const CriticReview = mongoose.model('CriticReview', criticReviewSchema);

module.exports = CriticReview;