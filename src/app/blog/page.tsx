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
                        <div className="text-center py-10 border border-slate-800 rounded-2xl bg-slate-900/50">
                            <p className="text-slate-400">Henüz hiç yazı eklenmemiş.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {allPosts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block h-full">
                                    <div className="relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl flex flex-col">

                                        {/* Optional Image Area - Only render if image exists */}
                                        {post.image ? (
                                            <div className="mb-4 h-48 w-full overflow-hidden rounded-xl bg-slate-800">
                                                {/* Since we are using static export mainly, simple img tag or Next Image with unoptimized is fine. */}
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                        ) : (
                                            // Fallback gradient if no image is provided, to keep the grid nice
                                            <div className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                                <span className="text-4xl opacity-20">📝</span>
                                            </div>
                                        )}

                                        <div className="flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {post.date}
                                                </span>
                                                {post.tags && post.tags.length > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <Tag className="w-3 h-3" />
                                                        {post.tags[0]}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center text-blue-400 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                                Devamını Oku <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
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
