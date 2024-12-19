import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';


export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch the post.");
        }

        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPost(data.posts[0]);
          setError(false);
        } else {
          throw new Error("Post data is unavailable.");
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching post:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();

        if (res.ok && Array.isArray(data.posts)) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <p className="text-red-600">An error occurred while loading the post. Please try again later.</p>
      </div>
    );
  }

  const title = post?.title || "Loading...";

  const description =
    post && typeof post.content === "string"
      ? `${post.content.substring(0, 160)}...`
      : typeof post.content === "number"
        ? `Price: ${post.content}`
        : "Loading post content...";

  return (
    <main className="pt-20 flex flex-col max-w-6xl mx-auto min-h-screen pl-20">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Post Title */}
      <h1 className="text-3xl mt-10 text-center max-w-2xl mx-auto lg:text-4xl text-indigo-800">
        {post?.title || "Post Title"}
      </h1>

      {/* Separator */}
      <div className="w-full flex justify-center items-center mt-2">
        <span className="w-[100px] h-[3px] bg-[#85053a]"></span>
      </div>

      {/* Post Image */}
      {post?.image && (
        <img
          src={post.image}
          alt={post.title || "Post Image"}
          className="mt-3 p-3 max-h-[600px] w-5/6 object-cover"
        />
      )}

      {/* Post Date */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post?.createdAt && new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content">
        {typeof post.content === "string" && (
          <p dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
        {typeof post.content === "number" && <p>Price: {post.content}</p>}
      </div>
    </main>
  );
}
