import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'pro-tip' | 'resource';
  title?: string;
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';
  let borderColor = 'border-blue-400';
  let icon: React.ReactNode = null;

  switch (type) {
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      borderColor = 'border-yellow-400';
      icon = <span className={`${textColor} mr-2`}>⚠️</span>;
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      borderColor = 'border-red-400';
      icon = <span className={`${textColor} mr-2`}>❌</span>;
      break;
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      borderColor = 'border-green-400';
      icon = <span className={`${textColor} mr-2`}>✅</span>;
      break;
    case 'pro-tip':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      borderColor = 'border-purple-400';
      icon = <span className={`${textColor} mr-2`}>💡</span>;
      break;
    case 'resource':
      bgColor = 'bg-teal-100';
      textColor = 'text-teal-800';
      borderColor = 'border-teal-400';
      icon = <span className={`${textColor} mr-2`}>🔗</span>;
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      borderColor = 'border-blue-400';
      icon = <span className={`${textColor} mr-2`}>ℹ️</span>;
      break;
  }

  return (
    <div className={`${bgColor} ${textColor} border-l-4 ${borderColor} p-4 my-4 rounded-md`}>
      <div className="flex items-center font-bold mb-2">
        {icon}
        {title && <span>{title}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
