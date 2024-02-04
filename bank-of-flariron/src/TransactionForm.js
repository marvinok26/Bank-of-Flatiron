// TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      description,
      amount,
      category,
    };

    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const data = await response.json();
      onAdd(data); // Update the UI with the new transaction
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;
