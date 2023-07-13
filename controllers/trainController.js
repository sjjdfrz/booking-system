const Train =require('./../models/trainModel');
const factory = require('./handlerFactory');

exports.getAllTrains = factory.getAll(Train);
exports.getTrain = factory.getOne(Train, ['trainBookings']);
exports.createTrain = factory.createOne(Train);
exports.updateTrain = factory.updateOne(Train);
exports.deleteTrain = factory.deleteOne(Train);