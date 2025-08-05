const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    movie: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    watched: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;