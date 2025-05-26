import Link from 'next/link';
import Image from 'next/image';
import { PostMetadata } from '@/lib/blog';
import TagPill from './TagPill';

interface BlogCardProps {
  post: PostMetadata;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/${post.slug}`} className="block bg-white rounded-lg shadow-md overflow-hidden h-full">
      <Image
        src={`${process.env.NODE_ENV === 'production' ? '/basicswap-blog' : ''}${post.thumbnail}`}
        alt={post.title}
        width={1000}
        height={560}
        className="w-full object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-titleColor hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          By {post.author} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date))}
        </p>
        <p className="text-gray-700 mb-4">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
