import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import TaskCard from '../../molecules/TaskCard/TaskCard';
import Button from '../../atoms/Button/Button';
import { Task, TaskStatus } from '../../../core/types';

interface TaskBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onAddTask: () => void;
}

interface Column {
  id: TaskStatus;
  title: string;
}

const columns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
];

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onStatusChange,
  onTaskEdit,
  onTaskDelete,
  onAddTask
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Drop outside of list
    if (!destination) return;
    
    // No movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Update task status
    const newStatus = destination.droppableId as TaskStatus;
    onStatusChange(draggableId, newStatus);
  };
  
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };
  
  const handleCheckboxChange = (taskId: string, completed: boolean) => {
    onStatusChange(taskId, completed ? 'completed' : 'todo');
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map(column => (
          <div key={column.id} className="kanban-column">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-text-primary">{column.title}</h3>
              <span className="text-sm text-text-secondary bg-secondary/50 px-2 py-0.5 rounded-full">
                {getTasksByStatus(column.id).length}
              </span>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 min-h-[40px]"
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onStatusChange={handleCheckboxChange}
                            onEdit={onTaskEdit}
                            onDelete={onTaskDelete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            {column.id === 'todo' && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Plus size={16} />}
                className="w-full mt-3"
                onClick={onAddTask}
              >
                Add task
              </Button>
            )}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;