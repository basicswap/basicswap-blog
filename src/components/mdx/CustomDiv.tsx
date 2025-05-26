import React from 'react';

interface CustomDivProps {
  className?: string;
  children: React.ReactNode;
}

const CustomDiv: React.FC<CustomDivProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CustomDiv;
