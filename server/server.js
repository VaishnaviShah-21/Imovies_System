const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const movieRoutes = require('./routes/routes');
app.use('/api', movieRoutes); 

// Basic Route
app.get('/', (req, res) => {
    res.send('IMovies Server is running!');
});

// Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imovies')
.then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection error:', err);
});