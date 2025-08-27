const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: String,
    likes: Number,
},
    { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;