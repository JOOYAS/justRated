const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const criticReviewSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    critic: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

const CriticReview = mongoose.model('CriticReview', criticReviewSchema);

module.exports = CriticReview;