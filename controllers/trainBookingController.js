const TrainBooking =require('./../models/trainBookingModel');
const factory = require('./handlerFactory');
const catchAsync = require("../utils/catchAsync");
const Train = require("../models/trainModel");

exports.getAllTrainBookings = factory.getAll(TrainBooking);
exports.getTrainBooking = factory.getOne(TrainBooking);

exports.createTrainBooking = catchAsync(async (req, res, next) => {

    req.body.user = req.user.id;
    const train = await Train.findById(req.body.train);

    train.capacity -= 1;
    await train.save();

    const doc = await TrainBooking.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

exports.updateTrainBooking = factory.updateOne(TrainBooking);
exports.deleteTrainBooking = factory.deleteOne(TrainBooking);