const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
    {
        origin: {
            type: String,
            required: [true, 'A flight must have origin city!']
        },
        destination: {
            type: String,
            required: [true, 'A flight must have destination city!']
        },
        flightNumber: {
            type: String,
            required: [true, 'A flight must have flight number!']
        },
        departingDate: {
            type: Date,
            required: [true, 'A flight must have departing Date!']
        },
        returningDate: Date,
        departingTime: {
            type: String,
            required: [true, 'A flight must have departing Time!']
        },
        returningTime: String,
        terminal: {
            type: String,
            default: 'number 2'
        },
        loadAmount: {
            type: String,
            default: '30 کیلوگرم'
        },
        type: {
            type: String,
            enum: {
                values: ['اقتصادی', 'تجاری'],
                message: 'Type is either: تجاری, اقتصادی'
            },
            default: 'اقتصادی'
        },
        price: {
            type: Number,
            required: [true, 'A flight must have a price!']
        },
        capacity: {
            type: Number,
            required: [true, 'A flight must have a capacity!']
        }
    }, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// Virtual populate
flightSchema.virtual('flightBookings', {
    ref: 'FlightBooking',
    foreignField: 'flight',
    localField: '_id'
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;