const express = require('express');
const flightBookingController = require('./../controllers/flightBookingController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.use(authController.protect);

router.route('/')
    .get(
        authController.restrictTo('admin'),
        flightBookingController.getAllFlightBookings)
    .post(
        authController.restrictTo('user'),
        flightBookingController.createFlightBooking);

router.route('/:id')
    .get(
        authController.restrictTo('admin'),
        flightBookingController.getFlightBooking)
    .patch(
        authController.restrictTo('user'),
        flightBookingController.updateFlightBooking)
    .delete(
        authController.restrictTo('user'),
        flightBookingController.deleteFlightBooking);

module.exports = router;