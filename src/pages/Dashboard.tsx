import React, { useState } from 'react';
import { CalendarDays, ListTodo, Kanban, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../core/types';
import Button from '../ui/atoms/Button/Button';
import TaskCard from '../ui/molecules/TaskCard/TaskCard';
import Modal from '../ui/molecules/Modal/Modal';
import TaskForm from '../features/tasks/components/TaskForm';

const Dashboard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);
  
  const todoTasks = tasks.filter(task => task.status === 'todo').slice(0, 4);
  
  const handleTaskStatusChange = (taskId: string, completed: boolean) => {
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
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">
            Overview of your tasks and activity
          </p>
        </div>
        
        <Button 
          icon={<Plus size={16} />}
          onClick={handleAddTask}
        >
          New Task
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">Total Tasks</h3>
            <ListTodo className="text-primary" size={20} />
          </div>
          <p className="text-2xl font-semibold text-text-primary mt-2">
            {tasks.length}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {tasks.filter(t => t.status === 'completed').length} completed
          </p>
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">In Progress</h3>
            <Kanban className="text-accent" size={20} />
          </div>
          <p className="text-2xl font-semibold text-text-primary mt-2">
            {tasks.filter(t => t.status === 'in-progress').length}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {Math.round((tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100)}% of all tasks
          </p>
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">Upcoming Due</h3>
            <CalendarDays className="text-error" size={20} />
          </div>
          <p className="text-2xl font-semibold text-text-primary mt-2">
            {tasks.filter(t => t.dueDate && new Date(t.dueDate) > new Date()).length}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Next 7 days
          </p>
        </div>
      </div>
      
      {/* Recent tasks section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Tasks</h2>
          <Link 
            to="/list"
            className="text-sm text-primary hover:text-primary-hover hover:underline"
          >
            View all
          </Link>
        </div>
        
        <div className="task-grid">
          {recentTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleTaskStatusChange}
              onEdit={handleTaskEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </section>
      
      {/* Todo tasks section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">To Do</h2>
          <Link 
            to="/board"
            className="text-sm text-primary hover:text-primary-hover hover:underline"
          >
            View board
          </Link>
        </div>
        
        <div className="task-grid">
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleTaskStatusChange}
              onEdit={handleTaskEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </section>
      
      {/* Task form modal */}
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

export default Dashboard;