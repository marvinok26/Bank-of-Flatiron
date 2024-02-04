// TransactionTable.js
import React from 'react';

const TransactionTable = ({ transactions, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount ($)</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
