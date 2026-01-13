import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    image?: string; // Optional image
    tags?: string[];
    content: string;
}

export function getSortedPostsData(): Omit<BlogPost, 'content'>[] {
    // Create directory if it doesn't exist to prevent errors
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Validate and format data
        return {
            slug,
            title: matterResult.data.title || 'Adsız Yazı',
            date: matterResult.data.date || new Date().toISOString(),
            excerpt: matterResult.data.excerpt || '',
            image: matterResult.data.image || null, // Handle missing image gracefully
            tags: matterResult.data.tags || [],
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt || '',
        image: matterResult.data.image || null,
        tags: matterResult.data.tags || [],
        content: matterResult.content,
    };
}
