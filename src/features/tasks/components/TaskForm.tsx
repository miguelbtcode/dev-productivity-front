import React, { useState } from 'react';
import { format } from 'date-fns';
import Input from '../../../ui/atoms/Input/Input';
import Button from '../../../ui/atoms/Button/Button';
import { Task, TaskPriority, TaskStatus } from '../../../core/types';
import useTaskStore from '../../../store/useTaskStore';
import Tag from '../../../ui/atoms/Tag/Tag';

interface TaskFormProps {
  task: Task | null;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const { tags, projects, currentWorkspace, addTask, updateTask } = useTaskStore();
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [selectedTags, setSelectedTags] = useState(task?.tags || []);
  const [projectId, setProjectId] = useState(task?.projectId || '');
  
  const [errors, setErrors] = useState({
    title: ''
  });
  
  const workspaceProjects = projects.filter(project => project.workspaceId === currentWorkspace);
  
  const validateForm = () => {
    const newErrors = {
      title: ''
    };
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (task) {
      // Update existing task
      updateTask(task.id, {
        title,
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
        tags: selectedTags,
        projectId
      });
    } else {
      // Add new task
      addTask({
        title,
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
        tags: selectedTags,
        projectId
      });
    }
    
    onClose();
  };
  
  const toggleTag = (tag: typeof tags[0]) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          fullWidth
          error={errors.title}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full min-h-[100px] rounded-md border border-border bg-background text-text-primary 
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Project
          </label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background text-text-primary 
              px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">No Project</option>
            {workspaceProjects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full h-10 rounded-md border border-border bg-background text-text-primary 
              px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="w-full h-10 rounded-md border border-border bg-background text-text-primary 
            px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Due Date
        </label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <div 
              key={tag.id}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer ${
                selectedTags.some(t => t.id === tag.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <Tag 
                label={tag.name} 
                color={tag.color} 
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;