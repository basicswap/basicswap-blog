import React, { useState } from 'react';

type Status = "Planned" | "In Progress" | "In Testing" | "Live on Dev" | "In Production";

interface TimelineItem {
  status: Status;
  title: string;
  description: string;
  long_description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
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

const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 text-xl">{item.title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
      <p className="text-sm leading-snug tracking-wide text-gray-700">{item.description}</p>
      {item.long_description && (
        <>
          <p className="text-xs text-gray-400 mt-4 italic">Click to show notes</p>
          {isOpen && <div className="mt-4 pt-4 border-t border-gray-200 text-base text-gray-600 whitespace-pre-line">{item.long_description}</div>}
        </>
      )}
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center"></h3>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
        {items.map((item, index) => (
          <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <div className="flex items-center justify-center h-full w-full font-semibold text-lg text-white">
                {index + 1}
              </div>
            </div>
            <div className="order-1 w-5/12">
              <TimelineCard item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
