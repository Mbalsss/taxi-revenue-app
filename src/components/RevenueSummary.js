import React from 'react';

const RevenueSummary = ({ trips, expenses }) => {
  const revenueByDriver = {};
  let totalRevenue = 0;

  trips.forEach((trip) => {
    totalRevenue += parseFloat(trip.fare);
    if (revenueByDriver[trip.driver]) {
      revenueByDriver[trip.driver] += parseFloat(trip.fare);
    } else {
      revenueByDriver[trip.driver] = parseFloat(trip.fare);
    }
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div>
      <h2>Revenue Summary by Driver</h2>
      <ul>
        {Object.keys(revenueByDriver).map((driver, index) => (
          <li key={index}>{driver}: ZAR {revenueByDriver[driver].toFixed(2)}</li>
        ))}
      </ul>
      <h3>Total Revenue: ZAR {totalRevenue.toFixed(2)}</h3>
      <h3>Total Expenses: ZAR {totalExpenses.toFixed(2)}</h3>
      <h3>Net Profit: ZAR {netProfit.toFixed(2)}</h3>
    </div>
  );
};

export default RevenueSummary;
