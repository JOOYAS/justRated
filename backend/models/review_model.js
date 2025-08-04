const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movie: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    opinion: {
        type: String,
        required: true,
    },
    likes: Number,
},
    { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;