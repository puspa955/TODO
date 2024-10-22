"use client";
import { useState, useCallback, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const updateTasks = useCallback((action, payload) => {
    setTasks((prevTasks) => {
      switch (action) {
        case 'add':
          return [...prevTasks, { ...payload, isCompleted: false }];
        case 'edit':
          return prevTasks.map((task, index) =>
            index === payload.index ? payload.details : task
          );
        case 'remove':
          return prevTasks.filter((_, index) => index !== payload);
        case 'complete':
          return prevTasks.map((task, index) =>
            index === payload ? { ...task, isCompleted: true } : task
          );
        default:
          return prevTasks;
      }
    });
  }, []);

  const taskLists = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        task.isCompleted ? acc.completedTasks.push(task) : acc.activeTasks.push(task);
        return acc;
      },
      { activeTasks: [], completedTasks: [] }
    );
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className='text-3xl text-center mb-6'>My TODO List</h1>
        <TaskInput addTask={(newTask) => updateTasks('add', newTask)} />

        <h2 className='text-xl mt-6'>Todo</h2>
        <TaskList
          tasks={taskLists.activeTasks}
          removeTask={(index) => updateTasks('remove', index)}
          updateTask={updateTasks}
          completeTask={(index) => updateTasks('complete', index)}
          isCompleted={false}
        />

        {taskLists.completedTasks.length > 0 && (
          <>
            <h2 className='text-xl mt-6'>Completed</h2>
            <TaskList
              tasks={taskLists.completedTasks}
              removeTask={(index) => updateTasks('remove', index)}
              isCompleted={true}
            />
          </>
        )}
      </div>
    </div>
  );
}
