import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Kanban, 
  ListTodo, 
  Settings, 
  Plus, 
  Search,
  Menu,
  X
} from 'lucide-react';
import IconButton from '../../atoms/Icon/IconButton';
import { useTheme } from '../../../core/hooks/useTheme';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import useTaskStore from '../../../store/useTaskStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { workspaces, projects, currentWorkspace, setCurrentWorkspace } = useTaskStore();
  
  const currentWorkspaceProjects = projects.filter(
    project => project.workspaceId === currentWorkspace
  );
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', icon: <LayoutGrid size={18} />, label: 'Dashboard' },
    { path: '/board', icon: <Kanban size={18} />, label: 'Board View' },
    { path: '/list', icon: <ListTodo size={18} />, label: 'List View' },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-text-primary">TaskFlow</h1>
            
            <IconButton
              icon={<X size={18} />}
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close sidebar"
            />
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search tasks..."
              fullWidth
              icon={<Search size={16} />}
            />
          </div>
          
          {/* Navigation */}
          <nav className="mb-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 rounded-md text-sm font-medium
                      ${isActive(item.path) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-text-secondary hover:bg-secondary/50 hover:text-text-primary'
                      }
                      transition-colors duration-200
                    `}
                    onClick={() => onClose()}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Workspaces section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Workspaces
              </h2>
              <IconButton
                icon={<Plus size={16} />}
                size="sm"
                tooltip="Add workspace"
              />
            </div>
            
            <ul className="space-y-1">
              {workspaces.map(workspace => (
                <li key={workspace.id}>
                  <button
                    onClick={() => setCurrentWorkspace(workspace.id)}
                    className={`
                      flex items-center w-full px-3 py-2 rounded-md text-sm font-medium
                      ${currentWorkspace === workspace.id 
                        ? 'bg-secondary/30 text-text-primary' 
                        : 'text-text-secondary hover:bg-secondary/50 hover:text-text-primary'
                      }
                      transition-colors duration-200
                    `}
                  >
                    <span 
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: workspace.color }}
                    />
                    {workspace.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Projects section */}
          {currentWorkspaceProjects.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Projects
                </h2>
                <IconButton
                  icon={<Plus size={16} />}
                  size="sm"
                  tooltip="Add project"
                />
              </div>
              
              <ul className="space-y-1">
                {currentWorkspaceProjects.map(project => (
                  <li key={project.id}>
                    <Link
                      to={`/project/${project.id}`}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-secondary/50 hover:text-text-primary"
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-3"
                        style={{ backgroundColor: project.color }}
                      />
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Create task button */}
          <Button
            fullWidth
            icon={<Plus size={16} />}
            className="mb-6"
          >
            New Task
          </Button>
          
          {/* Footer */}
          <div className="mt-auto border-t border-border pt-4">
            <button
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-secondary/50 hover:text-text-primary w-full text-left"
              onClick={toggleTheme}
            >
              <Settings size={18} className="mr-3" />
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;