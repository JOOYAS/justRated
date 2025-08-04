const express = require('express');
const { allPersons, addPerson, fetchPerson, updatePerson, deletePerson } = require('../controllers/person_controllers');
const router = express.Router();

router.route('/')
    .get(allPersons)
    .post(addPerson)

router.route('/:id')
    .get(fetchPerson)
    .patch(updatePerson)
    .delete(deletePerson)

module.exports = router;