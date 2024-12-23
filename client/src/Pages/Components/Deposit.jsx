import React, { useState, useEffect } from 'react';
import { FaCopy, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from "react-redux";

export const DepositWithdraw = () => {
    const { currentUser } = useSelector((state) => state.user) || {};
    const navigate = useNavigate()
    const [isAlertVisible, setIsAlertVisible] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [walletAddress, setWalletAddress] = useState(""); // State for the wallet address
    const [isWithdrawPopupVisible, setIsWithdrawPopupVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    // Track insufficient balance warning
    const [warningMessage, setWarningMessage] = useState(""); // Track the warning message

    // Check if the user is logged in (check token)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleInfoPage = () => {
        navigate('/info');
    }
    const handleDepositClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first to make a deposit.');
            return;
        }
        setIsAlertVisible('deposit');
        setSelectedCurrency("");
        setWalletAddress(""); // Reset wallet address when deposit is clicked
    };

    const handleWithdrawClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first to withdraw funds.');
            return;
        }
        setIsAlertVisible('withdraw');
        setSelectedCurrency("");
        setWalletAddress(""); // Reset wallet address when withdraw is clicked
    };

    const handleSellerClick = () => {
        setIsAlertVisible('satıcı ol');
        setWarningMessage('Teminat yetersiz. Lütfen bilgilendirme sayfasını okuyunuz..');
    };

    const closeAlert = () => {
        setIsAlertVisible(null);
        setIsWithdrawPopupVisible(false);
        setWarningMessage("");
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
    };

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address)
            .then(() => alert('Wallet address copied!'))
            .catch(err => alert('Failed to copy address: ' + err));
    };

    const handleWithdraw = () => {
        setInsufficientBalance(true);
    };

    return (
        <div className="pt-20 h-[100vh] text-white bg-purple-900">
            <Helmet>
                <title>Deposit - harmanım</title>
                <meta name="description" content="Welcome to Techie Blog, where you'll find a variety of articles and tutorials on many topics." />
                <meta name="keywords" content="blog, tech, tutorials, articles, programming" />
            </Helmet>
            <h2 className="max-[600px]:text-2xl text-3xl font-bold mb-8 text-purple-600 text-center max-[400px]:font-normal">Profil    {currentUser && currentUser.username && (
                <span className="text-lg font-semibold my-4 text-center text-white align-center">
                    @{currentUser.username}
                </span>
            )}    </h2>
         


            <div>
                <h3 className="text-2xl text-center font-semibold mb-4 text-gray-900">0.00 TL</h3>
                <div className="para px-20 flex justify-center gap-12 sm:gap-6 max-[660px]:flex-col mx-auto text-lg font-semibold">
                    <h3 onClick={handleDepositClick} className="cursor-pointer text-white bg-purple-700 hover:bg-purple-600 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                        PARA YÜKLE
                    </h3>
                    <h3 onClick={handleWithdrawClick} className="cursor-pointer text-white bg-purple-700 hover:bg-purple-600 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                        PARA ÇEK
                    </h3>
                </div>

                <div className="p-6 rounded-lg w-8/12 mx-auto bg-purple-700 mt-4 max-[700px]:p-1">
                    <p className="text-center mt-2 text-sm text-white">Tüm Siparişler</p>
                    <p className="mt-2 text-center text-sm text-white font-semibold">Gösterilecek siparişiniz bulunmamaktadır</p>
                </div>
            </div>

            <div className="mb-12 text-center bg-purple-900">
                <h3 className="text-2xl font-semibold mb-4 text-white md:mb-8 max-[700px]:text-xl max-[700px]:font-normal max-[700px]:px-10 pt-5">
                    Satıcı olmak için lütfen bilgilendirme sayfasını okuyunuz.
                </h3>

                <button
                    onClick={handleSellerClick}
                    className="bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-lg px-10 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                    Satıcı Ol
                </button>
            </div>

            {isAlertVisible === 'deposit' && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 pt-20 ">
                    <div className="bg-purple-700 text-white p-1 rounded-lg w-[65%] text-center shadow-2xl max-[600px]:w-[85%] max-[600px]:p-1 max-[600px]:ml-[20px]">
                        <h3 className="text-xl font-bold mb-1 text-yellow-400 max-[400px]:font-medium">PARA YÜKLE</h3>
                        <h3 className="text-2xl font-bold mb-1 max-[400px]:font-medium">0.00 TL</h3>
                        <p className="mb-2 text-gray-200">Aşağıdaki cüzdan adreslerinden birine yatırım yaptığınızda otomatik hesabınıza eklenir.</p>
                        <h3 className="text-lg text-yellow-400 font-semibold">MİNİMUM YATIRIM 1800.00TL</h3>

                        <div className="mt-2 mb-1">
                            <button onClick={() => handleCurrencySelect('USDT')} className={`w-26 m-1 py-1 px-1 rounded text-white ${selectedCurrency === 'USDT' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>USDT (TRC20)</button>
                            <button onClick={() => handleCurrencySelect('TRON')} className={`w-26 m-1 py-1 px-1 rounded text-white ${selectedCurrency === 'TRON' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>TRON (TRX)</button>
                            <button onClick={() => handleCurrencySelect('LITECOIN')} className={`w-26 m-1 py-1 px-1 rounded text-white ${selectedCurrency === 'LITECOIN' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>LITECOIN (LTC)</button>
                        </div>

                        {selectedCurrency && (
                            <div>
                                <h4 className="text-lg text-gray-200 mb-2">
                                    {selectedCurrency === 'USDT' && 'USDT (TRC20) İçin Cüzdan Adresi'}
                                    {selectedCurrency === 'TRON' && 'TRON (TRX) İçin Cüzdan Adresi'}
                                    {selectedCurrency === 'LITECOIN' && 'LITECOIN (LTC) İçin Cüzdan Adresi'}
                                </h4>
                                <div className="bg-gray-700 text-white p-3 rounded-lg text-center mb-2">
                                    {selectedCurrency === 'USDT' && (
                                        <span>USDT (TRC20): TPdTzQ79Kw8muntQ2CzC8njKvc5QgbgfaS</span>
                                    )}
                                    {selectedCurrency === 'TRON' && (
                                        <span>TRON (TRX): TPdTzQ79Kw8muntQ2CzC8njKvc5QgbgfaS</span>
                                    )}
                                    {selectedCurrency === 'LITECOIN' && (
                                        <span>LITECOIN (LTC): ltc1qhpujmwlkw3cene4km8tdddkr7pvpka2k3lgzn8</span>
                                    )}
                                </div>

                                <button onClick={() => copyToClipboard(walletAddress)} className="ml-3 text-yellow-400">
                                    <FaCopy />
                                </button>
                            </div>
                        )}

                        <button onClick={closeAlert} className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded mt-2">
                            Kapat
                        </button>
                    </div>
                </div>
            )}


            {isAlertVisible === 'withdraw' && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-purple-700 text-white p-6 rounded-lg w-1/3 text-center shadow-2xl max-[600px]:w-[95%] max-[600px]:p-1">
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">PARA ÇEK</h3>
                        <h3 className="text-2xl font-bold mb-6">0.00 TL</h3>
                        <p className="mb-6 text-gray-200">MİNİMUM ÇEKİM 250.00TL</p>
                        <div className="mt-4 mb-6">
                            <button onClick={() => handleCurrencySelect('USDT')} className={`w-24 m-3 py-2 rounded text-white ${selectedCurrency === 'USDT' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>USDT</button>
                            <button onClick={() => handleCurrencySelect('TRON')} className={`w-24 m-3 py-2 rounded text-white ${selectedCurrency === 'TRON' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>TRON</button>
                            <button onClick={() => handleCurrencySelect('LITECOIN')} className={`w-24 m-3 py-2 rounded text-white ${selectedCurrency === 'LITECOIN' ? 'bg-blue-500' : 'bg-purple-600'} hover:bg-purple-500`}>LITECOIN</button>
                        </div>

                        {selectedCurrency && (
                            <div>
                                <label htmlFor="withdrawAddress" className="text-lg text-gray-200 mb-2">Enter Wallet Address for {selectedCurrency}:</label>
                                <div className="flex items-center justify-center">
                                    <input
                                        type="text"
                                        id="withdrawAddress"
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                        className="bg-gray-700 text-white p-3 rounded-lg w-64 text-center"
                                    />
                                    <button onClick={() => copyToClipboard(walletAddress)} className="ml-3 text-yellow-400">
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button onClick={handleWithdraw} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded mt-6">
                            PARA ÇEK
                        </button>
                        <button onClick={closeAlert} className="ml-2 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded mt-6">
                            kapat
                        </button>
                        {insufficientBalance && (
                            <div className="bg-red-500 text-white py-3 mt-4 rounded flex pl-2 max-[600px]:ml-10">
                                <button onClick={closeAlert} >
                                    <FaTimes className="text-2xl cursor-pointer" />
                                </button>
                                <h4 className="text-center pl-2 ">Bakiye Yetersiz, </h4>

                            </div>
                        )}
                    </div>
                </div>
            )}

            {isAlertVisible === 'satıcı ol' && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg- bg-opacity-50 max-[600px]:ml-10">
                    <div className="bg-red-700 text-white p-6 rounded-lg w-1/3 text-center shadow-2xl max-[600px]:w-[95%]">
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">Satıcı Ol Uyarısı</h3>
                        <span className='text-bold cursor-pointer text-xl max-[600px]:text-sm' onClick={handleInfoPage}>
                            Teminat yetersiz,  Lütfen BİLGİLENDİRME sayfasını okuyunuz.
                        </span>
                        <button onClick={closeAlert} className="block mx-auto bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">
                            kapat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepositWithdraw;


