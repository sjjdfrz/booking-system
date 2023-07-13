const express = require('express');
const flightController = require('./../controllers/flightController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.route('/')
    .get(flightController.getAllFlights)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        flightController.createFlight);

router.route('/:id')
    .get(flightController.getFlight)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        flightController.updateFlight)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        flightController.deleteFlight);

module.exports = router;