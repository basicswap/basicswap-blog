import React from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
}

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  return (
    <div className="my-4 p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Development Tasks</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center mb-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <input
              type="checkbox"
              checked={item.completed}
              readOnly
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className={`ml-3 text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
