import React from 'react';

interface UrlPreviewCardProps {
  url: string;
}

const UrlPreviewCard: React.FC<UrlPreviewCardProps> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block border border-gray-200 rounded-lg p-4 my-4 hover:shadow-md transition-shadow duration-200">
      <div className="font-semibold text-blue-600 break-words">{url}</div>
      <div className="text-sm text-gray-600">Click to visit</div>
    </a>
  );
};

export default UrlPreviewCard;
