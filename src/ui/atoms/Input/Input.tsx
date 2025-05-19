import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = `
      h-10 px-3 py-2 
      rounded-md border 
      ${error ? 'border-error' : 'border-border'} 
      bg-background text-text-primary 
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-colors duration-200
      ${icon ? 'pl-10' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}
          
          <input ref={ref} className={inputClasses} {...props} />
        </div>
        
        {error && (
          <p className="text-xs text-error mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;