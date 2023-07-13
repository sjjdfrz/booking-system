const RoomBooking =require('../models/roomBookingModel');
const factory = require('./handlerFactory');
const catchAsync = require("../utils/catchAsync");
const Room = require("../models/roomModel");

exports.getAllRoomBookings = factory.getAll(RoomBooking);
exports.getRoomBooking = factory.getOne(RoomBooking);

exports.createRoomBooking = catchAsync(async (req, res, next) => {

    req.body.user = req.user.id;
    const room = await Room.findById(req.body.room);

    room.capacity -= 1;
    await room.save();

    const doc = await RoomBooking.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

exports.updateRoomBooking = factory.updateOne(RoomBooking);
exports.deleteRoomBooking = factory.deleteOne(RoomBooking);