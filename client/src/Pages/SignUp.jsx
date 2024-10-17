import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import registerImage from "/src/register.avif"
import googleIcon from "/src/googleIcon.webp"

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-yellow-400 p-4">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={registerImage} // Replace with your image path
          alt="Signup"
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Create an Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-400 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        
        <div className="text-center mt-4">
          <span className="text-gray-600">Or continue with</span>
          <button className="mt-2 w-full py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition duration-300">
            <img src={googleIcon} alt="Google" className="inline-block h-5 w-5 mr-2" />
            Google
          </button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account? <a href="/login" className="text-orange-500 font-semibold">Log In</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
