import React from 'react';
import { Task } from '../../../core/types';
import TaskCard from '../../molecules/TaskCard/TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, completed: boolean) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onTaskEdit,
  onTaskDelete
}) => {
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
  const handleCheckboxChange = (taskId: string, completed: boolean) => {
    onStatusChange(taskId, completed);
  };
  
  return (
    <div className="space-y-6">
      {/* Todo tasks */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          To Do
          <span className="ml-2 text-sm bg-secondary/50 text-text-secondary px-2 py-0.5 rounded-full">
            {todoTasks.length}
          </span>
        </h2>
        
        <div className="task-grid">
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleCheckboxChange}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </section>
      
      {/* In Progress tasks */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          In Progress
          <span className="ml-2 text-sm bg-secondary/50 text-text-secondary px-2 py-0.5 rounded-full">
            {inProgressTasks.length}
          </span>
        </h2>
        
        <div className="task-grid">
          {inProgressTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleCheckboxChange}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </section>
      
      {/* Completed tasks */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          Completed
          <span className="ml-2 text-sm bg-secondary/50 text-text-secondary px-2 py-0.5 rounded-full">
            {completedTasks.length}
          </span>
        </h2>
        
        <div className="task-grid">
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleCheckboxChange}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskList;