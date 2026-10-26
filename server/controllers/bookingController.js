const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { show, userEmail, seats, snacks, totalAmount } = req.body;

    // Validate required fields
    if (!show || !userEmail || !seats || seats.length === 0 || !totalAmount) {
      return res.status(400).json({ error: 'Please provide all required booking details.' });
    }

    const newBooking = new Booking({
      show,
      userEmail,
      seats,
      snacks: snacks || [],
      totalAmount
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Server error while creating booking' });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('show');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error while fetching bookings' });
  }
};