import React, { useState } from 'react';
import { motion } from 'framer-motion';
import registerImage from "/src/register.avif"
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Oauth from './Components/Oauth';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please Fill Out All The Fields'))
    }
    try {
      dispatch(signInSuccess());
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(responseData.message))
      }
      else {
        dispatch(signInSuccess(responseData))
        navigate('/');
        console.log('Login successful');
      }

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };





  return (
    <div className="relative grid items-center justify-center min-h-screen  pt-[15vh]">
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
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Log In</h2>
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

              ) : 'Log In'
            }
          </button>
        </form>

        <div className="text-center mt-4">
          <Oauth />
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account? <a href="/sign-up" className="text-orange-500 font-semibold">Sign Up</a>
          </p>
        </div>
      </motion.div>
      <div>


      </div>
    </div>

  );
}
