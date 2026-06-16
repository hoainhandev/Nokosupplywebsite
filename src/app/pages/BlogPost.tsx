import { Link, useParams } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { fetchPostBySlug } from "../../lib/blog";
import type { BlogPost as BlogPostType } from "../../types/blog";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

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

function formatPostDate(post: BlogPostType) {
  const date = post.published_at ?? post.created_at;
  return format(new Date(date), "d MMMM yyyy", { locale: enUS });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    fetchPostBySlug(slug)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      })
      .catch(() => setError("Unable to load this post. Please try again later."))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Noko Blog`;
    }
    return () => {
      document.title = "Noko";
    };
  }, [post?.title]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-x-hidden">
      <ScrollProgress />

      <article className="relative pt-28 pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link to="/blog">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white p-0 h-auto group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              <p className="text-gray-500">Loading post...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-24">
              <p className="text-gray-400 mb-6">{error}</p>
              <Link to="/blog">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Back to Blog
                </Button>
              </Link>
            </div>
          )}

          {notFound && !loading && !error && (
            <div className="text-center py-24">
              <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
              <p className="text-gray-400 mb-8">This post doesn't exist or has been removed.</p>
              <Link to="/blog">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0">
                  Back to Blog
                </Button>
              </Link>
            </div>
          )}

          {post && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header className="mb-10">
                {post.category && (
                  <span className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300">
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                    {post.title}
                  </span>
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_at ?? post.created_at}>
                    {formatPostDate(post)}
                  </time>
                </div>
              </header>

              {post.thumbnail && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-white/10">
                  <ImageWithFallback
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full max-w-full object-cover"
                  />
                </div>
              )}

              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
}
