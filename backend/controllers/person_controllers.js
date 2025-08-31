const Person = require("../models/person_model");
const cleanObject = require("../utils/cleanObject");
const cloudinaryUpload = require("../utils/imgUpload");

const allPersons = async (req, res) => {
    try {
        const persons = await Person.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: persons.length,
            persons
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch persons"
        });
    }
}

const addPerson = async (req, res) => {
    try {
        const { name, bio, roles } = req.body;
        let photo = null;

        if (req.file) {
            photo = await cloudinaryUpload(req.file.buffer);
        }

        const person = await Person.create(cleanObject({
            name,
            bio,
            roles,
            photo
        }));

        res.status(201).json({
            success: true,
            person
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to add person"
        });
    }
}

const fetchPerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }
        res.status(200).json({
            success: true,
            person
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching person"
        });
    }
}

const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, bio, roles } = req.body ?? {};
        let photo = null;
        if (req.file) {
            photo = await cloudinaryUpload(req.file.buffer);
        }

        const updates = cleanObject({ name, bio, roles, photo })
        const person = await Person.findByIdAndUpdate(id, updates, { new: true });

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }
        res.status(200).json({
            success: true,
            message: `${person?.name?.toUpperCase()}'s details changed`,
            person
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error updating person"
        });
    }
}

const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Person.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }
        res.status(200).json({
            success: true,
            message: `${deleted?.name?.toUpperCase()} got deleted`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: `Error deleting this person`
        });
    }
};

module.exports = {
    allPersons,
    addPerson,
    fetchPerson,
    updatePerson,
    deletePerson
}