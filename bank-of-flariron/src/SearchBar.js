import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-gray-700">Search</label>
      <div className="flex gap-2">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="description…"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onSearch(term)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
