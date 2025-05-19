import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/atoms/Button/Button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-xl text-text-primary mb-2">Page not found</p>
      <p className="text-text-secondary mb-6">The page you are looking for doesn't exist or has been moved.</p>
      
      <Link to="/">
        <Button 
          variant="primary" 
          icon={<Home size={16} />}
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;