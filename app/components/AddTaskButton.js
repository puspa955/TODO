import React from 'react';

const AddTaskButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-red-500 flex items-center text-sm group">
      <span className="text-xl mr-2 pb-1 group-hover:bg-red-500 group-hover:text-white h-4 w-4 flex items-center justify-center rounded-full transition-colors">
        +
      </span>
      Add task
    </button>
  );
};

export default AddTaskButton;
