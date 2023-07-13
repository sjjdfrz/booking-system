const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid email!']
    },
    phone: {
        type: Number,
        required: [true, 'Please provide your phone'],
        unique: true,
    },
    birthdate: Date,
    address: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            // this only works on SAVE and CREATE
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not equal!'
        }
    },
    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.pre('save', async function (next) {
    // only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // delete passwordConfirm field
    this.passwordConfirm = undefined;

    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({active: {$ne: false}});
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // False means password NOT changed
    return false;
};

// Virtual populate
userSchema.virtual('flightBookings', {
    ref: 'FlightBooking',
    foreignField: 'user',
    localField: '_id'
});

userSchema.virtual('trainBookings', {
    ref: 'TrainBooking',
    foreignField: 'user',
    localField: '_id'
});

userSchema.virtual('roomBookings', {
    ref: 'RoomBooking',
    foreignField: 'user',
    localField: '_id'
});

const User = mongoose.model('User', userSchema);

module.exports = User;