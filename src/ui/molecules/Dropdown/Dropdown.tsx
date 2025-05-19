import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../../core/hooks/useClickOutside';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  trigger, 
  children, 
  align = 'left',
  width = 200 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0'
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          className={`absolute z-10 mt-1 bg-card border border-border rounded-md shadow-md ${alignmentClasses[align]} slide-in-right`}
          style={{ width: `${width}px` }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ 
  children, 
  onClick, 
  icon,
  danger = false 
}) => {
  return (
    <button
      className={`w-full text-left px-3 py-2 text-sm flex items-center hover:bg-secondary/50 ${
        danger ? 'text-error hover:text-error' : 'text-text-primary'
      }`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const DropdownSeparator = () => {
  return <div className="border-t border-border my-1" />;
};

export default Dropdown;