const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A room must have a title!']
        },
        price: {
            type: Number,
            required: [true, 'A room must have a price!']
        },
        maxPeople: {
            type: Number,
            required: [true, 'A room must have a maximum capacity of peoples!']
        },
        images: [String],
        features: {
            type: String,
            required: [true, `You have not specified feature of room!`]
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A room must have description!']
        },
        // roomsNumbers:,
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;