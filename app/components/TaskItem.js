// TaskItem.js
import { format } from 'date-fns';

const TaskItem = ({ task, onRemove }) => (
  <li className="bg-white p-4 rounded-lg shadow-md flex ">
    <label className="relative">
      <input
        type="checkbox"
        onChange={() => onRemove(task.index)}
        className="cursor-pointer w-5 h-5 border-2 mt-2 mr-2 border-gray-300 rounded-full appearance-none focus:ring-0 checked:bg-green-500"
      />
      <span className="absolute inset-0 flex mt-2 justify-center opacity-0 hover:opacity-100 checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </label>
    <div>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      {task.description && <p className="text-gray-500">{task.description}</p>}
      <p className="text-gray-400 text-sm mt-1">Due: {format(new Date(task.deadline), 'MM/dd/yyyy')}</p>
    </div>
  </li>
);

export default TaskItem;
