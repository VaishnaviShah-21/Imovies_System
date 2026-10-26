import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SNACKS_LIST = [
  { id: 's1', name: 'Caramel Popcorn', price: 180, image: '🍿' },
  { id: 's2', name: 'Cold Drink (Coca-Cola)', price: 120, image: '🥤' },
  { id: 's3', name: 'Cheese Nachos', price: 200, image: '🧀' },
  { id: 's4', name: 'Movie Combo (Popcorn + Drink)', price: 260, image: '🎬' }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await axios.get('http://localhost:5000/api/movies');
        const showsRes = await axios.get('http://localhost:5000/api/shows');
        
        setMovies(moviesRes.data);
        setShows(showsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date string to readable time
  const formatShowTime = (dateString) => {
    if (!dateString) return '10:00 AM';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Seat toggle handler
  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Snack quantity handler
  const handleSnackChange = (snack, qty) => {
    const currentQty = selectedSnacks[snack.id]?.quantity || 0;
    const newQty = Math.max(0, currentQty + qty);

    if (newQty === 0) {
      const updated = { ...selectedSnacks };
      delete updated[snack.id];
      setSelectedSnacks(updated);
    } else {
      setSelectedSnacks({
        ...selectedSnacks,
        [snack.id]: {
          name: snack.name,
          price: snack.price,
          quantity: newQty
        }
      });
    }
  };

  // Total Calculations
  const seatsCost = selectedShow ? selectedSeats.length * selectedShow.price : 0;
  const snacksCost = Object.values(selectedSnacks).reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );
  const grandTotal = seatsCost + snacksCost;

  // Submit Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedShow || selectedSeats.length === 0 || !userEmail) {
      alert('Please select a show, at least one seat, and enter your email!');
      return;
    }

    try {
      const bookingData = {
        show: selectedShow._id,
        userEmail,
        seats: selectedSeats,
        snacks: Object.values(selectedSnacks),
        totalAmount: grandTotal
      };

      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      setBookingSuccess('Booking Successful! Booking ID: ' + (response.data._id || 'Confirmed'));
      setSelectedSeats([]);
      setSelectedSnacks({});
      setUserEmail('');
      setSelectedShow(null);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book tickets. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', color: '#111827', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#6d28d9', fontWeight: 'bold' }}>IMovies - Book Your Show</h1>
      
      {/* Global Success Message Banner */}
      {bookingSuccess && (
        <div style={{ backgroundColor: '#f3e8ff', border: '2px solid #7c3aed', padding: '15px', borderRadius: '8px', textAlign: 'center', margin: '20px auto', maxWidth: '600px', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)' }}>
          <p style={{ color: '#5b21b6', margin: 0, fontWeight: 'bold', fontSize: '18px' }}>
            {bookingSuccess}
          </p>
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center', color: '#4b5563' }}>Loading movies and shows...</p>
      ) : (
        <>
          {/* Movies Showcase with Posters */}
          <h2 style={{ color: '#111827', borderBottom: '3px solid #7c3aed', paddingBottom: '6px', marginTop: '30px' }}>Now Showing (Movies)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '15px', justifyContent: 'center' }}>
            {movies.map(movie => (
              <div key={movie._id} style={{ backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '8px', width: '220px', padding: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                ) : (
                  <div style={{ width: '100%', height: '280px', backgroundColor: '#ede9fe', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', color: '#6b7280' }}>No Poster</div>
                )}
                <h3 style={{ margin: '5px 0', color: '#111827', fontSize: '16px', fontWeight: 'bold' }}>{movie.title}</h3>
                <p style={{ fontSize: '13px', color: '#4b5563', margin: '3px 0' }}>{movie.genre} | {movie.releaseYear}</p>
              </div>
            ))}
          </div>

          {/* Show Selection */}
          <h2 style={{ color: '#111827', borderBottom: '3px solid #7c3aed', paddingBottom: '6px', marginTop: '40px' }}>Select Show & Timings</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '15px', justifyContent: 'center' }}>
            {shows.map(show => (
              <div key={show._id} style={{ backgroundColor: selectedShow?._id === show._id ? '#ede9fe' : '#f5f3ff', border: selectedShow?._id === show._id ? '2px solid #7c3aed' : '1px solid #ddd6fe', borderRadius: '8px', width: '280px', padding: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '15px', color: '#111827', margin: '0 0 8px 0' }}><strong>Show Time:</strong> {formatShowTime(show.timing || show.time)}</p>
                <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 8px 0' }}><strong>Price per seat:</strong> ₹{show.price}</p>
                <button 
                  onClick={() => setSelectedShow(show)}
                  style={{ backgroundColor: selectedShow?._id === show._id ? '#5b21b6' : '#7c3aed', color: '#ffffff', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' }}>
                  {selectedShow?._id === show._id ? 'Show Selected' : 'Select Show'}
                </button>
              </div>
            ))}
          </div>

          {/* Booking Panel: Seats + Snacks */}
          {selectedShow && (
            <div style={{ marginTop: '40px', backgroundColor: '#faf5ff', padding: '25px', borderRadius: '10px', border: '2px solid #c084fc', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 6px 16px rgba(124, 58, 237, 0.1)' }}>
              
              {/* 1. Seat Grid */}
              <h3 style={{ color: '#6d28d9', textAlign: 'center', margin: '0 0 10px 0', fontSize: '20px' }}>Select Your Seats</h3>
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', letterSpacing: '1px' }}>SCREEN THIS WAY</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', margin: '15px 0 20px 0', justifyContent: 'center' }}>
                {['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'].map(seat => (
                  <button
                    key={seat}
                    onClick={() => handleSeatClick(seat)}
                    style={{
                      padding: '12px',
                      backgroundColor: selectedSeats.includes(seat) ? '#7c3aed' : '#e9d5ff',
                      color: selectedSeats.includes(seat) ? '#ffffff' : '#4c1d95',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                    {seat}
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', color: '#111827', fontSize: '15px' }}>Selected Seats: <strong>{selectedSeats.join(', ') || 'None'}</strong></p>

              {/* 2. Snacks Section */}
              <h3 style={{ color: '#6d28d9', textAlign: 'center', marginTop: '30px', fontSize: '20px' }}>2. Grab Some Snacks 🍿</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {SNACKS_LIST.map(snack => {
                  const qty = selectedSnacks[snack.id]?.quantity || 0;
                  return (
                    <div key={snack.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                      <div>
                        <span style={{ fontSize: '20px', marginRight: '10px' }}>{snack.image}</span>
                        <strong style={{ color: '#111827' }}>{snack.name}</strong>
                        <span style={{ color: '#6b7280', marginLeft: '10px' }}>₹{snack.price}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={() => handleSnackChange(snack, -1)} style={{ backgroundColor: '#ddd6fe', color: '#4c1d95', border: 'none', borderRadius: '4px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>-</button>
                        <span style={{ color: '#111827', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => handleSnackChange(snack, 1)} style={{ backgroundColor: '#7c3aed', color: '#ffffff', border: 'none', borderRadius: '4px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3. Summary & Booking */}
              <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '2px solid #e9d5ff' }}>
                <p style={{ fontSize: '14px', margin: '4px 0', color: '#4b5563' }}>Tickets ({selectedSeats.length}): ₹{seatsCost}</p>
                <p style={{ fontSize: '14px', margin: '4px 0', color: '#4b5563' }}>Snacks: ₹{snacksCost}</p>
                <h3 style={{ color: '#111827', margin: '10px 0', fontSize: '20px', fontWeight: 'bold' }}>Total Amount: ₹{grandTotal}</h3>

                <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #c084fc', backgroundColor: '#ffffff', color: '#111827', fontSize: '15px' }}
                  />
                  <button type="submit" style={{ backgroundColor: '#7c3aed', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(124, 58, 237, 0.3)' }}>
                    Confirm & Pay ₹{grandTotal}
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;