import React from 'react';

interface StyledTableWrapperProps {
  children: React.ReactNode;
}

const StyledTableWrapper: React.FC<StyledTableWrapperProps> = ({ children }) => {
  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (typeof child === 'string') {
      return child.trim() !== '';
    }
    return true;
  });

  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        {filteredChildren}
      </table>
    </div>
  );
};

export default StyledTableWrapper;
