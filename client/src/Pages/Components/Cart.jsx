import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");  


  const availableBalance = 0; 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const calculateTotal = () => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.count, 0);
    const commissionFee = 150; 
    const expressFee = expressDelivery ? 100 : 0; 
    return cartTotal + commissionFee + expressFee;
  };

  const handleNextClick = () => {
    if (calculateTotal() > availableBalance) {
      setIsBalanceSufficient(false); 
      setOrderStatus("");  
    } else {
      setIsBalanceSufficient(true);
      setOrderStatus("Siparişiniz İşleniyor..."); 
    }
  };

  return (
    <div className="bg-purple-900 text-center text-white h-[100vh] pt-20">
          <Helmet>
        <title>Cart- harmanım</title>
        <meta name="description" content="Welcome to Techie Blog, where you'll find a variety of articles and tutorials on many topics." />
        <meta name="keywords" content="blog, tech, tutorials, articles, programming" />
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-200">alışveriş sepeti</h2>

      {cart.length === 0 ? (
        <p className="mt-8 text-lg text-gray-400">Sepet Boş</p>
      ) : (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-xl text-gray-800 mx-auto max-w-lg max-[600px]:p-1 max-[600px]:ml-10 max-[600px]:max-w-sm">
          <div>
            {cart.map((item) => (
             <div key={item.id} className="flex justify-between items-center border-b py-4">
             <div className="flex flex-col">
               <span>{item.name}</span>
               <span className="text-sm text-gray-500">{item.count} adet</span>
             </div>
             <span className="font-bold text-gray-900">{(item.price * item.count).toFixed(2)} TL</span>
           </div>
           
            ))}
          </div>

          <div className="mt-4 text-lg font-semibold">
            <span>Komisyon Ücreti:</span> <span>150.00 TL</span>
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <input
              type="checkbox"
              checked={expressDelivery}
              onChange={() => setExpressDelivery(!expressDelivery)}
              className="h-5 w-5"
            />
            <label className="text-sm text-gray-700">Acil Teslimat (Express Delivery) - 100.00 TL</label>
          </div>

          <div className="mt-6 text-2xl font-bold text-blue-600">
            Total: {calculateTotal().toFixed(2)} TL
          </div>

          <div className="mt-8">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-md transition-transform hover:scale-105 active:scale-100"
              onClick={handleNextClick}
            >
              İleri
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-600">
            Seçtiğiniz ürün veya ürünlerin şehrinizde mevcut olup olmadığını kontrol etmek için
            Sipariş vermeden BİLGİLENDİRME sayfasını mutlaka okuyunuz!
          </div>

          {!isBalanceSufficient && (
            <div className="mt-4 text-red-500 font-semibold">
              Bakiye Yetersiz
            </div>
          )}

          {orderStatus && (
            <div className="mt-4 text-green-500 font-semibold">
              {orderStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

