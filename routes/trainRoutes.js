const express = require('express');
const trainController = require('./../controllers/trainController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.route('/')
    .get(trainController.getAllTrains)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        trainController.createTrain);

router.route('/:id')
    .get(trainController.getTrain)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        trainController.updateTrain)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        trainController.deleteTrain);

module.exports = router;