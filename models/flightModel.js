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
            type: Number,
            required: [true, 'A flight must have flight number!']
        },
        departing: {
            type: Date,
            required: [true, 'A flight must have departing Date!']
        },
        returning: Date,
        // passenger: {
        //     type: Number,
        //     required: [true, `You have not specified the number of passengers!`]
        // },
        terminal: {
            type: String,
            default: 'شماره 2'
        },
        loadAmount: {
            type: String,
            default: '30 کیلوگرم'
        },
        type: {
            type: String,
            enum: {
                values: ['اکونومی', 'بیزینس'],
                message: 'Type is either: اکونومی, بیزینس'
            },
            default: 'اکونومی'
        },
        price: {
            type: Number,
            required: [true, 'A flight must have a price!']
        },
        capacity: {
            type: Number,
            required: [true, 'A flight must have a capacity!']
        }
    }
);

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;