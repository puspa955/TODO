import React, { useState, useEffect } from 'react';
import TaskDetailsInput from './TaskDetailsInput';
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector';
import * as Dialog from '@radix-ui/react-dialog'; // Radix UI Dialog

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
    const name = e.target ? e.target.name : 'category';
    const value = e.target ? e.target.value : e;
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
      editingTask ? updateTask(state.task) : addTask(state.task);
      setState({ task: { title: '', description: '', deadline: todayDate, category: '' }, showForm: false });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <Dialog.Root open={state.showForm} onOpenChange={(open) => setState((prev) => ({ ...prev, showForm: open }))}>
        <Dialog.Trigger asChild>
          <button className="text-red-500 flex items-center text-sm group">
            <span className="text-xl mr-2 pb-1 group-hover:bg-red-500 group-hover:text-white h-4 w-4 flex items-center justify-center rounded-full transition-colors">
              +
            </span>
            Add task
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <Dialog.Content className="bg-white p-6 w-full max-w-lg rounded-md shadow-lg">
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
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
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
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TaskInput;
