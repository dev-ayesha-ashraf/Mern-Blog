import { Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-24 p-6 min-h-screen ml-[14%] w-[82%] max-[500px]:w-[92%]">
      {currentUser.isAdmin && users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover bg-gray-300"
                />
                <div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {user.username}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 w-[75%] text-wrap">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-gray-600 dark:text-gray-400">
                <p>Date Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="flex items-center mt-2">
                  Admin: {user.isAdmin ? <FaCheck className="text-green-500 ml-1" /> : <FaTimes className="text-red-500 ml-1" />}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setUserIdToDelete(user._id);
                }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">No users found.</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
