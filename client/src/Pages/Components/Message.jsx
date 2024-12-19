import React, { useState, useEffect } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export const Messages = () => {
    const { currentUser } = useSelector((state) => state.user) || {};
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        setIsLoggedIn(!!token);
    }, []);

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openPopup = () => {
        if (isLoggedIn === null) return;
        if (isLoggedIn) {
            setIsPopupOpen(true);
        } else {
            alert("You must be logged in to view messages. Please log in first.");
        }
    };

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <div className="bg-purple-900 h-[100vh]">
            <Helmet>
                <title>message - harmanım</title>
                <meta name="description" content="Welcome to Techie Blog, where you'll find a variety of articles and tutorials on many topics." />
                <meta name="keywords" content="blog, tech, tutorials, articles, programming" />
            </Helmet>
            <button
                className="fixed bottom-4 right-4 bg-purple-700 p-3 rounded-full shadow-lg hover:bg-purple-600"
                onClick={openPopup}
            >
                <FaCommentAlt className="text-white text-2xl" />
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Messages</h2>
                            <button
                                className="text-white text-2xl hover:text-gray-400"
                                onClick={closePopup}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md mb-4">
                            <div className="flex items-start">
                                <div className="bg-purple-500 p-2 rounded-full mr-3">
                                    <FaCommentAlt className="text-white text-xl" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold">
                                        Aramıza hoş geldin <span className="text-yellow-300"> {currentUser && currentUser.username && (
                                            <span className="text-lg font-semibold my-4 text-center text-white align-center">
                                                @{currentUser.username}
                                            </span>
                                        )}</span>, Yeni ve değişen
                                        dünyaya ayak uydurmak için hazır ol. Her şeyi senin için
                                        güvenli ve basit tutmaya çalışıyoruz. Sipariş verdikten sonra
                                        buradan satıcın seninle iletişime geçecek.{" "}
                                        <span className="underline">BİLGİLENDİRME</span> sayfasını
                                        okumayı unutma.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-end ">
                            <button
                                className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                                onClick={closePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
