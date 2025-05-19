import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../core/types';
import TaskList from '../ui/organisms/TaskList/TaskList';
import Modal from '../ui/molecules/Modal/Modal';
import TaskForm from '../features/tasks/components/TaskForm';
import Button from '../ui/atoms/Button/Button';
import { Plus } from 'lucide-react';

const ListView: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const handleStatusChange = (taskId: string, completed: boolean) => {
    updateTaskStatus(taskId, completed ? 'completed' : 'todo');
  };
  
  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Task List</h1>
        
        <Button 
          icon={<Plus size={16} />}
          onClick={handleAddTask}
        >
          New Task
        </Button>
      </div>
      
      <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={deleteTask}
      />
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default ListView;