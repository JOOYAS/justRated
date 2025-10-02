const express = require('express');
const { allPersons, addPerson, fetchPerson, updatePerson, deletePerson, moviesOfPerson } = require('../controllers/person_controllers');
const authVerify = require('../middlewares/auth_verify');
const validateObjectId = require('../middlewares/validate_params_id');
const isAdmin = require('../middlewares/is_admin');
const upload = require('../middlewares/upload');
const router = express.Router();

router.route('/')
    .get(authVerify, allPersons)
    .post(authVerify, isAdmin, upload.single('photo'), addPerson)

router.route('/:id')
    .all(authVerify)
    .get(fetchPerson)
    .patch(isAdmin, validateObjectId, upload.single('photo'), updatePerson)
    .delete(isAdmin, validateObjectId, deletePerson)

router.route('/:id/movies')
    .get(authVerify, validateObjectId, moviesOfPerson)
module.exports = router;