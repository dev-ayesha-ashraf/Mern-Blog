import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBloggerB } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react';
import { TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Modal , Button } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";

import { signoutSuccess , deleteUserFailure , deleteUserStart , deleteUserSuccess } from "../../redux/user/userSlice";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [window.location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const data = await res.json();
                dispatch(deleteUserFailure(data.message));
            } else {
                const data = await res.json();
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            dispatch(deleteUserFailure(error.message));
        }
    };
    return (
        <nav className={`z-10 flex justify-between items-center p-4 fixed w-full transition-all duration-300 ease-in-out bg-[#db7093]`}>
            <Link to="/" className="flex items-center">
                <FaBloggerB className="text-5xl mr-2 text-white transition-transform hover:scale-110 max-[600px]:text-2xl" />
                <span className={`text-3xl font-bold text-white max-[530px]:hidden max-[600px]:text-2xl`}>Techie Blog</span>
            </Link>

            <div className="relative lg:flex max-[440px]:w-[37%]">
                <form onSubmit={handleSubmit} className="w-full">
                    <TextInput
                        type='text'
                        placeholder='Search...'
                        rightIcon={AiOutlineSearch}
                        className='rounded-lg shadow-md border-none focus:ring-2 focus:ring-[#85053a] focus:ring-opacity-100'
                        style={{ outline: 'none', boxShadow: '0 0 0 2px #85053a' }} // Custom box shadow for focus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>




            </div>

            <div className="hidden lg:flex gap-6">
                {['/', '/about', '/projects'].map((link, index) => (
                    <Link key={index} to={link} className={`my-2 text-lg ${path === link ? 'text-[#85053a] font-bold' : 'text-gray-200 hover:text-[#85053a] transition duration-300'}`}>
                        {link === '/' ? 'Home' : link.charAt(1).toUpperCase() + link.slice(2)}
                    </Link>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User Avatar"
                                img={currentUser.profilePicture}
                                rounded
                                className="w-10 h-10 transition-transform hover:scale-110"
                            />
                        }
                        className="relative z-10"
                    >
                        <Dropdown.Header className="bg-[#85053a] text-white p-4 rounded-t-md flex">
                            <div className="pr-3 flex jusify-center items-center text-center">
                            <FaRegUser className="text-3xl"/>
                            </div>
                            <div>
                            <span className="text-lg font-semibold">{currentUser.username}</span>
                            <span className="block text-sm text-gray-400">{currentUser.email}</span>
                            </div>

                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item className="hover:bg-gray-700 transition duration-200">Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Item className="hover:bg-gray-700 transition duration-200">Add Blog</Dropdown.Item>
                        <Dropdown.Item className="hover:bg-gray-700 transition duration-200" onClick={handleSignout}>Logout</Dropdown.Item>
                        <Dropdown.Divider className="border-gray-600" />
                        <Dropdown.Item className="text-red-500 hover:bg-red-600 transition duration-200" onClick={() => setShowModal(true)}>Delete Account</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <button className={`px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer max-[350px]:px-3`}>
                            Sign In
                        </button>
                    </Link>

                )}
            </div>

            <button className={`lg:hidden text-xl text-white`} onClick={toggleNavbar}>
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            <div className={`absolute bg-white transition-all duration-300 ease-in-out ${isOpen ? 'mt-[20px] top-16 right-0 w-full h-auto max-[600px]:mt-[-5px]' : 'top-16 right-0 w-0 h-0 overflow-hidden'} bg-gray-50 text-gray-700 rounded-lg shadow-lg`}>
                <div className="flex flex-col p-4 z-10">
                    {['/', '/about', '/projects'].map((link, index) => (
                        <Link key={index} to={link} className={`py-2 text-lg ${path === link ? 'text-blue-500 font-bold' : 'text-gray-600 hover:text-teal-500 transition duration-300'}`}>
                            {link === '/' ? 'Home' : link.charAt(1).toUpperCase() + link.slice(2)}
                        </Link>
                    ))}
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </nav>
    );
}
