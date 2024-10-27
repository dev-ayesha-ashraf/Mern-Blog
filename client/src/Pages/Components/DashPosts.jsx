import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [postLimit, setPostLimit] = useState(9); // Set initial limit to 9 posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts${currentUser.isAdmin ? `?limit=${postLimit}` : `?userId=${currentUser._id}&limit=${postLimit}`}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          // Hide "Show More" button if fewer posts are fetched than requested limit
          if (data.posts.length < postLimit) {
            setShowMore(false);
          }
        } else {
          throw new Error(data.message || "Failed to fetch posts");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser, postLimit]);

  const handleShowMore = () => {
    setPostLimit((prevLimit) => prevLimit + 5); // Increase limit by 5 on each click
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  if (loading) return <h2>Loading posts...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="pt-20 w-[75%] mx-auto pl-[10%]">
      {userPosts.length > 0 ? (
        <div className="mt-4">
          <table className="hidden w-full border-collapse md:table">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Index</th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Posted On</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post, index) => (
                <tr key={post._id} className="border-b hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openModal(post)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden">
            {userPosts.map((post, index) => (
              <div key={post._id} className="mb-4 p-4 border rounded-lg shadow-sm hover:bg-gray-100">
                <p><strong>Index:</strong> {index + 1}</p>
                <p><strong>Title:</strong> {post.title}</p>
                <p><strong>Posted On:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="mt-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    onClick={() => openModal(post)}
                  >
                    Show Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p>No posts found.</p>
      )}

      {/* Modal for showing post details */}
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 h-full pt-20">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="mt-2 mb-4 w-full h-auto rounded"
              />
            )}
            <p className="mt-2">{selectedPost.content}</p>
            <p><strong>Posted on:</strong> {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            <p><strong>User ID:</strong> {selectedPost.userId}</p>
            <p><strong>Last Updated:</strong> {new Date(selectedPost.updatedAt).toLocaleDateString()}</p>
            <div className="mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => {/* Add update functionality */ }}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {/* Add delete functionality */ }}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
