const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const flightRouter = require('./routes/flightRoutes');
const trainRouter = require('./routes/trainRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const roomRouter = require('./routes/roomRoutes');
const flightBookingRouter = require('./routes/flightBookingRoutes');
const trainBookingRouter = require('./routes/trainBookingRoutes');
const roomBookingRouter = require('./routes/roomBookingRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const path = require("path");

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// //Limit requests from same API
const limiter = rateLimit({
    max: 2000,
    windowMs: 24 * 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/trains', trainRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flight-booking', flightBookingRouter);
app.use('/api/v1/train-booking', trainBookingRouter);
app.use('/api/v1/room-booking', roomBookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
