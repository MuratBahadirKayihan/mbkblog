import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export default function BlogPage() {
    const allPosts = getSortedPostsData();

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 md:px-8">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Blog & Yazılar
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Deneyimlerimi ve öğrendiklerimi paylaştığım notlarım.
                        </p>
                    </header>

                    {allPosts.length === 0 ? (
                        <div className="text-center py-10 border border-slate-800 rounded-sm bg-slate-900/50">
                            <p className="text-slate-400 font-mono text-sm">/var/log/posts: empty</p>
                        </div>
                    ) : (
                        <div className="flex flex-col border-t border-white/10">
                            {allPosts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block py-6 border-b border-white/10 hover:bg-white/5 transition-colors px-4 -mx-4">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
                                        <div className="flex-1">
                                            <h2 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors font-mono tracking-tight">
                                                {post.title}
                                            </h2>
                                            <p className="text-slate-500 text-sm mt-1 line-clamp-1">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 text-xs text-slate-500 font-mono shrink-0">
                                            <span className="flex items-center gap-2 min-w-[100px]">
                                                {post.date}
                                            </span>
                                            {post.tags && post.tags.length > 0 && (
                                                <span className="hidden md:flex items-center gap-1 text-slate-600">
                                                    <span className="text-cyan-500/50">#</span>
                                                    {post.tags[0]}
                                                </span>
                                            )}
                                            <span className="group-hover:translate-x-1 transition-transform text-slate-600 group-hover:text-cyan-400">
                                                {"->"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </main>
    );
}
