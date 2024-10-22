import React from 'react';

const CategorySelector = ({ value, onChange, categories }) => {
  return (
    <select
      name="category"
      value={value}
      onChange={onChange}
      className="w-30 px-3 py-1 bg-transparent border border-gray-300 bg-gray-50 rounded-md focus:outline-none text-sm"
      required
    >
      <option value="" disabled>Select category</option>
      {categories.map((category, idx) => (
        <option key={idx} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
