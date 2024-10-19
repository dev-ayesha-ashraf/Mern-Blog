import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-20 mt-1 h-full bg-gray-800 text-white shadow-md transform transition-transform duration-300 ease-in-out max-[750px]:top-15 max-[600px]:top-12 max-[600px]:mt-2 ${isOpen ? 'translate-x-0' : '-translate-x-[8.5rem]'} md:translate-x-0`}
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
                    <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-gray-500 rounded">
                        <Link to={'/dashboard?tab=profile'}>
                            Profile
                        </Link>
                        <FaUser className="mr-2 text-xl max-[850px]:mr-2" />

                    </button>
                    <button className="flex items-center justify-between p-2 my-2 transition-colors duration-200 hover:bg-gray-500 rounded ">
                        Sign Out
                        <FaSignOutAlt className="mr-2 text-xl max-[850px]:mr-2" />

                    </button>
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
