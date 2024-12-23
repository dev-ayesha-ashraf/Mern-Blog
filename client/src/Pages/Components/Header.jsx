import { Link, } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/deposit')
    }
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

                    <div className="flex">
                        <button className="m-1 bg-[#ffff] p-2 rounded-full shadow-lg" onClick={handleClick}>
                            <FaRegUser className="text-xl" />
                        </button>
                        <p
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-blue-500 transition duration-200 cursor-pointer"
                            onClick={handleSignout}
                        >
                            Çıkış Yap
                        </p>

                    </div>

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
