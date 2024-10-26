import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts${currentUser.isAdmin ? '' : `?userId=${currentUser._id}`}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
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
  }, [currentUser]);

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
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Index</th>
              <th className="border px-4 py-2 text-left">UserName</th>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Posted On</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map(post => (
              <tr key={post._id} className="border-b hover:bg-gray-100">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">{currentUser.username}</td>
                <td className="border px-4 py-2">{currentUser.username}</td>
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
      ) : (
        <p>No posts found.</p>
      )}

      {/* Modal for showing post details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
            <p><strong>Email:</strong> {currentUser.email}</p>
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
