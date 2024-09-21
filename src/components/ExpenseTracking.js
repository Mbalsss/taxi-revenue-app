import React, { useState } from 'react';

const ExpenseTracking = ({ expenses, onAddExpense }) => {
  const [expenseData, setExpenseData] = useState({ type: '', amount: '', date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expenseData);
    setExpenseData({ type: '', amount: '', date: '' });
  };

  return (
    <div>
      <h3>Expense Tracking</h3>
      <form onSubmit={handleSubmit}>
        <label>Expense Type:</label>
        <input type="text" name="type" value={expenseData.type} onChange={handleChange} required />
        <label>Amount (ZAR):</label>
        <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} required />
        <label>Date:</label>
        <input type="date" name="date" value={expenseData.date} onChange={handleChange} required />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{`${expense.type}: ZAR ${expense.amount} on ${expense.date}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracking;
