const Theater = require('../models/Theater');
const Show = require('../models/Show');

// Add Theater
const addTheater = async (req, res) => {
    try {
        const newTheater = new Theater(req.body);
        const savedTheater = await newTheater.save();
        res.status(201).json(savedTheater);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Theaters
const getTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Show
const addShow = async (req, res) => {
    try {
        const newShow = new Show(req.body);
        const savedShow = await newShow.save();
        res.status(201).json(savedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Shows (with Movie and Theater details)
const getShows = async (req, res) => {
    try {
        const shows = await Show.find().populate('movie').populate('theater');
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTheater, getTheaters, addShow, getShows };