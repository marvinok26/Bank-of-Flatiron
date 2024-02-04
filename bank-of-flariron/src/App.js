// App.js
import React, { useState, useEffect } from 'react';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
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

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      const updatedTransactions = filteredTransactions.filter(
        (transaction) => transaction.id !== id
      );
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className='container'>
      <h1 >BANK TRANSACTIONS</h1>
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
