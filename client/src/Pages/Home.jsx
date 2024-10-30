// import HomeImage from "/src/blogHome.webp"
// export default function Home() {
//   return (
// <div className="pt-[20vh] flex flex-col lg:flex-row px-[30px] w-full mx-auto justify-center items-center max-[500px]:px-0">
//   <div className="w-full lg:w-1/2 p-4">
//     <h1 className="text-2xl lg:text-5xl font-bold mb-4">Welcome To Techie Blog</h1>
//     <p className="text-sm lg:text-xl mb-6 w-[85%] max-[500px]:w-full">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quis perspiciatis impedit, alias natus sit accusantium suscipit recusandae beatae consequatur? Ducimus, voluptates delectus. Ipsa eligendi fugit suscipit. Distinctio nesciunt qui voluptatibus!
//     </p>
//     <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">
//       Get Started
//     </button>
//   </div>
//   <div className="w-full lg:w-1/2 p-4">
//     <img src={HomeImage} alt="Techie Blog" className="w-[500px] h-[420px] rounded-lg" />
//   </div>
// </div>

//   )
// }
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from './Components/PostCard';
import { FaTwitter, FaFacebook, FaArrowRight } from "react-icons/fa";
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