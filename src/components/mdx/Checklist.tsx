import React from 'react';

type Status = "Planned" | "In Progress" | "In Testing" | "Live on Dev" | "In Production";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  status: Status;
}

interface ChecklistProps {
  items: ChecklistItem[];
}

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Planned":
      return "bg-gray-400";
    case "In Progress":
    case "In Testing":
      return "bg-yellow-400";
    case "Live on Dev":
    case "In Production":
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
};

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  return (
    <div className="my-4 p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Development Tasks</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between mb-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`ml-3 text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {item.text}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
