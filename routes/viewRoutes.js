const express = require('express');
const viewController = require('./../controllers/viewController.js');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get('/profile', viewController.getProfileForm);

module.exports = router;