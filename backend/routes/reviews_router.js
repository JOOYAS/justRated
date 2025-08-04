const express = require('express');
const { allReviews, newReview, newCriticReview, editReview, deleteReview } = require('../controllers/reviews_controllers');
const router = express.Router();

router.route('/')
    .get(allReviews)
    .post(newReview)

router.route('/critic')
    .post(newCriticReview)

router.route('/:id')
    .patch(editReview)
    .delete(deleteReview)

module.exports = router;