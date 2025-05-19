import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { Task, TaskStatus } from '../core/types';
import TaskBoard from '../ui/organisms/TaskBoard/TaskBoard';
import Modal from '../ui/molecules/Modal/Modal';
import TaskForm from '../features/tasks/components/TaskForm';

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatus(taskId, newStatus);
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
        <h1 className="text-2xl font-semibold text-text-primary">Task Board</h1>
      </div>
      
      <TaskBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={deleteTask}
        onAddTask={handleAddTask}
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

export default KanbanBoard;