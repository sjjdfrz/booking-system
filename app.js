const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const flightRouter = require('./routes/flightRoutes.js');
const trainRouter = require('./routes/trainRoutes.js');
const hotelRouter = require('./routes/hotelRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/trains', trainRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
