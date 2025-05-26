'use client';

import React, { useState } from 'react';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [showNested, setShowNested] = useState(false);

  const renderHeadings = (hds: Heading[]) => {
    return (
      <ul>
        {hds.map((heading) => (
          <li key={heading.slug} className={`mb-1 ${heading.level === 1 ? 'font-bold' : 'ml-4'}`}>
            <a href={`#${heading.slug}`} className="text-blue-600 hover:underline">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const visibleHeadings = headings.filter(h => h.level === 1 || (showNested && h.level === 2));

  return (
    <div className="bg-gray-50 p-4 rounded-md my-6 border border-gray-200">
      <h2 id="toc-heading" className="text-xl font-bold mb-3">Table of Contents</h2>
      {visibleHeadings.length > 0 ? (
        <>
          {renderHeadings(visibleHeadings)}
          {headings.some(h => h.level === 2) && (
            <button
              onClick={() => setShowNested(!showNested)}
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              {showNested ? 'Hide Nested Sections (H2)' : 'Show Nested Sections (H2)'}
            </button>
          )}
        </>
      ) : (
        <p>No headings found.</p>
      )}
    </div>
  );
};

export default TableOfContents;
