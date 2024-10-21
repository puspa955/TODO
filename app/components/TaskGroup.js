// TaskGroup.js
import TaskItem from './TaskItem';

const TaskGroup = ({ title, tasks, onRemove }) => (
  tasks.length > 0 && (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.index} task={task} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  )
);

export default TaskGroup;
