import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa'; 
import HomeImage from "/src/blogHome.webp";
import { Helmet } from 'react-helmet';

const TypingText = ({ text, tag: Tag }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 50; 

  const typeText = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  };

  useEffect(() => {
    typeText(text);
  }, [text]);

  const MotionTag = motion[Tag];
  return <MotionTag className="text-lg">{displayedText}</MotionTag>;
};

export default function About() {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mx-auto rounded-lg w-full">
      <Helmet>
        <title>About Techie Blog</title>
        <meta name="description" content="Learn about Techie Blog's mission, values, and dedication to providing exceptional service and quality content." />
        <meta name="keywords" content="Techie Blog, about us, mission, values, customer service, tech blog" />
        <meta name="author" content="Your Name or Blog Name" />
      </Helmet>

      <div className='flex w-full max-[860px]:flex-col'>
        <div className='w-1/2 px-20 pt-[30vh] max-[1020px]:px-3 max-[860px]:w-full max-[860px]:px-20 max-[490px]:px-4 max-[860px]:pt-[20vh]'>
          <TypingText text="About Techie Blog" tag="h1" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TypingText text="Welcome to our about page! We are excited to share our mission and values with you." tag="p" />
          </motion.div>

          <p className="mt-4 text-lg">
            We are dedicated to providing the best service to our customers. Our team
            works tirelessly to ensure your satisfaction and deliver exceptional results.
          </p>

          {showMore && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-2 text-lg">
                Our core values include <span className="font-bold">integrity</span>, <span className="font-bold">innovation</span>, and <span className="font-bold">customer focus</span>. We believe
                in building lasting relationships with our clients and delivering value at every
                step of the way.
              </p>
            </motion.div>
          )}

          <motion.button
            onClick={handleToggle}
            className="mt-4 px-6 py-2 font-bold rounded-md shadow-lg transition duration-300 bg-[#85053a] text-white hover:opacity-90 cursor-pointer"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? 'Read Less' : 'Read More'}
          </motion.button>
        </div>
        <div className="w-full lg:w-1/2 p-4 pt-[22vh] flex-justify-center max-[860px]:pt-[5vh]">
          <img src={HomeImage} alt="Techie Blog" className="w-[500px] h-[420px] rounded-lg" />
        </div>
      </div>

      <motion.footer
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p>We love what we do! <FaHeart className="inline text-red-500" /></p>
        <p>Join us in our journey to excellence! <FaStar className="inline text-yellow-500" /></p>
      </motion.footer>
    </div>
  );
}
