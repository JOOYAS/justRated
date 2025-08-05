const express = require('express');
const { allfavourites, newFavourite, removeFavourite } = require('../controllers/favourites_controllers');
const router = express.Router();

router.route('/')
    .get(allfavourites)

router.route('/:movieId')
    .post(newFavourite)
    .delete(removeFavourite)

module.exports = router;