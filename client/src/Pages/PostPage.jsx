import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import Helmet
import CommentSection from './Components/CommentSection';
import PostCard from './Components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
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
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
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

  // Define the title and description for the Helmet
  const title = post ? post.title : "Loading...";
  const description = post ? post.content.substring(0, 160) + "..." : "Loading post content...";

  return (
    <main className='pt-20 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <h1 className='text-3xl mt-10 text-center max-w-2xl mx-auto lg:text-4xl text-indigo-800'>
        {post && post.title}
      </h1>
      <div className='w-full flex justify-center text-center items-center mt-2'>
        <span className='w-[100px] h-[3px] bg-[#85053a]'></span>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-3 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-3xl font-semibold text-center mt-5'>Recent articles</h1>
        <div className='w-full flex justify-center text-center items-center mt-2 mb-10'>
          <span className='w-[100px] h-[3px] bg-[#85053a]'></span>
        </div>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
