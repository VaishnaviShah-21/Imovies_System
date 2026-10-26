const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const moviesWithPosters = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets...',
    releaseYear: 2010,
    genre: 'Sci-Fi',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg'
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space...',
    releaseYear: 2014,
    genre: 'Sci-Fi',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc...',
    releaseYear: 2008,
    genre: 'Action',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War...',
    releaseYear: 2019,
    genre: 'Action',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg'
  }
];

const updateMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imovies');
    console.log('Connected to MongoDB...');
    
    // Clear and insert updated movies
    await Movie.deleteMany({});
    await Movie.insertMany(moviesWithPosters);
    console.log('Database updated with movie posters successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error updating DB:', error);
    process.exit(1);
  }
};

updateMovies();