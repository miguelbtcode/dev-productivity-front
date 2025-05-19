import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  color: string;
  onDelete?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ label, color, onDelete, className = '' }) => {
  return (
    <div 
      className={`inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5 ${className}`}
      style={{ 
        backgroundColor: `${color}20`, // 20% opacity of the color
        color: color,
        borderColor: `${color}30` // 30% opacity for border
      }}
    >
      <span 
        className="w-2 h-2 mr-1 rounded-full" 
        style={{ backgroundColor: color }}
      ></span>
      {label}
      {onDelete && (
        <button 
          onClick={onDelete}
          className="ml-1 p-0.5 rounded-full hover:bg-black/5 transition-colors"
          aria-label={`Remove ${label} tag`}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default Tag;