const express = require('express');
const roomBookingController = require('./../controllers/roomBookingController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.use(authController.protect);

router.route('/')
    .get(
        authController.restrictTo('admin'),
        roomBookingController.getAllRoomBookings)
    .post(
        authController.restrictTo('user'),
        roomBookingController.createRoomBooking);

router.route('/:id')
    .get(
        authController.restrictTo('admin'),
        roomBookingController.getRoomBooking)
    .patch(
        authController.restrictTo('user'),
        roomBookingController.updateRoomBooking)
    .delete(
        authController.restrictTo('user'),
        roomBookingController.deleteRoomBooking);

module.exports = router;