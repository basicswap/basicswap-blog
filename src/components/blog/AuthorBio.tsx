import React from 'react';
import { authors, Author } from '@/lib/authors';

interface AuthorBioProps {
  author: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  const currentAuthor: Author = authors[author] || {
    name: author,
    bio: "A contributor to the BasicSwap blog.",
    avatar: `${process.env.NODE_ENV === 'production' ? '/basicswap-blog' : ''}/images/basicswap-logo.svg`,
  };

  return (
    <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-100 rounded-lg">
      <img
        src={`${process.env.NODE_ENV === 'production' ? '/basicswap-blog' : ''}${currentAuthor.avatar}`}
        alt={currentAuthor.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-900">{currentAuthor.name}</h3>
        <p className="text-gray-700">{currentAuthor.bio}</p>
      </div>
    </div>
  );
};

export default AuthorBio;
