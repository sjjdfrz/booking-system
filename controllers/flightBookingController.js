const FlightBooking = require('./../models/flightBookingModel');
const Flight = require('./../models/flightModel');
const factory = require('./handlerFactory');
const catchAsync = require("../utils/catchAsync");

exports.getAllFlightBookings = factory.getAll(FlightBooking);
exports.getFlightBooking = factory.getOne(FlightBooking);

exports.createFlightBooking = catchAsync(async (req, res, next) => {

    req.body.user = req.user.id;
    const flight = await Flight.findById(req.body.flight);

    flight.capacity -= 1;
    await flight.save();

    const doc = await FlightBooking.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

exports.updateFlightBooking = factory.updateOne(FlightBooking);
exports.deleteFlightBooking = factory.deleteOne(FlightBooking);