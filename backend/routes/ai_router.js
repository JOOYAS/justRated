const express = require('express');
const authVerify = require('../middlewares/auth_verify');
const { aiFindMovies } = require('../controllers/ai_controllers');
const router = express.Router();

router.route('/movies') // to list movies that not in this db
    .post(authVerify, aiFindMovies)

router.route('/persons') // to list persons those who are not in this db
    .all(authVerify)
    .post((req, res) => res.send(`${req.method} from 'route'`))

module.exports = router;