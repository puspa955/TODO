import { useState } from 'react';
import DateSelector from './DateSelector'; 
import TaskForm from './TaskForm'; 
import TaskButton from './TaskButton'; 
import AddTaskButton from './AddTaskButton'; 

const TaskInput = ({ addTask }) => {
  const todayDate = new Date();
  const [task, setTask] = useState({ title: '', description: '', deadline: todayDate });
  const [showForm, setShowForm] = useState(false);

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
      setTask({ title: '', description: '', deadline: todayDate });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskForm task={task} onChange={handleChange} />
          <DateSelector
            deadline={task.deadline}
            onDateSelection={handleDateSelection}
            onClearDate={clearDate}
          />
          <div className="flex justify-end items-center">
            <TaskButton
              type="button"
              onClick={() => setShowForm(false)} 
              label="Cancel"
              disabled={false} 
              isCancel={true} 
            />
            <TaskButton
              type="submit"
              label="Add task"
              disabled={!task.title}
            />
          </div>
        </form>
      ) : (
        <AddTaskButton onClick={() => setShowForm(true)} /> 
      )}
    </div>
  );
};

export default TaskInput;
