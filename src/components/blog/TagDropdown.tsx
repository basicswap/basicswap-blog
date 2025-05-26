'use client';

import React, { useState } from 'react';

interface TagDropdownProps {
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ allTags, selectedTag, setSelectedTag }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left h-full">
      <div className="h-full">
        <button
          type="button"
          className="h-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedTag ? selectedTag : 'All Tags'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleTagSelect(null)}
            >
              All Tags
            </a>
            {allTags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagDropdown;
