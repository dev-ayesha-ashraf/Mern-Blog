import { Navbar, NavbarCollapse, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/logo6.jpg";
import { Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
export default function Header() {
    const Path = useLocation().pathname;
    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap">
                <div className="flex items-center text-center">
                    <img src={logo} alt="Logo" className="h-14" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-transparent bg-clip-text">
                        Techie Blog
                    </span>
                </div>

            </Link>
            <form>
                <TextInput
                    type="text"
                    placeholder="Search"
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>

            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <button className="p-3 rounded-full bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-black h-[50px]">
                    <FaMoon />
                </button>
                <Link to='/sign-in'>
                    <button className="px-6 py-3 text-black font-bold bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 rounded-md shadow-lg hover:opacity-90 transition duration-300">
                        Sign In
                    </button>


                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="max-[600px]:h-[45vh]">
                <Navbar.Link active={Path === '/'} as={'div'} className="my-[20px]">
                    <Link to='/' className="text-gray-800 hover:text-green-500">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={Path === '/about'} as={'div'} className="my-[20px]">
                    <Link to='/about' className="hover:text-green-500">
                        About
                    </Link></Navbar.Link>
                <Navbar.Link active={Path === '/projects'} as={'div'} className="my-[20px]">
                    <Link to='/projects' className="hover:text-green-500">
                        Projects
                    </Link></Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}