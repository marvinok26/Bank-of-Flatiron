import React, { useState } from 'react';

const ITEMS_PER_PAGE = 5;

const TransactionTable = ({ transactions, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const paginated = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border rounded shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold">
            <th className="p-2">ID</th>
            <th className="p-2">Description</th>
            <th className="p-2">Amount ($)</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{t.id}</td>
              <td className="p-2">{t.description}</td>
              <td className="p-2">{parseFloat(t.amount).toFixed(2)}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.date}</td>
              <td className="p-2">
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default TransactionTable;
