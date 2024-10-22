const TaskDetailsInput = ({ title, description, onChange }) => {
    return (
      <div className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 bg-gray-50">
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Task name"
          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm font-bold"
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
        />
      </div>
    );
  };
  
  export default TaskDetailsInput;
  