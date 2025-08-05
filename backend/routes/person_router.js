const express = require('express');
const { allPersons, addPerson, fetchPerson, updatePerson, deletePerson } = require('../controllers/person_controllers');
const authVerify = require('../middlewares/auth_verify');
const validateObjectId = require('../middlewares/validate_params_id');
const isAdmin = require('../middlewares/is_admin');
const router = express.Router();

router.route('/')
    // .all(authVerify, isAdmin)
    .get(allPersons)
    .post(addPerson)

router.route('/:id')
    .all(authVerify, validateObjectId)
    .get(fetchPerson)
    .patch(updatePerson)
    .delete(deletePerson)

module.exports = router;