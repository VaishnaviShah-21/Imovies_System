IMovies - Full-Stack Movie Ticket Booking System

IMovies is a web-based movie ticket booking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application enables users to browse current movies, select showtimes, pick seats dynamically, order refreshments, and receive booking confirmations.

Features

Movie Listing: Browse currently screening movies with details including title, genre, and release year.

Showtime Selection: Select preferred showtimes and dates with corresponding ticket rates.

Interactive Seat Layout: Select specific seats from a visual grid layout.

Refreshments: Select optional snacks and beverages with real-time total price calculation.

Booking Confirmation: Generate unique MongoDB-backed booking reference IDs upon completion.

Responsive Interface: Designed for accessibility across desktop and mobile browsers.

Tech Stack

Frontend

React.js

JavaScript (ES6+)

HTML5 / CSS3

Backend

Node.js

Express.js

Database

MongoDB with Mongoose ORM

Project Structure

Imovies_System/
├── client/          # React frontend application
├── server/          # Node.js & Express backend application
└── .gitignore       # Git ignore file


Installation and Setup

Prerequisites

Node.js (v14 or higher)

npm or yarn

MongoDB instance (local or MongoDB Atlas connection string)

1. Clone the Repository

git clone https://github.com/VaishnaviShah-21/Imovies_System.git
cd Imovies_System


2. Backend Setup

cd server
npm install
npm start


The server runs on http://localhost:5000 by default and connects to MongoDB.

3. Frontend Setup

Open a second terminal window:

cd client
npm install
npm start


The application will open in the browser at http://localhost:3000.

Future Scope

AI Recommendation Engine: Movie and refreshment suggestions based on user watch history.

Automated Customer Support: AI chatbot for general inquiries and automated cancellation workflows.

Loyalty Program and Digital Wallet: User reward points for frequent bookings and balance integration.

User Authentication: Secure JWT-based login and user profile management.

Payment Gateway Integration: Integration with online payment processing gateways.
