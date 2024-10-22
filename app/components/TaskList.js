import { useState } from 'react';
import { format } from 'date-fns';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import TaskDetailsInput from './TaskDetailsInput';
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector';

const categories = ['Work', 'Home', 'School', 'Birthday'];

const TaskList = ({
  tasks,
  removeTask,
  completeTask,
  updateTask,
  isCompleted = false,
}) => {
  const [editingTask, setEditingTask] = useState({ index: null, details: { title: '', description: '', deadline: null, category: '' } });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingTask.index !== null) {
      updateTask('edit', { index: editingTask.index, details: editingTask.details });
      setEditingTask({ index: null, details: { title: '', description: '', deadline: null, category: '' } }); 
    }
  };

  return (
    <div className="mt-6 space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start justify-between">
            <div className="flex flex-grow space-x-3">
              {editingTask.index === index ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col space-y-4 w-full">
                  <TaskDetailsInput
                    title={editingTask.details.title}
                    description={editingTask.details.description}
                    onChange={handleEditChange}
                  />

                  <div className="flex items-center space-x-2">
                    <CategorySelector
                      value={editingTask.details.category}
                      onChange={handleEditChange}
                      categories={categories}
                    />

                    <DateSelector
                      selectedDate={editingTask.details.deadline}
                      onDateChange={(date) => setEditingTask({ ...editingTask, details: { ...editingTask.details, deadline: date } })}
                      clearDate={() => setEditingTask({ ...editingTask, details: { ...editingTask.details, deadline: null } })}
                    />
                  </div>

                  <div className="flex justify-end items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setEditingTask({ index: null, details: { title: '', description: '', deadline: null, category: '' } })} // Cancel editing
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  {task.description && <p className="text-gray-500">{task.description}</p>}
                  {isCompleted ? (
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
              {!isCompleted ? (
                <>
                  {editingTask.index !== index && (
                    <>
                      <button onClick={() => completeTask(index)}>
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button onClick={() => {
                        setEditingTask({ index, details: task }); // Load the task data into the edit form
                      }}>
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeTask(index)}>
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <button onClick={() => removeTask(index)}>
                  <FaTrash className="w-4 h-4" />
                </button>
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
