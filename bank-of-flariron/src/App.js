import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import LatestTransactions from './LatestTransactions';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered]      = useState([]);
  const [latest, setLatest]          = useState([]);

  /** 1.  Load db.json on mount */
  useEffect(() => {
    fetch('/db.json')
      .then(r => r.json())
      .then(({ transactions }) => {
        const sorted = [...transactions].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sorted);
        setFiltered(sorted);
        setLatest(sorted.slice(0, 5));
      })
      .catch(console.error);
  }, []);

  /** 2.  Search */
  const handleSearch = term => {
    const list = transactions.filter(t =>
      t.description.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(list);
  };

  /** 3.  Add */
  const addTransaction = tx => {
    const newTx = { id: Date.now(), ...tx };       // temp id
    const updated = [newTx, ...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setTransactions(updated);
    setFiltered(updated);
    setLatest(updated.slice(0, 5));
  };

  /** 4.  Delete */
  const deleteTransaction = id => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    setFiltered(updated);
    setLatest(updated.slice(0, 5));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Bank Transactions
      </h1>

      <SearchBar onSearch={handleSearch} />
      <LatestTransactions transactions={latest} />

      <TransactionTable
        transactions={filtered}
        onDelete={deleteTransaction}
      />

      <TransactionForm onAdd={addTransaction} />
    </div>
  );
}

export default App;
