import { format, isToday, isTomorrow } from 'date-fns';

const TaskList = ({ tasks, removeTask }) => {
  // Group tasks by date
  const groupTasksByDate = () => {
    const todayTasks = [];
    const tomorrowTasks = [];
    const upcomingTasks = [];

    tasks
      .filter(task => task.deadline) // Only include tasks with a valid date
      .forEach((task, index) => {
        const taskDate = new Date(task.deadline);
        if (isToday(taskDate)) {
          todayTasks.push({ ...task, index });
        } else if (isTomorrow(taskDate)) {
          tomorrowTasks.push({ ...task, index });
        } else {
          upcomingTasks.push({ ...task, index });
        }
      });

    return { todayTasks, tomorrowTasks, upcomingTasks };
  };

  const { todayTasks, tomorrowTasks, upcomingTasks } = groupTasksByDate();

  // Render task list for each group
  const renderTasks = (taskGroup) =>
    taskGroup.map((task) => (
      <li key={task.index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <div className="flex space-x-3">
          <label className="relative">
            <input
              type="checkbox"
              onChange={() => removeTask(task.index)}
              className="cursor-pointer w-5 h-5 border-2 mt-1 border-gray-300 rounded-full appearance-none focus:ring-0   checked:bg-green-500"
            />
            <span className="absolute inset-0 flex mt-2 justify-center opacity-0 hover:opacity-100 checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
          <div>
            <h3 className="font-semibold text-lg">{task.title}</h3>
            {task.description && <p className="text-gray-500">{task.description}</p>}
            {task.deadline && (
              <p className="text-gray-400 text-sm mt-1">Due: {format(new Date(task.deadline), 'MM/dd/yyyy')}</p>
            )}
          </div>
        </div>
      </li>
    ));

  return (
    <div className="mt-6 space-y-8">
      {todayTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Today</h2>
          <ul className="space-y-2">{renderTasks(todayTasks)}</ul>
        </div>
      )}

      {tomorrowTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Tomorrow</h2>
          <ul className="space-y-2">{renderTasks(tomorrowTasks)}</ul>
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming</h2>
          <ul className="space-y-2">{renderTasks(upcomingTasks)}</ul>
        </div>
      )}

      {todayTasks.length === 0 && tomorrowTasks.length === 0 && upcomingTasks.length === 0 && (
        <p className="text-gray-500">No tasks available...</p>
      )}
    </div>
  );
};

export default TaskList;
