const mongoose = require('mongoose');

const trainBookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        train: {
            type: mongoose.Schema.ObjectId,
            ref: 'Train',
            required: [true, 'trainBooking must belong to a train.']
        },
        firstname: {
            type: String,
            required: [true, 'A booker must have a name!']
        },
        lastname: {
            type: String,
            required: [true, 'A booker must have a name!']
        },
        nationalCode: {
            type: Number,
            required: [true, 'Please provide your nationalCode'],
            unique: true,
        },
        birthdate: {
            type: Date,
            required: [true, 'Please provide your birthdate'],
        },
        gender: {
            type: String,
            enum: {
                values: ['مرد', 'زن'],
                message: 'Type is either: زن, مرد'
            },
            required: [true, 'You must specify gender!']
        }
    }
);

trainBookingSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'user',
        select: 'name photo'
    }).populate({
        path: 'train',
        select: 'origin destination trainNumber departing returning price capacity'
    });
    next();
});

const TrainBooking = mongoose.model('TrainBooking', trainBookingSchema);

module.exports = TrainBooking;