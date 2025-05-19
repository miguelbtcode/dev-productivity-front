import { create } from 'zustand';
import { TaskStatus, Task, Tag, Project, Workspace, Notification, User } from '../core/types';
import { format } from 'date-fns';

interface TaskState {
  tasks: Task[];
  tags: Tag[];
  projects: Project[];
  workspaces: Workspace[];
  notifications: Notification[];
  currentWorkspace: string;
  user: User;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  addTag: (name: string, color: string) => void;
  deleteTag: (id: string) => void;
  addProject: (name: string, color: string, workspaceId: string) => void;
  deleteProject: (id: string) => void;
  setCurrentWorkspace: (id: string) => void;
  updateUser: (updates: Partial<User>) => void;
  markNotificationAsRead: (id: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByWorkspace: (workspaceId: string) => Task[];
}

const initialWorkspaces: Workspace[] = [
  { id: '1', name: 'Personal', color: '#3B82F6' },
  { id: '2', name: 'Work', color: '#10B981' },
];

const initialProjects: Project[] = [
  { id: '1', name: 'Website Redesign', color: '#8B5CF6', workspaceId: '2' },
  { id: '2', name: 'Mobile App', color: '#EC4899', workspaceId: '2' },
  { id: '3', name: 'Home Renovation', color: '#F59E0B', workspaceId: '1' },
];

const initialTags: Tag[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#10B981' },
  { id: '3', name: 'Urgent', color: '#EF4444' },
  { id: '4', name: 'Meeting', color: '#8B5CF6' },
];

const initialUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'light',
    defaultWorkspace: '1'
  }
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Task Due Soon',
    message: 'The task "Website Redesign" is due tomorrow',
    type: 'warning',
    read: false,
    createdAt: format(new Date(), 'yyyy-MM-dd')
  }
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Create project structure',
    description: 'Set up folders and files for the new project',
    status: 'completed',
    priority: 'high',
    projectId: '1',
    tags: [initialTags[0]],
    createdAt: format(new Date('2023-05-01'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-02'), 'yyyy-MM-dd')
  },
  {
    id: '2',
    title: 'Design dashboard layout',
    description: 'Create wireframes for the main dashboard',
    status: 'in-progress',
    priority: 'medium',
    projectId: '1',
    tags: [initialTags[0], initialTags[3]],
    createdAt: format(new Date('2023-05-03'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-03'), 'yyyy-MM-dd'),
    dueDate: format(new Date('2023-05-10'), 'yyyy-MM-dd')
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Set up user login and registration',
    status: 'todo',
    priority: 'high',
    tags: [initialTags[0], initialTags[2]],
    createdAt: format(new Date('2023-05-04'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-04'), 'yyyy-MM-dd'),
    dueDate: format(new Date('2023-05-15'), 'yyyy-MM-dd')
  },
  {
    id: '4',
    title: 'Go grocery shopping',
    description: 'Buy fruits, vegetables, and milk',
    status: 'todo',
    priority: 'low',
    tags: [initialTags[1]],
    createdAt: format(new Date('2023-05-05'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-05'), 'yyyy-MM-dd'),
    dueDate: format(new Date('2023-05-06'), 'yyyy-MM-dd')
  },
  {
    id: '5',
    title: 'Prepare for project meeting',
    description: 'Create slides and demo for the stakeholder meeting',
    status: 'in-progress',
    priority: 'high',
    tags: [initialTags[0], initialTags[3]],
    createdAt: format(new Date('2023-05-06'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-06'), 'yyyy-MM-dd'),
    dueDate: format(new Date('2023-05-08'), 'yyyy-MM-dd')
  },
];

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: initialTasks,
  tags: initialTags,
  projects: initialProjects,
  workspaces: initialWorkspaces,
  notifications: initialNotifications,
  currentWorkspace: initialUser.preferences.defaultWorkspace,
  user: initialUser,
  
  addTask: (taskData) => set((state) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      updatedAt: format(new Date(), 'yyyy-MM-dd'),
    };
    
    return { tasks: [...state.tasks, newTask] };
  }),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: format(new Date(), 'yyyy-MM-dd') }
        : task
    ),
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, status, updatedAt: format(new Date(), 'yyyy-MM-dd') }
        : task
    ),
  })),
  
  addTag: (name, color) => set((state) => ({
    tags: [...state.tags, { id: crypto.randomUUID(), name, color }],
  })),
  
  deleteTag: (id) => set((state) => ({
    tags: state.tags.filter((tag) => tag.id !== id),
  })),
  
  addProject: (name, color, workspaceId) => set((state) => ({
    projects: [...state.projects, { 
      id: crypto.randomUUID(), 
      name, 
      color,
      workspaceId 
    }],
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((project) => project.id !== id),
  })),
  
  setCurrentWorkspace: (id) => set(() => ({
    currentWorkspace: id,
  })),
  
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates },
  })),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    ),
  })),
  
  getTasksByStatus: (status) => {
    const state = get();
    return state.tasks.filter((task) => 
      task.status === status && 
      (task.projectId ? state.projects.find(p => p.id === task.projectId)?.workspaceId === state.currentWorkspace : true)
    );
  },
  
  getTasksByWorkspace: (workspaceId) => {
    const state = get();
    return state.tasks.filter((task) => 
      task.projectId ? 
        state.projects.find(p => p.id === task.projectId)?.workspaceId === workspaceId :
        true
    );
  },
}));

export default useTaskStore;