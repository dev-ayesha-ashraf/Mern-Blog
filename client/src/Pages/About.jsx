import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa'; // Example icons

const TypingText = ({ text, tag: Tag }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 50; // Speed of typing in milliseconds

  const typeText = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        // Optionally add delete effect here
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
    <div className="max-w-4xl mx-auto pt-[30vh] rounded-lg">
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
            Our story began years ago with a simple idea. Since then, we have grown and
            evolved into a trusted provider in our field. We look forward to continuing
            to serve you and exceed your expectations.
          </p>
          <p className="mt-2 text-lg">
            Our core values include <span className="font-bold">integrity</span>, <span className="font-bold">innovation</span>, and <span className="font-bold">customer focus</span>. We believe
            in building lasting relationships with our clients and delivering value at every
            step of the way.
          </p>
        </motion.div>
      )}

      <motion.button
        onClick={handleToggle}
        className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-200"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showMore ? 'Read Less' : 'Read More'}
      </motion.button>

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
