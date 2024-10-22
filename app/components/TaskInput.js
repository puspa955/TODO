import { useState } from 'react';
import TaskDetailsInput from './TaskDetailsInput';
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector'; 

const categories = ['Work', 'Home', 'School', 'Birthday']; 

const TaskInput = ({ addTask }) => {
  const todayDate = new Date();
  const [task, setTask] = useState({ title: '', description: '', deadline: todayDate, category: '' });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date) => {
    setTask((prevTask) => ({ ...prevTask, deadline: date }));
  };

  const clearDate = () => {
    setTask((prevTask) => ({ ...prevTask, deadline: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.category) {
      addTask(task);
      setTask({ title: '', description: '', deadline: todayDate, category: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskDetailsInput title={task.title} description={task.description} onChange={handleChange} />

          <div className="flex items-center space-x-2">
            <CategorySelector
              value={task.category}
              onChange={handleChange}
              categories={categories} 
            />

            <DateSelector
              selectedDate={task.deadline}
              onDateChange={handleDateChange}
              clearDate={clearDate}
            />
          </div>

          <div className="flex justify-end items-center">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md text-white text-sm ${
                  task.title && task.category ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!task.title || !task.category}
              >
                Add task
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-red-500 flex items-center text-sm group">
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
