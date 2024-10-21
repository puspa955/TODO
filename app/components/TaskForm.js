const TaskForm = ({ task, onChange }) => {
    return (
      <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={onChange}
          placeholder="Task name"
          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm font-bold"
          required
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={onChange}
          placeholder="Description"
          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
        />
      </div>
    );
  };
  
  export default TaskForm;
  