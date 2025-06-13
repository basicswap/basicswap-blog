import React, { useState } from 'react';

interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md my-4">
      <button
        className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-bold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Collapsible;
