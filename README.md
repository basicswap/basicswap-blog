# BasicSwap Blog Codebase

This repository contains the codebase for the BasicSwap Blog, built with Next.js. It's designed to be a modern, fast, and feature-rich blog platform with support for MDX content, custom components, and various blog functionalities.

## Features

*   **Next.js Framework**: Leverages the power of Next.js for server-side rendering, static site generation, and optimized performance.
*   **MDX Support**: Write blog posts using MDX, combining Markdown with JSX components for rich and interactive content.
*   **Custom MDX Components**: Includes a variety of custom MDX components to enhance blog posts, such as:
    *   `Callout`
    *   `ChartWrapper`
    *   `Checklist`
    *   `Collapsible`
    *   `Counter`
    *   `CustomCodeBlock`
    *   `CustomDiv`
    *   `StyledTableWrapper`
    *   `Timeline`
*   **Blog Functionality**:
    *   **Post Listing**: Displays a list of blog posts with pagination.
    *   **Individual Post Pages**: Dedicated pages for each blog post with dynamic routing.
    *   **Tagging System**: Organize posts by tags, with dedicated tag pages and a tag dropdown for navigation.
    *   **Search Bar**: Allows users to search for blog posts.
    *   **Author Bios**: Displays author information for each post.
    *   **Social Share Buttons**: Easily share blog posts on social media.
    *   **Table of Contents**: Automatically generated table of contents for long posts.
    *   **Related Posts**: Suggests related articles to readers.
*   **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive user experience.
*   **Optimized for SEO**: Next.js features and proper metadata handling ensure good search engine visibility.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/basicswap-blog.git
    cd basicswap-blog
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This command optimizes the application for production and outputs the build files to the `.next` directory.

### Running in Production Mode

To run the built application in production mode:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
.
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── [slug]/         # Dynamic route for individual blog posts
│   │   ├── blog/           # Blog listing page
│   │   ├── tags/           # Tag listing and dynamic tag pages
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── blog/           # Blog-specific components (cards, headers, footers, etc.)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   └── mdx/            # Custom MDX components
│   ├── content/
│   │   └── posts/          # MDX blog post files
│   └── lib/                # Utility functions and configurations (blog logic, authors, config)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Learn More

To learn more about BasicSwap DEX, refer to the following links: 

*   [Official Website](https://basicswapdex.com)
*   [Blog Website](https://blog.basicswapdex.com)
*   [YouTube Channel](https://www.youtube.com/@basicswap)
*   [Docs Page](https://docs.basicswapdex.com)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

MIT License
