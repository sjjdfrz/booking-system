const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        flight: {
            type: mongoose.Schema.ObjectId,
            ref: 'Flight',
            required: [true, 'flightBooking must belong to a flight.']
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

flightBookingSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'user',
        select: 'name photo'
    }).populate({
        path: 'flight',
        select: 'origin destination flightNumber departing returning price capacity'
    });
    next();
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);

module.exports = FlightBooking;