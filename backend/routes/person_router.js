const express = require('express');
const { allPersons, addPerson, fetchPerson, updatePerson, deletePerson } = require('../controllers/person_controllers');
const authVerify = require('../middlewares/auth_verify');
const validateObjectId = require('../middlewares/validate_params_id');
const isAdmin = require('../middlewares/is_admin');
const upload = require('../middlewares/upload');
const router = express.Router();

router.route('/')
    .all(authVerify, isAdmin)
    .get(allPersons)
    .post(upload.single('photo'), addPerson)

router.route('/:id')
    .all(authVerify, isAdmin, validateObjectId)
    .get(fetchPerson)
    .patch(upload.single('photo'), updatePerson)
    .delete(deletePerson)

module.exports = router;