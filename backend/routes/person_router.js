const express = require('express');
const { allPersons, addPerson, fetchPerson, updatePerson, deletePerson } = require('../controllers/person_controllers');
const authVerify = require('../middlewares/auth_verify');
const validateObjectId = require('../middlewares/validate_params_id');
const isAdmin = require('../middlewares/is_admin');
const upload = require('../middlewares/upload');
const router = express.Router();

router.route('/')
    .get(authVerify, allPersons)
    .post(authVerify, isAdmin, upload.single('photo'), addPerson)

router.route('/:id')
    .get(authVerify, fetchPerson)
    .patch(isAdmin, validateObjectId, upload.single('photo'), updatePerson)
    .delete(isAdmin, validateObjectId, deletePerson)

module.exports = router;