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

import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from './Components/PostCard';

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
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        {/* <CallToAction /> */}
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}