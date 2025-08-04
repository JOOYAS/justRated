const express = require('express');
const { allWatchlist, updateWatchlist, deletefromWatchlist, addtoWatchlist } = require('../controllers/watchlist_controllers');
const router = express.Router();

router.route('/')
    .get(allWatchlist)

router.route('/:movieId')
    .post(addtoWatchlist)
    .patch(updateWatchlist)
    .delete(deletefromWatchlist)

module.exports = router;