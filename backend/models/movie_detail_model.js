const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieDetailSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    description: {
        type: String,

    },
    images: [{
        url: String,
        public_id: String
    }],
    trailerUrl: {
        type: String,
    },
    tags: [String],
    globalCollection: String,
    director: {
        type: Schema.Types.ObjectId,
        ref: "Person",
    },
    cast: {
        type: [Schema.Types.ObjectId],
        ref: "Person",
    },
    writers: {
        type: [Schema.Types.ObjectId],
        ref: "Person",
    },
    duration: {
        type: Number,
    },
    availableOn: [String],
    country: String,
    language: String,
},
    { timestamps: true });

const MovieDetail = mongoose.model('MovieDetail', movieDetailSchema);

module.exports = MovieDetail;