import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info'
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full text-xs font-medium
        ${colorClasses[color]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};