import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    className: '',
    rollNo: '',
    phone: '',
    dob: ''
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const seatPrice = 250; // Price per seat

  const rows = [
    { row: 'A', seats: 10 },
    { row: 'B', seats: 10 },
    { row: 'C', seats: 12 },
    { row: 'D', seats: 12 },
    { row: 'E', seats: 16 },
    { row: 'F', seats: 16 },
    { row: 'G', seats: 16 },
    { row: 'H', seats: 16 },
    { row: 'I', seats: 16 },
    { row: 'J', seats: 16 },
    { row: 'K', seats: 20 },
    { row: 'L', seats: 20 }
  ];

  const reserveSeats = (row, seatIndex) => {
    const selected = `${row.row}${row.seats - seatIndex}`; // Start numbering from the right
    // Toggle seat selection
    if (selectedSeats.includes(selected)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== selected)); // Deselect seat
    } else {
      // Allow seat selection for last two rows (K and L) for both genders
      if (
        row.row === 'K' || 
        row.row === 'L' || 
        (formData.gender === 'M' && seatIndex < row.seats / 2) ||
        (formData.gender === 'F' && seatIndex >= row.seats / 2)
      ) {
        setSelectedSeats([...selectedSeats, selected]); // Select seat
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    if (formData.name && formData.gender && formData.className && formData.rollNo && formData.phone && formData.dob) {
      setIsFormFilled(true);
    }
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  const handleBooking = () => {
    alert(`Booking confirmed for seats: ${selectedSeats.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center p-5">
      {!isFormFilled && (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg animate-pop-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Your Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender:</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Class:</label>
              <select 
                name="className" 
                value={formData.className} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select Class</option>
                <option value="BCA1">BCA1</option>
                <option value="BCA2">BCA2</option>
                <option value="BCA3">BCA3</option>
                <option value="MCA1">MCA1</option>
                <option value="MCA3">MCA3</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Roll No:</label>
              <input 
                type="number" 
                name="rollNo" 
                value={formData.rollNo} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone:</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth:</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required 
              />
            </div>
            <button 
              type="button" 
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {isFormFilled && (
        <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-6xl animate-pop-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Your Seats</h2>
          <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>Nalanda College- Auditorium</h2>
          <div className="grid grid-cols-1 gap-4">
            {rows.map((row) => (
              <div key={row.row} className="flex justify-center items-center mb-2">
                <span className="mr-2 font-bold">{row.row}</span>
                <div className="flex flex-nowrap overflow-x-auto">
                  {Array.from({ length: row.seats }).map((_, seatIndex) => {
                    const seatNumber = row.seats - seatIndex; // Start numbering from the right
                    return (
                      <button
                        key={seatIndex}
                        className={`w-10 h-10 m-2 rounded-full 
                        ${selectedSeats.includes(`${row.row}${seatNumber}`) ? 'bg-green-500' : 'bg-gray-300'}
                        hover:bg-blue-500 transition-colors transform duration-300 ease-in-out 
                        ${ 
                          (row.row === 'K' || row.row === 'L') ||
                          (formData.gender === 'M' && seatIndex < row.seats / 2) ||
                          (formData.gender === 'F' && seatIndex >= row.seats / 2)
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed opacity-50'
                        }`}
                        onClick={() => reserveSeats(row, seatIndex)}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}
                </div>
                <span className="ml-2 font-bold">{row.row}</span>
              </div>
            ))}
          </div>
                    {/* Additional Information Below the Rows */}
                    <div className="mt-4 text-center text-red-600 italic font-bold">
            Note: Row J and K Seats are on the top floor for both girls and boys.
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold">Booking Cart</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="text-lg mb-2 sm:mb-0">
                Seats Selected: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </div>
              <div className="text-lg mb-2 sm:mb-0">Total Price: ₹{selectedSeats.length * seatPrice}</div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={toggleDetails}
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-200 rounded-lg">
              <h3 className="font-bold">Booking Details:</h3>
              <p>Name: {formData.name}</p>
              <p>Gender: {formData.gender}</p>
              <p>Class: {formData.className}</p>
              <p>Roll No: {formData.rollNo}</p>
              <p>Phone: {formData.phone}</p>
              <p>Date of Birth: {formData.dob}</p>
              <p>Seats: {selectedSeats.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
