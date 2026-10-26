const express = require('express');
const router = express.Router();

// Import Controllers
const { getMovies, createMovie } = require('../controllers/controller');
const { addTheater, getTheaters, addShow, getShows } = require('../controllers/theaterController');
const { createBooking, getBookings } = require('../controllers/bookingController');

// Movie Routes
router.get('/movies', getMovies);
router.post('/movies', createMovie);

// Theater Routes
router.post('/theaters', addTheater);
router.get('/theaters', getTheaters);

// Show Routes
router.post('/shows', addShow);
router.get('/shows', getShows);

// Booking Routes
router.post('/bookings', createBooking);
router.get('/bookings', getBookings);

module.exports = router;