import { useState, useRef } from 'react';
import { format, isTomorrow, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskInput = ({ addTask }) => {
  const todayDate = new Date(); // Get today's date
  const [task, setTask] = useState({ title: '', description: '', deadline: todayDate }); // Default to today's date
  const [showForm, setShowForm] = useState(false);

  const datePickerRef = useRef(null); // Ref for DatePicker

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateSelection = (date) => {
    setTask((prevTask) => ({ ...prevTask, deadline: date }));
  };

  const clearDate = () => {
    setTask((prevTask) => ({ ...prevTask, deadline: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title) {
      addTask(task);
      setTask({ title: '', description: '', deadline: todayDate }); // Reset form with today's date as default
      setShowForm(false);
    }
  };

  const getFormattedDate = () => {
    if (!task.deadline) return 'Due date';
    if (isToday(task.deadline)) return 'Today';
    if (isTomorrow(task.deadline)) return 'Tomorrow';
    return format(task.deadline, 'dd MMM yyyy');
  };

  const showCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Programmatically open the date picker
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 bg-gray-50">
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Task name"
              className="w-full p-2 bg-transparent border-none focus:outline-none text-sm font-bold"
              required
            />
            <input
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={showCalendar} // Show calendar on button click
                className="flex items-center px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100"
              >
                {/* Calendar Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 mr-2 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-13 5h16a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
                  />
                </svg>
                {/* Date Text */}
                {getFormattedDate()}
                {task.deadline && (
                  <span className="ml-2 cursor-pointer text-red-500" onClick={clearDate}>
                    ✕
                  </span>
                )}
              </button>

              <DatePicker
                ref={datePickerRef} // Assign ref to DatePicker
                selected={task.deadline}
                onChange={handleDateSelection}
                minDate={new Date()} // Prevent past dates
                dateFormat="dd MMM yyyy"
                onClickOutside={() => datePickerRef.current.setOpen(false)} // Close when clicking outside
                withPortal // Opens in a fullscreen overlay
                className="hidden" // Hides the input field
              />
            </div>
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
                  task.title ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!task.title}
              >
                Add task
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
        onClick={() => setShowForm(true)}
        className="text-red-500 flex items-center text-sm group"
        >
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
