const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema(
    {
        origin: {
            type: String,
            required: [true, 'A train must have origin city!']
        },
        destination: {
            type: String,
            required: [true, 'A train must have destination city!']
        },
        trainNumber: {
            type: Number,
            required: [true, 'A train must have train number!']
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
        capacity: {
            type: Number,
            required: [true, 'A train must have a capacity!']
        },
        coupeFeatures: {
            type: [String],
            required: [true, `You have not specified feature of coupes!`]
        },
        trainFeatures: {
            type: [String],
            required: [true, `You have not specified feature of train!`]
        },
        type: {
            type: String,
            enum: {
                values: ['کوپه ۶ نفره', 'کوپه ۴ نفره', 'سالنی ۴ ردیفه'],
                message: `Type is either: کوپه ۶ نفره, کوپه ۴ نفره, سالنی ۴ ردیفه`
            },
            default: 'کوپه ۴ نفره'
        },
        price: {
            type: Number,
            required: [true, 'A train must have a price']
        },
    }, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// Virtual populate
trainSchema.virtual('trainBookings', {
    ref: 'TrainBooking',
    foreignField: 'train',
    localField: '_id'
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;