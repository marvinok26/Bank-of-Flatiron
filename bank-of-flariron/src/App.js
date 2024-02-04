// App.js
import React, { useState, useEffect } from 'react';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transactions');
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTransaction = (newTransaction) => {
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = filteredTransactions.filter(
      (transaction) => transaction.id !== id
    );
    setFilteredTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1 id='transactions'>Bank Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <TransactionTable
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
      />
      <TransactionForm onAdd={addTransaction} />
    </div>
  );
};

export default App;
