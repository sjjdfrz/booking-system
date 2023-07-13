const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'roomBooking must belong to a user.']
        },
        room: {
            type: mongoose.Schema.ObjectId,
            ref: 'Room',
            required: [true, 'roomBooking must belong to a room.']
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

roomBookingSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'user',
        select: 'name photo'
    }).populate({
        path: 'room',
        select: 'title pricePerNight capacity'
    });
    next();
});

const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);

module.exports = RoomBooking;