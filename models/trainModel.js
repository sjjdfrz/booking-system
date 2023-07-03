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
        departing: {
            type: Date,
            required: [true, 'A train must have departing Date!']
        },
        returning: Date,
        // passenger: {
        //     type: Number,
        //     required: [true, `You have not specified the number of passengers!`]
        // },
        coupeFeatures: {
          type: String,
            required: [true, `You have not specified feature of coupes!`]
        },
        trainFeatures: {
            type: String,
            required: [true, `You have not specified feature of train!`]
        },
        type: {
            type: String,
            enum: {
                values: ['کوپه ای 4 نفره', 'کوپه ای 6 نفره', 'سالنی 4 ردیفه'],
                message: `Type is either: کوپه ای 4 نفره, کوپه ای 6 نفره, سالنی 4 ردیفه`
            },
            default: 'کوپه ای 4 نفره'
        },
        price: {
            type: Number,
            required: [true, 'A train must have a price']
        },
        images: [String]
    }
);

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;