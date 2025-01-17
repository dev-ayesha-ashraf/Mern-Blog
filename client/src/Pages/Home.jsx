import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from './Components/PostCard';
import { FaArrowRight } from "react-icons/fa";
import { Helmet } from 'react-helmet'; 

const TypingText = ({ text, tag: Tag }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 90;

  const typeText = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  };

  useEffect(() => {
    typeText(text);
  }, [text]);

  const MotionTag = motion[Tag];
  return <MotionTag className="text-5xl font-semibold text-indigo-900 text-center max-[570px]:text-4xl max-[420px]:text-2xl">{displayedText}</MotionTag>;
};

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home - Techie Blog</title>
        <meta name="description" content="Welcome to Techie Blog, where you'll find a variety of articles and tutorials on many topics." />
        <meta name="keywords" content="blog, tech, tutorials, articles, programming" />
      </Helmet>
      
      <div className='flex flex-col gap-6 pt-28 px-3 max-w-6xl mx-auto '>
        <TypingText text="Welcome To Techie Blog" tag="h1" />
        <p className='text-gray-500 text-xl text-center'>
          Here you'll find a variety of articles and tutorials on Many topics.
        </p>
        <Link
          to={'/search'}
          className="flex items-center justify-center text-center space-x-2 px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer mx-auto"
        >
          <span>View all posts</span>
          <FaArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col'>
            <h2 className='text-3xl font-semibold text-center'>Recent Posts</h2>
            <div className='w-full flex justify-center text-center items-center mt-2 mb-10'>
              <span className='w-[100px] h-[3px] bg-[#85053a]'></span>
            </div>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className="mt-5 flex items-center justify-center text-center space-x-2 px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer mx-auto"
            >
              <span>View all posts</span>
              <FaArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
