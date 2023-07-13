const express = require('express');
const trainBookingController = require('./../controllers/trainBookingController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.use(authController.protect);

router.route('/')
    .get(
        authController.restrictTo('admin'),
        trainBookingController.getAllTrainBookings)
    .post(
        authController.restrictTo('user'),
        trainBookingController.createTrainBooking);

router.route('/:id')
    .get(
        authController.restrictTo('admin'),
        trainBookingController.getTrainBooking)
    .patch(
        authController.restrictTo('user'),
        trainBookingController.updateTrainBooking)
    .delete(
        authController.restrictTo('user'),
        trainBookingController.deleteTrainBooking);

module.exports = router;