const express = require('express');
const authVerify = require('../middlewares/auth_verify');
const { recordSuggestedMovie, fetchSuggestionData } = require('../controllers/suggestion_controllers');
const router = express.Router();

router.route('/')
    .all(authVerify)
    .get(fetchSuggestionData)
    .post(recordSuggestedMovie)

module.exports = router;