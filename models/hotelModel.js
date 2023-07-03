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
            type: String,
            required: [true, `You have not specified feature of hotel!`]
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A hotel must have description!']
        },
        // rooms:,
        // chepeatPrice:,
        // type:
    }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;