import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 rounded border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
            {...props}
          />
          <span className="absolute left-0 top-0 flex h-4 w-4 items-center justify-center pointer-events-none text-white">
            {props.checked && <Check className="h-3 w-3" />}
          </span>
        </div>
        {label && (
          <label
            htmlFor={props.id}
            className="ml-2 text-sm font-medium text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;