import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'ghost',
  tooltip,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
    secondary: 'bg-secondary text-text-primary hover:bg-secondary/80 focus-visible:ring-secondary',
    outline: 'border border-border bg-transparent hover:bg-secondary/50 focus-visible:ring-secondary',
    ghost: 'text-text-secondary hover:bg-secondary/50 hover:text-text-primary focus-visible:ring-secondary',
  };
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} relative group`}
      aria-label={tooltip}
      {...props}
    >
      {icon}
      {tooltip && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text-primary text-background text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {tooltip}
        </span>
      )}
    </button>
  );
};

export default IconButton;