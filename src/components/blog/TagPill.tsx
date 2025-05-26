'use client';

import { useRouter } from 'next/navigation';

interface TagPillProps {
  tag: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/tags/${tag}`);
  };

  return (
    <span
      className="bg-blue-500 text-white text-sm font-medium px-2.5 py-0.5 rounded cursor-pointer"
      onClick={handleClick}
    >
      {tag}
    </span>
  );
};

export default TagPill;
