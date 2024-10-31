import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Modal, Button } from 'flowbite-react';
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [postLimit, setPostLimit] = useState(9);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts${currentUser.isAdmin ? `?limit=${postLimit}` : `?userId=${currentUser._id}&limit=${postLimit}`}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
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
    setPostLimit((prevLimit) => prevLimit + 5);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  const handleDeletePost = async () => {
    setShowdeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <h2>Loading posts...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="pt-20 w-[75%] mx-auto pl-[10%] max-[800px]:w-[96%] max-[600px]:pl-[13%]">
      {userPosts.length > 0 ? (
        <div className="mt-4">
          {userPosts.map((post, index) => (
            <div
              key={post._id}
              className="flex flex-row mb-4 p-4 border border-[#85053a] rounded-lg shadow-sm hover:bg-[#fff0f6] max-[600px]:p-[2px] max-[600px]:flex-col"
            >
              <div className="w-1/3 p-2 max-[600px]:w-[100%] max-[600px]:p-[2px]">
                <img
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-auto rounded-lg max-[1000px]:h-full"
                />
              </div>
              <div className="w-2/3 p-2 flex flex-col justify-between max-[600px]:w-[100%] max-[600px]:p-[2px]">
                <div className="pt-5">
                  <p className="mb-3"><strong>Index:</strong> {index + 1}</p>
                  <p className="mb-3"><strong>Title:</strong> {post.title}</p>
                  <p className="mb-3"><strong>Posted On:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  className="px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer"
                  onClick={() => openModal(post)}
                >
                  Show Details
                </button>
              </div>
            </div>
          ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='mt-3 mb-3 flex mx-auto px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer'
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p>No posts found.</p>
      )}

      {/* Modal for showing post details with Update and Delete buttons */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-full pt-20">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="mt-2 mb-4 w-full h-[220px] rounded"
              />
            )}
            <p className="mt-2">{selectedPost.content.slice(0, 100)}...</p>
            <Link
              className='text-indigo-800 text-center pt-1 pb-1 hover:underline'
              to={`/post/${selectedPost.slug}`}
            >
              See full post
            </Link>
            <div className="mt-4 flex gap-2">
              <Link
                className='px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-green-500 text-white hover:bg-green-600'
                to={`/update-post/${selectedPost._id}`}
              >
                Update
              </Link>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setShowdeleteModal(true);
                  setPostIdToDelete(selectedPost._id);
                }}
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

      {/* Confirmation Modal for Delete */}
      <Modal
        show={showdeleteModal}
        onClose={() => setShowdeleteModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowdeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
