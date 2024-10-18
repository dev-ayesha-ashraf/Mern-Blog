import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/logo6.jpg";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { Avatar, Dropdown } from 'flowbite-react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const Path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    console.log(currentUser);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="border-b-2 flex justify-between items-center p-4 relative max-[600px]:p-1">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-14" />
                <span className="text-3xl font-bold bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-transparent bg-clip-text max-[600px]:text-xl max-[600px]:font-normal max-[360px]:hidden">
                    Techie Blog
                </span>
            </Link>

            <div className="relative hidden lg:flex">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-lg p-2 pl-10" // Add padding to the left for the icon
                />
                <button type="submit" className="absolute left-2 top-3 text-xl">
                    <AiOutlineSearch />
                </button>
            </div>

            <button className="w-12 h-10 lg:hidden text-xl" onClick={toggleNavbar}>
                <AiOutlineSearch />
            </button>
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex gap-4">
                <Link to="/" className={`my-2 ${Path === '/' ? 'text-green-500 font-bold' : 'text-gray-800 hover:text-green-500'}`}>
                    Home
                </Link>
                <Link to="/about" className={`my-2 ${Path === '/about' ? 'text-green-500 font-bold' : 'hover:text-green-500'}`}>
                    About
                </Link>
                <Link to="/projects" className={`my-2 ${Path === '/projects' ? 'text-green-500 font-bold' : 'hover:text-green-500'}`}>
                    Projects
                </Link>
            </div>
            <div className="flex gap-2">
                <button className="p-3 rounded-full bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-black h-[50px] max-[600px]:p-1 max-[600px]:h-[25px] max-[600px]:mt-3">
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
                                    className="w-10 h-10 border-2 border-yellow-400 shadow-md rounded-full" // Full rounded avatar
                                />
                            }
                            className="relative z-10" // Ensure dropdown appears above other content
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
                                <button className="px-6 py-3 text-black font-bold bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 rounded-md shadow-lg hover:opacity-90 transition duration-300 max-[600px]:px-2 py-2 font-medium">
                                    Sign In
                                </button>
                            </Link>
                        )
                }

            </div>

            {/* Toggle Navbar for Mobile */}
            <button
                className="lg:hidden text-xl"
                onClick={toggleNavbar}
            >
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            {/* Mobile Navigation Links */}
            <div className={`absolute bg-white transition-all duration-300 ease-in-out ${isOpen ? 'mt-[30px] top-16 right-0 w-full h-auto max-[600px]:mt-[10px]' : 'top-16 right-0 w-0 h-0 overflow-hidden'}`}>
                <div className="flex flex-col p-4">
                    <Link to="/" className={`py-2 ${Path === '/' ? 'text-green-500 font-bold' : 'text-gray-800 hover:text-green-500'}`}>
                        Home
                    </Link>
                    <Link to="/about" className={`py-2 ${Path === '/about' ? 'text-green-500 font-bold' : 'hover:text-green-500'}`}>
                        About
                    </Link>
                    <Link to="/projects" className={`py-2 ${Path === '/projects' ? 'text-green-500 font-bold' : 'hover:text-green-500'}`}>
                        Projects
                    </Link>
                </div>
            </div>


        </nav>
    );
}
