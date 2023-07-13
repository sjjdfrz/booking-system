const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A room must have a title!']
        },
        pricePerNight: {
            type: String,
            required: [true, 'A room must have a price per night!']
        },
        capacity: {
            type: Number,
            required: [true, 'A room must have a maximum capacity of peoples!']
        },
        availableEntrance: {
            type: Date,
            required: [true, 'A hotel must have available entrance time!']
        },
        availableLeaving: {
            type: Date,
            required: [true, 'A hotel must have available leaving time!']
        },
        meal: {
            type: [String],
            default: ['breakfast']
        },
        hotel: {
            type: mongoose.Schema.ObjectId,
            ref: 'Hotel',
            required: [true, 'Room must belong to a hotel.']
        }
    }, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

roomSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'hotel',
        select: 'name photo'
    });
    next();
});

roomSchema.virtual('roomBookings', {
    ref: 'RoomBooking',
    foreignField: 'room',
    localField: '_id'
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;