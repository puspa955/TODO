"use client"
import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className='text-3xl text-center mb-6'>My TODO List</h1>
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} removeTask={removeTask} />
      </div>
    </div>
  );
}
