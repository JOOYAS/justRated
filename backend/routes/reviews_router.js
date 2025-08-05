const express = require('express');
const { allReviews, newReview, newCriticReview, editReview, deleteReview, deleteCriticReview } = require('../controllers/reviews_controllers');
const validateObjectId = require('../middlewares/validate_params_id');
const authVerify = require('../middlewares/auth_verify');
const isAdmin = require('../middlewares/is_admin');
const router = express.Router();

router.route('/')
    .get(authVerify, isAdmin, allReviews)
    .post(authVerify, newReview)

router.route('/critic')
    .post(authVerify, isAdmin, newCriticReview)

router.route('/critic/:id')
    .delete(authVerify, isAdmin, deleteCriticReview)

router.route('/:id')
    // .patch(editReview) //no need
    .delete(authVerify, validateObjectId, deleteReview)

module.exports = router;