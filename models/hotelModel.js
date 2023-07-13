const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A hotel must have a name!']
        },
        address: {
            type: String,
            required: [true, 'A hotel must have address!']
        },
        city: {
            type: String,
            required: [true, 'A hotel must have city!']
        },
        images: [String],
        star: {
            type: Number,
            min: 0,
            max: 5,
            required: [true, 'A hotel must have star!']
        },
        features: {
            type: [String],
            required: [true, `You have not specified feature of hotel!`]
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A hotel must have description!']
        },
        entrance: {
            type: String,
            required: [true, 'A hotel must have entrance time!']
        },
        leaving: {
            type: String,
            required: [true, 'A hotel must have leaving time!']
        },
    }, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// Virtual populate
hotelSchema.virtual('rooms', {
    ref: 'Room',
    foreignField: 'hotel',
    localField: '_id'
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;