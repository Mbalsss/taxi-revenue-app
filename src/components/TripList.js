import React from 'react';

const TripList = ({ trips }) => {
  return (
    <div>
      <h2>Trip List</h2>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            <strong>{trip.destination}</strong> - {trip.passengers} passengers - ZAR {trip.fare} - {trip.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
