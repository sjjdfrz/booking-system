const Flight =require('./../models/flightModel');
const factory = require('./handlerFactory');

exports.getAllFlights = factory.getAll(Flight);
exports.getFlight = factory.getOne(Flight, ['flightBookings']);
exports.createFlight = factory.createOne(Flight);
exports.updateFlight = factory.updateOne(Flight);
exports.deleteFlight = factory.deleteOne(Flight);