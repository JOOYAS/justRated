const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    photo: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    roles: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Person = mongoose.model('Person', personSchema);

module.exports = Person;