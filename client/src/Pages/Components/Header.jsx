
import { Link, } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";


export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/deposit')
    }
    return (
        <nav className={`z-10 flex justify-between items-center p-4 fixed w-full transition-all duration-300 ease-in-out bg-purple-900`}>
            <Link to="/" className="flex items-center">
                <span className={`text-3xl font-bold text-white max-[600px]:text-2xl`}>harmanım</span>
            </Link>

            <div className="flex gap-2 items-center">
            <div className="text-right">
                <span className="block text-sm font-light text-[#ffff]">0.00 TL</span>
                <span className="text-xs text-[#ffff]">Bakiye</span>
            </div>
                {currentUser ? (
                    <button className="bg-[#ffff] p-2 rounded-full shadow-lg" onClick={handleClick}>
                        <FaRegUser className="text-xl" />
                    </button>
                ) : (
                    <Link to="/sign-in">
                        <button className="bg-[#ffff] p-2 rounded-full shadow-lg">
                            <FaRegUser className="text-xl" />
                        </button>
                    </Link>

                )}
                <button
                    className="bg-[#ffff] p-2 rounded-full shadow-lg "
                    onClick={() => navigate('/message')}
                >
                    <FaEnvelope className="text-xl" />
                </button>
            </div>

        </nav>
    );
}
