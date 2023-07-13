const {promisify} = require('util');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, res);
});


exports.login = catchAsync(async (req, res, next) => {

    const {username, password} = req.body;

    // 1) check if email and password exist
    if (!username || !password)
        return next(new AppError('please provide email or phone and password!', 400));

    // 2) check if user exists and password is correct
    let filter;
    if (username.includes('@')) filter = {email: username};
    else filter = {phone: username};
    const user = await User.findOne(filter).select('+password');

    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError('incorrect password or email!', 401));

    // 3) if everything ok, send token to the client
    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({status: 'success'});
};

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token)
        return next(new AppError('You are not logged in! Please log in to get access.', 401));

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(new AppError('The user belonging to this token does no longer exist.', 401));


    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat))
        return next(new AppError('User recently changed password! please log in again.', 401));

    req.user = currentUser;
    next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role))
            return next(new AppError('You do not have permission to perform this action!'), 403);

        next();
    };
};


