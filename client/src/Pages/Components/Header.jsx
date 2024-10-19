import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBloggerB } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react';
import { toggleTheme } from '../../redux/theme/themeSlice';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const Path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`border-b-2 flex justify-between items-center p-4 fixed w-[100vw] max-[600px]:p-1 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'bg-gradient-to-r from-teal-700' : 'bg-blue-100'} z-50`}>
            <Link to="/" className="flex items-center">
            <FaBloggerB className="text-5xl mr-1 text-black"/>
            <span className={`text-3xl font-bold ${theme === 'dark' ? 'bg-white' : 'bg-gradient-to-r from-blue-600 to-blue-900'} text-transparent bg-clip-text max-[600px]:text-xl max-[600px]:font-normal max-[360px]:hidden`}>
                    Techie Blog
                </span>
            </Link>

            <div className="relative hidden lg:flex">
                <input
                    type="text"
                    placeholder="Search"
                    className={`border rounded-lg p-2 pl-10 ${theme === 'dark' ? 'bg-[rgb(22,29,50)] text-gray-200 border-gray-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                />
                <button type="submit" className={`absolute left-2 top-3 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <AiOutlineSearch />
                </button>
            </div>

            <button className={`w-12 h-10 lg:hidden text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} onClick={toggleNavbar}>
                <AiOutlineSearch />
            </button>

            <div className="hidden lg:flex gap-4">
                <Link to="/" className={`my-2 ${Path === '/' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                    Home
                </Link>
                <Link to="/about" className={`my-2 ${Path === '/about' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                    About
                </Link>
                <Link to="/projects" className={`my-2 ${Path === '/projects' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                    Projects
                </Link>
            </div>
            
            <div className="flex gap-2">
                <button className={`p-3 rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-teal-500 to-teal-700' : 'bg-gradient-to-r from-blue-400 to-blue-600 '} text-black h-[50px] max-[600px]:p-1 max-[600px]:h-[25px] max-[600px]:mt-3`} onClick={() => dispatch(toggleTheme())}>
                    <FaMoon />
                </button>
                {
                    currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User Avatar"
                                    img={currentUser.profilePicture}
                                    rounded
                                    className="w-10 h-10 border-2 border-yellow-400 shadow-md rounded-full hover:scale-110 transition-transform duration-200"
                                />
                            }
                            className="relative z-10"
                        >
                            <Dropdown.Header className="bg-gray-800 text-white p-4 rounded-t-md">
                                <span className="text-lg font-semibold">{currentUser.username}</span>
                                <span className="block text-sm text-gray-400">{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item className="hover:bg-gray-700 transition duration-200">
                                    Profile
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Item className="hover:bg-gray-700 transition duration-200">
                                Account Management
                            </Dropdown.Item>
                            <Dropdown.Item className="hover:bg-gray-700 transition duration-200">
                                Logout
                            </Dropdown.Item>
                            <Dropdown.Divider className="border-gray-600" />
                            <Dropdown.Item className="text-red-500 hover:bg-red-600 transition duration-200">
                                Delete Account
                            </Dropdown.Item>
                        </Dropdown>
                    ) :
                        (
                            <Link to="/sign-in">
                                <button className={`px-6 py-3 font-bold rounded-md shadow-lg transition duration-300 max-[600px]:px-2 py-2 font-medium ${theme === 'dark' ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white' : 'bg-gradient-to-r from-blue-400 to-blue-600 to-lime-500 text-black hover:opacity-90'}`}>
                                    Sign In
                                </button>
                            </Link>
                        )
                }
            </div>

            <button
                className={`lg:hidden text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={toggleNavbar}
            >
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            <div className={`absolute bg-white transition-all duration-300 ease-in-out ${isOpen ? 'mt-[20px] top-16 right-0 w-full h-auto max-[600px]:mt-[-5px]' : 'top-16 right-0 w-0 h-0 overflow-hidden'} ${theme === 'dark' ? 'bg-[rgb(22,29,50)] text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                <div className="flex flex-col p-4 z-10 h-[50vh] pt-[13px]">
                    <Link to="/" className={`py-2 ${Path === '/' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                        Home
                    </Link>
                    <Link to="/about" className={`py-2 ${Path === '/about' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                        About
                    </Link>
                    <Link to="/projects" className={`py-2 ${Path === '/projects' ? 'text-blue-500 font-bold' : theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-teal-500'}`}>
                        Projects
                    </Link>
                </div>
            </div>
        </nav>
    );
}

