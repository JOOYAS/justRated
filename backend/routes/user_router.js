const express = require('express');
const { getAllUsers, fetchUserById, allMyReviews, allMyFavourites, allMyWatchlist } = require('../controllers/user_controllers');
const isAdmin = require('../middlewares/is_admin');
const authVerify = require('../middlewares/auth_verify');
const validateObjectId = require('../middlewares/validate_params_id');
const router = express.Router();

router.route('/')               //admin only
    .get(authVerify, isAdmin, getAllUsers)
// .post()

router.route('/reviews')
    .get(authVerify, allMyReviews)

// router.route('/favourites')
//     .get(authVerify, allMyFavourites)

router.route('/watchlist')
    .get(authVerify, allMyWatchlist)

router.route('/:id')            //admin only
    .get(validateObjectId, authVerify, isAdmin, fetchUserById)
// .patch()
// .delete()

module.exports = router;