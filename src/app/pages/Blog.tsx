import { Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fetchPublishedPosts } from "../../lib/blog";
import type { BlogPost } from "../../types/blog";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { BookOpen, Calendar, Loader2 } from "lucide-react";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

function formatPostDate(post: BlogPost) {
  const date = post.published_at ?? post.created_at;
  return format(new Date(date), "d MMMM yyyy", { locale: enUS });
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setError("Unable to load posts. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-x-hidden">
      <ScrollProgress />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 mb-8">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300 font-medium">Noko Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                F&B Knowledge
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                for the U.S. market
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Operations tips, industry trends, and success stories from the Noko community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 pb-32 relative">
        <div className="container">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              <p className="text-gray-500">Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-24">
              <p className="text-gray-400">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-400">No posts yet. Check back soon!</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full group">
                    <Card className="h-full bg-card/50 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                      <div className="aspect-video overflow-hidden bg-secondary/50">
                        {post.thumbnail ? (
                          <ImageWithFallback
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover max-w-full group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                            <BookOpen className="w-12 h-12 text-indigo-400/50" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.published_at ?? post.created_at}>
                            {formatPostDate(post)}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
