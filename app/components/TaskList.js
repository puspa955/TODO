import { useRef } from 'react';
import { format, isTomorrow, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';
import { FaCheck, FaEdit, FaTrash, FaCalendarAlt, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons
import 'react-datepicker/dist/react-datepicker.css';

const categories = ['Work', 'Personal', 'Study', 'Fitness']; // Define your categories here

const TaskList = ({
  tasks,
  removeTask,
  startEditTask,
  completeTask,
  editingTaskIndex,
  saveEditedTask,
  editedTask,
  setEditedTask,
  isCompleted = false, // New prop to check if it's completed tasks
}) => {
  const datePickerRef = useRef(null); // Ref for DatePicker

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value }); // Update edited task directly
  };

  const handleEditDateSelection = (date) => {
    setEditedTask({ ...editedTask, deadline: date }); // Update the date of the edited task
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    saveEditedTask(); // Save edited task with index
  };

  const getFormattedDate = (date) => {
    if (!date) return 'Due date';
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'dd MMM yyyy');
  };

  return (
    <div className="mt-6 space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex space-x-3">
              {editingTaskIndex === index ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col space-y-4">
                  <div className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 bg-gray-50">
                    <input
                      type="text"
                      name="title"
                      value={editedTask.title}
                      onChange={handleEditChange}
                      placeholder="Task name"
                      className="w-full p-2 bg-transparent border-none focus:outline-none text-sm font-bold"
                      required
                    />
                    <input
                      type="text"
                      name="description"
                      value={editedTask.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
                    />
                    {/* Category selector */}
                    <select
                      name="category"
                      value={editedTask.category}
                      onChange={handleEditChange}
                      className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => datePickerRef.current.setOpen(true)} // Show calendar on button click
                      className="flex items-center px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaCalendarAlt className="mr-2" /> {/* Calendar icon */}
                      <span className="mr-2">{getFormattedDate(editedTask.deadline)}</span>
                      <FaTimes className="cursor-pointer" onClick={() => setEditedTask({ ...editedTask, deadline: null })} /> {/* Cross icon */}
                    </button>
                    <DatePicker
                      ref={datePickerRef}
                      selected={editedTask.deadline}
                      onChange={handleEditDateSelection}
                      minDate={new Date()} // Prevent past dates
                      dateFormat="dd MMM yyyy"
                      onClickOutside={() => datePickerRef.current.setOpen(false)} // Close when clicking outside
                      withPortal
                      className="hidden"
                    />
                  </div>
                  <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                </form>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  {task.description && <p className="text-gray-500">{task.description}</p>}
                  {isCompleted ? ( // Show completion date for completed tasks
                    <p className="text-gray-400 text-sm mt-1">
                      Completed at: {format(new Date(), 'dd MMM yyyy')} - <span className="font-semibold">{task.category}</span>
                    </p>
                  ) : (
                    task.deadline && (
                      <p className="text-gray-400 text-sm mt-1">
                        Due: {format(new Date(task.deadline), 'MM/dd/yyyy')} - <span className="font-semibold">{task.category}</span>
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              {/* Conditional rendering based on whether it's completed tasks */}
              {!isCompleted ? (
                <>
                  {editingTaskIndex === null && (
                    <>
                      <button
                        onClick={() => completeTask(index)} // Mark task as complete
                      >
                        <FaCheck className="w-4 h-4" /> {/* Check mark icon */}
                      </button>
                      <button
                        onClick={() => startEditTask(index)} // Start editing the task
                      >
                        <FaEdit className="w-4 h-4" /> {/* Edit icon */}
                      </button>
                      <button
                        onClick={() => removeTask(index)} // Remove task
                      >
                        <FaTrash className="w-4 h-4" /> {/* Delete icon */}
                      </button>
                    </>
                  )}
                </>
              ) : (
                // Only show delete button for completed tasks
                <>
                  <button
                    onClick={() => removeTask(index)} // Delete completed task
                  >
                    <FaTrash className="w-4 h-4" /> {/* Delete icon */}
                  </button>
                </>
              )}
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;