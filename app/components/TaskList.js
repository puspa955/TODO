import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import TaskInput from './TaskInput';

const TaskList = ({ tasks, removeTask, completeTask, updateTask, isCompleted = false }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const renderTaskActions = (index) => {
    if (isCompleted) {
      return (
        <button onClick={() => removeTask(index)} aria-label="Delete task">
          <FaTrash className="w-4 h-4" />
        </button>
      );
    }

    return (
      <>
        <button onClick={() => completeTask(index)} aria-label="Complete task">
          <FaCheck className="w-4 h-4" />
        </button>
        <button onClick={() => setEditingIndex(index)} aria-label="Edit task">
          <FaEdit className="w-4 h-4" />
        </button>
        <button onClick={() => removeTask(index)} aria-label="Delete task">
          <FaTrash className="w-4 h-4" />
        </button>
      </>
    );
  };

  const renderTaskDate = (task) => {
    if (isCompleted) {
      return `Completed at: ${format(new Date(), 'dd MMM yyyy')}`;
    }
    return task.deadline ? `Due: ${format(new Date(task.deadline), 'MM/dd/yyyy')}` : null;
  };

  return (
    <div className="mt-6 space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index}>
            {editingIndex === index ? (
              <TaskInput
                addTask={updateTask}
                editingTask={task}
                updateTask={(updatedTask) => {
                  updateTask('edit', { index, details: updatedTask });
                  setEditingIndex(null);
                }}
              />
            ) : (
              <li className="bg-white p-4 rounded-lg shadow-md flex items-start justify-between">
                <div className="flex flex-grow space-x-3">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    {task.description && <p className="text-gray-500">{task.description}</p>}
                    <p className="text-gray-400 text-sm mt-1">
                      {renderTaskDate(task)} - <span className="font-semibold">{task.category}</span>
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {renderTaskActions(index)}
                </div>
              </li>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;