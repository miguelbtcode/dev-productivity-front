export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  color: string;
  workspaceId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: Tag[];
  projectId?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
};

export type Workspace = {
  id: string;
  name: string;
  color: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    defaultWorkspace: string;
  };
};