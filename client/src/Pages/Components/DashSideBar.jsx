import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdOutlinePostAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiUsersFill } from "react-icons/pi";
import { FaCommentDots } from "react-icons/fa";

export default function DashSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div>

            {/* Sidebar */}
            <div
                className={`z-10 fixed left-0 top-[4rem] mt-4 h-full bg-[#471027] text-white shadow-md transform transition-transform duration-300 ease-in-out max-[750px]:top-15 max-[600px]:mt-2 ${isOpen ? 'translate-x-0' : '-translate-x-[8.5rem]'} md:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4 max-[850px]:p-0">
                    <div className='flex justify-between'>
                        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-4 text-2xl text-white pt-1"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Sidebar Buttons */}
                    <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-pink-900 rounded">
                        <Link to={'/dashboard?tab=profile'}>
                            Profile
                        </Link>
                        <FaUser className="mr-2 text-xl max-[850px]:mr-2" />

                    </button>
                    <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-pink-900 rounded">
                        <Link to={'/dashboard?tab=posts'}>
                            Blogs
                        </Link>
                        <MdOutlinePostAdd className="mr-2 text-xl max-[850px]:mr-2" />

                    </button>
                    <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-pink-900 rounded">
                        <Link to={'/dashboard?tab=posts'}>
                            Dashboard
                        </Link>
                        <MdDashboard className="mr-2 text-xl max-[850px]:mr-2" />

                    </button>
                    {currentUser.isAdmin && (
                        <>
                            <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-pink-900 rounded">
                                <Link to={'/dashboard?tab=users'}>
                                    Users
                                </Link>
                                <PiUsersFill className="mr-2 text-xl max-[850px]:mr-2" />

                            </button>
                            <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-pink-900 rounded">
                                <Link to={'/dashboard?tab=comments'}>
                                    Comments
                                </Link>
                                <FaCommentDots className="mr-2 text-xl max-[850px]:mr-2" />

                            </button>
                           

                        </>
                    )}

                </div>
            </div>

            {/* Overlay for Small Screens */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 md:hidden"
                />
            )}
        </div>
    );
}
