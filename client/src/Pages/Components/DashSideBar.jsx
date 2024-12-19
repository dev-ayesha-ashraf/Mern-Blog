import { FaBox, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { useState, useEffect } from "react";


export default function DashSideBar() {
    const { currentUser } = useSelector((state) => state.user) || {};
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);
    return (
        <div>
            <div
                className={`z-10 fixed left-0 top-[4rem] mt-2 h-full bg-purple-900 text-white shadow-md transform transition-transform duration-300 ease-in-out max-[750px]:top-15 max-[600px]:mt-2 `}
            >

                <div className="flex flex-col h-full p-4 max-[850px]:p-1">
                    <button className="flex items-center justify-between p-1 my-2 transition-colors duration-200">
                        <Link to={"/deposit"}>   <FaBox className="text-xl" /></Link>

                    </button>
                    <button className="flex items-center justify-between p-1 my-2 transition-colors duration-200">
                        <Link to="/cart">
                            <div className="relative">
                                <FaShoppingCart className="text-xl" />
                                {/* Notification bubble */}
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 text-white rounded-full w-[20px] h-[20px] text-xs">
                                       +{cart.reduce((total, item) => total + item.count, 0)}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </button>

                    <button className="flex items-center justify-between p-1 my-2 transition-colors duration-200">
                        <Link to={"/info"}> <FaInfoCircle className="text-xl" /></Link>

                    </button>

                    {/* Conditional Admin Links */}
                    {currentUser ? (
                        currentUser.isAdmin && (
                            <>

                                <button className="flex items-center justify-between p-1 my-2 transition-colors duration-200 rounded">
                                    <Link to={"/dashboard?tab=posts"}> <MdDashboard className="mr-2 text-xl max-[850px]:mr-2" /></Link>

                                </button>
                                <button className="flex items-center justify-between p-1 my-2 transition-colors duration-200 rounded">
                                    <Link to={"/create-post"}> <MdPostAdd className="mr-2 text-xl max-[850px]:mr-2" /></Link>

                                </button>
                            </>
                        )
                    ) : (
                        <p className="text-sm mt-4 text-gray-300"></p>
                    )}
                </div>
            </div>
        </div>
    );
}
