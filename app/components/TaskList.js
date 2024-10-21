import { isToday, isTomorrow } from 'date-fns';
import TaskGroup from './TaskGroup';

const TaskList = ({ tasks, removeTask }) => {
  const groupedTasks = {
    today: [],
    tomorrow: [],
    upcoming: [],
  };

  tasks.forEach((task, index) => {
    const taskDate = new Date(task.deadline);
    if (isToday(taskDate)) {
      groupedTasks.today.push({ ...task, index });
    } else if (isTomorrow(taskDate)) {
      groupedTasks.tomorrow.push({ ...task, index });
    } else {
      groupedTasks.upcoming.push({ ...task, index });
    }
  });

  const taskGroups = [
    { title: 'Today', tasks: groupedTasks.today },
    { title: 'Tomorrow', tasks: groupedTasks.tomorrow },
    { title: 'Upcoming', tasks: groupedTasks.upcoming },
  ];

  return (
    <div className="mt-6 space-y-8">
      {taskGroups.map(({ title, tasks }) => (
        <TaskGroup key={title} title={title} tasks={tasks} onRemove={removeTask} />
      ))}
      {groupedTasks.today.length === 0 && groupedTasks.tomorrow.length === 0 && groupedTasks.upcoming.length === 0 && (
        <p className="text-gray-500">No tasks available...</p>
      )}
    </div>
  );
};

export default TaskList;
