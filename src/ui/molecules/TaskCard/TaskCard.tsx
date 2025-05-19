import React from 'react';
import { MoreHorizontal, Calendar, Clock } from 'lucide-react';
import { Task } from '../../../core/types';
import Tag from '../../atoms/Tag/Tag';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import IconButton from '../../atoms/Icon/IconButton';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onStatusChange, 
  onEdit, 
  onDelete 
}) => {
  const priorityColors = {
    low: 'text-blue-500',
    medium: 'text-amber-500',
    high: 'text-rose-500'
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStatusChange(task.id, e.target.checked);
  };
  
  const isCompleted = task.status === 'completed';
  
  return (
    <div className="task-card group fade-in">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1">
          <Checkbox 
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-text-primary truncate ${isCompleted ? 'line-through text-text-secondary' : ''}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm text-text-secondary mt-1 line-clamp-2 ${isCompleted ? 'line-through opacity-70' : ''}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton 
            icon={<MoreHorizontal size={16} />} 
            size="sm"
            onClick={() => onEdit(task)}
            tooltip="Task options"
          />
        </div>
      </div>
      
      {task.dueDate && (
        <div className="flex items-center mt-3 text-xs text-text-secondary">
          <Calendar size={14} className="mr-1" />
          <span>Due {format(new Date(task.dueDate), 'MMM d')}</span>
          
          <Clock size={14} className="ml-3 mr-1" />
          <span>Updated {format(new Date(task.updatedAt), 'MMM d')}</span>
        </div>
      )}
      
      <div className="mt-3 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <Tag 
            key={tag.id} 
            label={tag.name} 
            color={tag.color} 
          />
        ))}
        
        <span className={`text-xs font-medium ml-auto ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
        </span>
      </div>
    </div>
  );
};

export default TaskCard;