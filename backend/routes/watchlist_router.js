const express = require('express');
const { allWatchlist, updateWatchlist, deletefromWatchlist, addtoWatchlist, toggleWatched } = require('../controllers/watchlist_controllers');
const authVerify = require('../middlewares/auth_verify');
const isAdmin = require('../middlewares/is_admin');
const validateObjectId = require('../middlewares/validate_params_id');
const router = express.Router();

router.route('/')
    .get(authVerify, allWatchlist)


router.route('/:movieId')
    .all(authVerify, validateObjectId)
    .post(addtoWatchlist)
    // .patch(updateWatchlist) no need
    .delete(deletefromWatchlist)

router.route('/:movieId/toggle')
    .patch(authVerify, validateObjectId, toggleWatched)

module.exports = router;