"use client"
import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]); // Todo List
  const [completedTasks, setCompletedTasks] = useState([]); // Completed Tasks
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', deadline: null }); // Ensure it's initialized

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  const startEditTask = (index) => {
    setEditingTaskIndex(index); // Set the task to be edited
    setEditedTask(tasks[index]); // Set the current task for editing
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingTaskIndex ? editedTask : task
    );
    setTasks(updatedTasks);
    setEditingTaskIndex(null); // Reset editing task
    setEditedTask({ title: '', description: '', deadline: null }); // Clear edited task
  };

  const completeTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]); // Add to completed tasks
    removeTask(index); // Remove from todo list
  };

  const removeCompletedTask = (indexToRemove) => {
    const updatedCompletedTasks = completedTasks.filter((_, index) => index !== indexToRemove);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className='text-3xl text-center mb-6'>My TODO List</h1>
        <TaskInput addTask={addTask} />
        <h2 className='text-xl mt-6'>Todo</h2>
        <TaskList
          tasks={tasks}
          removeTask={removeTask}
          startEditTask={startEditTask}
          completeTask={completeTask}
          editingTaskIndex={editingTaskIndex}
          saveEditedTask={saveEditedTask}
          editedTask={editedTask} // Pass editedTask for rendering in TaskList
          setEditedTask={setEditedTask} // Pass the setter to update editedTask
        />
        
        {/* Conditionally render Completed Tasks section */}
        {completedTasks.length > 0 && (
          <>
            <h2 className='text-xl mt-6'>Completed</h2>
            <TaskList
              tasks={completedTasks}
              removeTask={removeCompletedTask} // Use specific function for completed tasks
              startEditTask={null}
              completeTask={null}
              editingTaskIndex={null}
              saveEditedTask={null}
              isCompleted={true} // Pass isCompleted prop
            />
          </>
        )}
      </div>
    </div>
  );
}
