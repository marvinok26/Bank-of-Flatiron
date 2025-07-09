import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount,      setAmount]      = useState('');
  const [category,    setCategory]    = useState('');
  const [date,        setDate]        = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!(description && amount && category && date)) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      date
    });

    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <input
          className="w-full p-2 border rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Amount ($)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Category</label>
        <input
          className="w-full p-2 border rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
