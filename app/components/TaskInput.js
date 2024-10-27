import React, { useState, useEffect } from 'react';
import TaskDetailsInput from './TaskDetailsInput';
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector';

const categories = ['Work', 'Home', 'School', 'Birthday'];

const TaskInput = ({ addTask, editingTask, updateTask }) => {
  const todayDate = new Date();
  
  const [state, setState] = useState({
    task: { title: '', description: '', deadline: todayDate, category: '' },
    showForm: false,
  });

  useEffect(() => {
    if (editingTask) {
      setState({ task: editingTask, showForm: true });
    } else {
      setState({ task: { title: '', description: '', deadline: todayDate, category: '' }, showForm: false });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    let name, value;
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = 'category';
      value = e;
    }
    setState((prevState) => ({
      ...prevState,
      task: { ...prevState.task, [name]: value },
    }));
  };

  const handleDateChange = (date) => {
    setState((prevState) => ({
      ...prevState,
      task: { ...prevState.task, deadline: date },
    }));
  };

  const clearDate = () => {
    setState((prevState) => ({
      ...prevState,
      task: { ...prevState.task, deadline: null },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.task.title && state.task.category) {
      if (editingTask) {
        updateTask(state.task);
      } else {
        addTask(state.task);
      }
      setState({ task: { title: '', description: '', deadline: todayDate, category: '' }, showForm: false });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      {state.showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskDetailsInput 
            title={state.task.title} 
            description={state.task.description} 
            onChange={handleChange} 
          />

          <div className="flex items-center space-x-2">
            <CategorySelector 
              value={state.task.category} 
              onChange={handleChange} 
              categories={categories} 
            />
            <DateSelector 
              selectedDate={state.task.deadline} 
              onDateChange={handleDateChange} 
              clearDate={clearDate} 
            />
          </div>

          <div className="flex justify-end items-center space-x-4">
            <button
              type="button"
              onClick={() => setState((prev) => ({ ...prev, showForm: false }))}
              className="px-4 py-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white text-sm ${
                state.task.title && state.task.category ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!state.task.title || !state.task.category}
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setState((prev) => ({ ...prev, showForm: true }))} className="text-red-500 flex items-center text-sm group">
          <span className="text-xl mr-2 pb-1 group-hover:bg-red-500 group-hover:text-white h-4 w-4 flex items-center justify-center rounded-full transition-colors">
            +
          </span>
          Add task
        </button>
      )}
    </div>
  );
};

export default TaskInput;