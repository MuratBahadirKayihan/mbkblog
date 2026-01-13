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
                <div className="max-w-[680px] mx-auto">
                    <Link href="/blog" className="inline-flex items-center text-zinc-500 hover:text-white mb-12 transition-colors group font-mono text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        ../
                    </Link>

                    <article>

                        <header className="mb-12 border-b border-white/10 pb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight tracking-tight">
                                {postData.title}
                            </h1>

                            <div className="border border-white/10 bg-[#0A0A0A] p-5 rounded-sm font-mono text-xs md:text-sm text-zinc-400 mb-8">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                                    <span className="text-zinc-600 uppercase tracking-wider">Syslog Metadata</span>
                                    <span className="text-zinc-600">{postData.date}</span>
                                </div>
                                <div className="grid grid-cols-[80px_1fr] gap-y-2">
                                    <span className="text-zinc-600">Context:</span>
                                    <span className="text-cyan-400">{postData.tags?.[0] || "Architecture"}</span>

                                    <span className="text-zinc-600">Env:</span>
                                    <span className="text-emerald-500">Production</span>

                                    <span className="text-zinc-600">Note:</span>
                                    <span className="text-zinc-300">Field notes from active development.</span>
                                </div>
                            </div>

                            {/* Conditional Image Rendering - Safe for missing images */}
                            {postData.image && (
                                <div className="w-full aspect-video relative rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
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
                            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2
                            prose-h3:text-lg prose-h3:text-zinc-200
                            prose-p:text-zinc-400 prose-p:leading-8 prose-p:mb-6
                            prose-a:text-cyan-400 prose-a:border-b prose-a:border-cyan-400/30 prose-a:no-underline hover:prose-a:border-cyan-400 text-base
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:list-disc prose-ul:pl-4 prose-ul:space-y-2
                            prose-li:text-zinc-400
                            prose-blockquote:border-l-2 prose-blockquote:border-cyan-500 prose-blockquote:bg-[#0A0A0A] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:text-zinc-300 prose-blockquote:not-italic
                            prose-hr:border-white/5 prose-hr:my-12
                            prose-code:text-cyan-300 prose-code:bg-[#0A0A0A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                        ">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const codeContent = String(children).replace(/\n$/, '');
                                        return !inline && match ? (
                                            <div className="relative group/code my-10 border border-white/10 bg-[#050505] rounded-sm">
                                                {/* Code Header matches terminal style */}
                                                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#080808]">
                                                    <div className="text-[10px] font-mono text-zinc-600">
                                                        terminal - {match[1]}
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute right-4 top-4 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                                        <CopyButton text={codeContent} />
                                                    </div>
                                                    <SyntaxHighlighter
                                                        {...props}
                                                        style={oneDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="!bg-transparent !p-6 !m-0 !rounded-none text-xs md:text-sm font-mono leading-relaxed opacity-90"
                                                        showLineNumbers={false}
                                                        customStyle={{ margin: 0, background: 'transparent' }}
                                                    >
                                                        {codeContent}
                                                    </SyntaxHighlighter>
                                                </div>
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
