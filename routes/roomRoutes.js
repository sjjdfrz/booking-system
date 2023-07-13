const express = require('express');
const roomController = require('./../controllers/roomController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.route('/')
    .get(roomController.getAllRooms)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        roomController.createRoom);

router.route('/:id')
    .get(roomController.getRoom)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        roomController.updateRoom)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        roomController.deleteRoom);

module.exports = router;