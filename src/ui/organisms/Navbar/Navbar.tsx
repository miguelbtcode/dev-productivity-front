import React from 'react';
import { Menu, Plus, Bell, User } from 'lucide-react';
import IconButton from '../../atoms/Icon/IconButton';
import Dropdown, { DropdownItem, DropdownSeparator } from '../../molecules/Dropdown/Dropdown';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <IconButton
          icon={<Menu size={20} />}
          onClick={onMenuClick}
          className="mr-4 lg:hidden"
          aria-label="Open menu"
        />
        
        {/* Page title */}
        <h1 className="text-lg font-semibold text-text-primary">Dashboard</h1>
        
        {/* Right side items */}
        <div className="ml-auto flex items-center space-x-2">
          <IconButton
            icon={<Plus size={18} />}
            variant="primary"
            tooltip="New task"
          />
          
          <IconButton
            icon={<Bell size={18} />}
            tooltip="Notifications"
          />
          
          <Dropdown
            trigger={
              <div className="flex items-center space-x-2 ml-2 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  U
                </div>
              </div>
            }
            align="right"
          >
            <div className="p-2">
              <p className="text-sm font-medium text-text-primary">User Name</p>
              <p className="text-xs text-text-secondary">user@example.com</p>
            </div>
            
            <DropdownSeparator />
            
            <DropdownItem
              icon={<User size={16} />}
            >
              Profile
            </DropdownItem>
            
            <DropdownItem>
              Settings
            </DropdownItem>
            
            <DropdownSeparator />
            
            <DropdownItem danger>
              Sign out
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Navbar;