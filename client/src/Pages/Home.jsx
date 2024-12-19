import { useEffect, useState } from 'react';
import PostCard from './Components/PostCard';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        if (!res.ok) {
          console.error('API Error:', res.status, res.statusText);
          return;
        }
        const text = await res.text(); // Read raw response
        if (text) {
          const data = JSON.parse(text); // Safely parse JSON
          setPosts(data.posts || []);
        } else {
          console.error('Empty response body.');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div className="w-[98.7vw] bg-gradient-to-r from-purple-800 via-purple-900 to-black">
      <Helmet>
        <title>Home - harmanım</title>
      </Helmet>

      <div className="max-w-6xl px-6 md:px-12 lg:px-20 pb-[150px] pt-[100px]">

        {posts && posts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
