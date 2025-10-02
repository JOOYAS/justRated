const express = require('express');
const authVerify = require('../middlewares/auth_verify');
const { aiFindMovies, reviewSummary } = require('../controllers/ai_controllers');
const router = express.Router();

router.route('/movies') // to list movies that not in this db //now unused,slow and unneeded
    .post(authVerify, aiFindMovies)
router.route('/persons') // to list persons those who are not in this db
    .all(authVerify)

router.route('/review/:movieId')
    .all(authVerify)
    .post(reviewSummary)
module.exports = router;