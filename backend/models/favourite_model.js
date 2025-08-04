const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    movie: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;