import React, { useState } from 'react';
import { motion } from 'framer-motion';
import registerImage from "/src/register.avif"
import googleIcon from "/src/googleIcon.webp"
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'flowbite-react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please Fill Out All The Fields.')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.error || 'An unknown error occurred.');
        return;
      }
      else{
        navigate('/sign-in')
      }
      const responseData = await res.json();
      console.log('Signup successful');
      setLoading(false);

    } catch (error) {
      setErrorMessage(error.message);
    }
    finally {
      setLoading(false); // Ensure loader stops in all cases
    }
  };




  return (
    <div className="relative grid items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-yellow-400 p-4">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={registerImage}
          alt="Signup"
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Create an Account</h2>
        {errorMessage && (
          <div className="flex items-center bg-orange-500 text-white text-sm font-bold px-4 py-3 rounded shadow-md my-4" role="alert">
            <svg className="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l7.451 13.251c.717 1.277-.181 2.799-1.723 2.799H2.529c-1.543 0-2.44-1.522-1.723-2.799l7.451-13.251zM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-.993.883L9 6v4a1 1 0 0 0 1.993.117L11 10V6a1 1 0 0 0-1-1z" />
            </svg>
            <p>{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            id='username'
            placeholder="Username"
            onChange={handleChange}
            // required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="email"
            id='email'
            placeholder="Email"
            onChange={handleChange}
            // required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="password"
            id='password'
            placeholder="Password"

            onChange={handleChange}
            // required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-400 transition duration-300"
          >
            {
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>

              ) : 'Sign Up'
            }
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
            Already have an account? <a href="/sign-in" className="text-orange-500 font-semibold">Log In</a>
          </p>
        </div>
      </motion.div>
      <div>


      </div>
    </div>

  );
}
