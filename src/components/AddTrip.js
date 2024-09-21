import React, { useState } from 'react';

const AddTrip = ({ onAddTrip, drivers }) => {
  const [tripData, setTripData] = useState({
    destination: '',
    passengers: '',
    fare: '',
    date: '',
    driver: '',
    paymentMethod: 'Cash',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrip(tripData);
    setTripData({ destination: '', passengers: '', fare: '', date: '', driver: '', paymentMethod: 'Cash' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Trip</h3>
      <label>Destination:</label>
      <input type="text" name="destination" value={tripData.destination} onChange={handleChange} required />
      <label>Passengers:</label>
      <input type="number" name="passengers" value={tripData.passengers} onChange={handleChange} required />
      <label>Fare (ZAR):</label>
      <input type="number" name="fare" value={tripData.fare} onChange={handleChange} required />
      <label>Date:</label>
      <input type="date" name="date" value={tripData.date} onChange={handleChange} required />
      <label>Driver:</label>
      <select name="driver" value={tripData.driver} onChange={handleChange} required>
        <option value="">Select Driver</option>
        {drivers.map((driver, index) => (
          <option key={index} value={driver}>{driver}</option>
        ))}
      </select>
      <label>Payment Method:</label>
      <select name="paymentMethod" value={tripData.paymentMethod} onChange={handleChange}>
        <option value="Cash">Cash</option>
        <option value="Mobile">Mobile Payment</option>
      </select>
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrip;
