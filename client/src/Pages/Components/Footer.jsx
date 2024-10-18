import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bottom-0 text-black py-4 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* About Section */}
        {/* <div>
          <h2 className="text-lg font-bold text-orange-500 mb-2">About Us</h2>
          <p className="text-sm text-black">
            We are a dynamic company dedicated to providing the best products and services. Our focus is on quality, innovation, and customer satisfaction.
          </p>
        </div> */}
        
        {/* Navigation Links */}
        {/* <div>
          <h2 className="text-lg font-bold text-orange-500 mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline hover:text-orange-400">Home</a></li>
            <li><a href="#" className="hover:underline hover:text-orange-400">About</a></li>
            <li><a href="#" className="hover:underline hover:text-orange-400">Services</a></li>
            <li><a href="#" className="hover:underline hover:text-orange-400">Contact</a></li>
            <li><a href="#" className="hover:underline hover:text-orange-400">Blog</a></li>
          </ul>
        </div> */}

        {/* Contact Information */}
        {/* <div>
          <h2 className="text-lg font-bold text-orange-500 mb-2">Contact Us</h2>
          <p className="text-sm">
            1234 Green Street,<br />
            Yellow City, OR 56789<br />
            Phone: (123) 456-7890<br />
            Email: info@example.com
          </p>
        </div> */}
      </div>

      <div className="border-t border-white mt-4 pt-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <a href="#" className="text-orange-500 hover:text-orange-400">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-400">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-400">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-400">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-400">
              <FaYoutube size={16} />
            </a>
          </div>

          {/* Newsletter Subscription */}
          <form className="w-full md:w-1/2 flex mt-2 md:mt-0">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="w-full px-3 py-1 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="px-4 py-1 bg-orange-500 text-white rounded-r-md hover:bg-orange-400 transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-yellow-400 py-2 mt-3">
        <p className="text-center text-gray-800 text-xs">
          &copy; 2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
