import React from 'react';

const LatestTransactions = ({ transactions }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">
      Latest Transactions
    </h2>

    <ul className="space-y-2">
      {transactions.map(t => (
        <li
          key={t.id}
          className="flex justify-between p-3 bg-gray-50 rounded border shadow-sm"
        >
          <span>{t.description}</span>
          <span
            className={`font-medium ${
              parseFloat(t.amount) < 0 ? 'text-red-500' : 'text-green-600'
            }`}
          >
            ${parseFloat(t.amount).toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default LatestTransactions;
