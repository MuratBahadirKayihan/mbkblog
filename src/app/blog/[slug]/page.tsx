import { getAllPostIds, getPostData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from '@/components/CopyButton';

// GitHub Pages (Static Export) requires generateStaticParams for dynamic routes
export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 md:px-8">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Bloga Dön
                    </Link>

                    <article>
                        <header className="mb-8 border-b border-slate-800 pb-8">
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                                    <Calendar className="w-3 h-3" />
                                    {postData.date}
                                </span>
                                {postData.tags && postData.tags.map((tag: string) => (
                                    <span key={tag} className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {postData.title}
                            </h1>

                            {/* Conditional Image Rendering - Safe for missing images */}
                            {postData.image && (
                                <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden mb-8 border border-slate-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={postData.image}
                                        alt={postData.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </header>

                        {/* Markdown Content Area */}
                        <div className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-slate-100 prose-headings:font-bold
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-li:text-slate-300
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-900/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            ">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const codeContent = String(children).replace(/\n$/, '');
                                        return !inline && match ? (
                                            <div className="relative group/code">
                                                <div className="absolute right-2 top-2 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                                    <CopyButton text={codeContent} />
                                                </div>
                                                <SyntaxHighlighter
                                                    {...props}
                                                    style={oneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-lg !bg-slate-900 !p-4 border border-slate-800 my-4 text-sm md:text-base shadow-lg"
                                                    showLineNumbers={true}
                                                >
                                                    {codeContent}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code {...props} className={className}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {postData.content}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </SectionWrapper>
        </main>
    );
}
