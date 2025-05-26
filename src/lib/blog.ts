import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Define interfaces for type safety
export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  thumbnail: string;
  bannerImage?: string;
}

export interface PostData extends PostMetadata {
  content: string;
}

// Define the directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getAllPostsData(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = encodeURIComponent(fileName.replace(/\.mdx$/, ''));
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Basic validation for required frontmatter fields
      if (!data.title || !data.date || !data.author || !data.description || !data.thumbnail) {
          console.warn(`Skipping post ${fileName} due to missing required frontmatter fields.`);
          return null;
      }
      
      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description,
        thumbnail: data.thumbnail,
        bannerImage: data.bannerImage,
      } as PostMetadata;
    })
    .filter(post => post !== null) as PostMetadata[];

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostData | null {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Basic validation for required frontmatter fields
    if (!data.title || !data.date || !data.author || !data.description || !data.thumbnail) {
        console.warn(`Post ${slug}.mdx is missing required frontmatter fields.`);
        return null;
    }
    
    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      author: data.author,
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description,
      thumbnail: data.thumbnail,
      bannerImage: data.bannerImage,
    } as PostData;
  } catch (error) {
    console.error(`Error reading post ${slug}.mdx:`, error);
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPostsData();
  const tags = posts.flatMap(post => post.tags);
  
  // Include static tags from config
  const blogConfig = require('./blogConfig.json');
  const staticTags = blogConfig.staticTags || [];
  const allTags = [...new Set([...tags, ...staticTags])];

  return allTags.sort();
}
