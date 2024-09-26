"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, FC } from 'react';

// Define the props type for the TextFlipper component
interface TextFlipperProps {
  words: string[];
  staticText: string;
  animatedClassName: string;
  staticClassName: string;
}

const TextFlipper: FC<TextFlipperProps> = ({ words, staticText, animatedClassName, staticClassName }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  const slideVariants = {
    enter: {
      y: '100%',  // New word enters from below
      opacity: 0,
    },
    center: {
      y: 0,      // Word is centered
      opacity: 1,
    },
    exit: {
      y: '-100%', // Old word exits upwards
      opacity: 0,
    },
  };

  return (
    <div className="flex items-center text-xl leading-normal">
  <span className={staticClassName}>{staticText}</span>
  <div className="w-32 h-10 overflow-hidden relative ml-2 flex items-center">
    <AnimatePresence initial={false}>
      <motion.div
        key={index}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={`${animatedClassName} flex items-center`}
        style={{
          position: 'absolute',
        }}
      >
        {words[index]}
      </motion.div>
    </AnimatePresence>
  </div>
</div>
  );
};

export default TextFlipper;