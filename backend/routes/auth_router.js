const express = require('express');
const { signupController, loginController, fetchMyData, deleteMyAccount, updateMyData, logoutController } = require('../controllers/auth_controllers');
const authVerify = require('../middlewares/auth_verify');
const router = express.Router();

router.route('/me')
    .all(authVerify)  //middleware
    .get(fetchMyData)
    .patch(updateMyData)
    .delete(deleteMyAccount)

router.route('/signup')
    .post(signupController)

router.route('/login')
    .post(loginController)

router.route('/logout')
    .get(authVerify, logoutController)

module.exports = router;