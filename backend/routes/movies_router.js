const express = require('express');
const router = express.Router();
const { allMovies, newMovie, fetchmovieById, updateMovie, deleteMovie, allReviewsofMovie } = require('../controllers/movies_controllers');
const upload = require('../middlewares/upload');
const authVerify = require('../middlewares/auth_verify');
const isAdmin = require('../middlewares/is_admin');
const validateObjectId = require('../middlewares/validate_params_id');

router.route('/')
    .get(authVerify, allMovies)
    .post(upload.single('posterImg'), newMovie)
// authVerify, isAdmin,
router.route('/:id')
    .get(validateObjectId, fetchmovieById)
    .patch(validateObjectId, upload.fields([{ name: 'posterImg', maxCount: 1 }, { name: 'images', maxCount: 5 }]), updateMovie)
    .delete(deleteMovie)

router.route('/:id/reviews')
    .get(allReviewsofMovie)


module.exports = router;