import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PostCard({ post }) {
  const [cart, setCart] = useState([]);
const products = Array.from({ length: 6 }).map((_, index) => ({
  id: `${post.slug}-${index}`, // Make `id` unique using the `post.slug`
  name: `${post.title} `,
  price: post.content,
}));

  const [cartCounts, setCartCounts] = useState(Array(products.length).fill(0));

  const handleAddToCart = (product, count) => {
    if (count <= 0) return;
  
    // Retrieve the current cart from localStorage (if it exists)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the product already exists in the cart
    const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);
  
    if (existingItemIndex >= 0) {
      // Update the count of the existing item
      currentCart[existingItemIndex].count += count;
    } else {
      // Add new product to the cart
      currentCart.push({ ...product, count });
    }
  
    // Update both state and localStorage
    setCart(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };
  
  
  return (
    <div className='group relative w-full max-[700px]:mx-2 border border-black hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[400px] md:w-[350px]'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[220px] w-full z-20'
        />
      </Link>
      <p className='text-lg font-semibold text-[#ffff] pl-2'>{post.title}</p>
      <p className='text-lg font-semibold text-[#ffff] pl-2'>{post.content} ₺ </p>
      {products.map((product, index) => (
        <div key={product.id} className="rounded-lg shadow-lg text-center">
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="p-2">
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg m-1 text-[#ffff]"
                onClick={() =>
                  setCartCounts((counts) => counts.map((count, i) => (i === index && count > 0 ? count - 1 : count)))
                }
              >
                -
              </button>
              <span className="text-lg m-1 text-[#ffff]">{cartCounts[index]}</span>
              <button
                className="m-1 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-[#ffff]"
                onClick={() =>
                  setCartCounts((counts) => counts.map((count, i) => (i === index ? count + 1 : count)))
                }
              >
                +
              </button>
            </div>

            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-[#ffff]"
              onClick={() => handleAddToCart(product, cartCounts[index])}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      ))}
      <div className='p-3 flex flex-col'></div>
    </div>
  );
}
