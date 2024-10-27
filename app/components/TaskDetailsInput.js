import * as Tooltip from '@radix-ui/react-tooltip';

const TaskDetailsInput = ({ title, description, onChange }) => {
  return (
    <div className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 bg-gray-50">
      <Tooltip.Provider>
        {/* Tooltip for Task Name */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Task name"
              className="w-full p-2 bg-transparent border-none focus:outline-none text-sm font-bold"
              required
            />
          </Tooltip.Trigger>
          <Tooltip.Content side="left" align="center" className="bg-gray-800 text-white p-2 rounded-md shadow-lg" >
            <span>Enter the task name</span>
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Root>

        {/* Tooltip for Description */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
          <textarea
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              className="w-full p-2 bg-transparent border-none focus:outline-none text-sm resize-none"
              rows="1"
            />
          </Tooltip.Trigger>
          <Tooltip.Content side="left" align="center" className="bg-gray-800 text-white p-2 rounded-md shadow-lg">
            <span>Enter a brief description</span>
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default TaskDetailsInput;
