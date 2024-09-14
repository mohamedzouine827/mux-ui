import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  lightEffect?: boolean;
  shadowEffect?: boolean;
  rollign?: boolean;
  version?: 'default' | 'underline' | 'border' | 'red'; // New version prop
}

const Button: React.FC<ButtonProps> = ({
  lightEffect = false,
  shadowEffect = false,
  version = 'default',
  rollign = true,
}) => {
  // Function to return styles based on version prop
  const getVersionStyles = () => {
    switch (version) {
      case 'underline':
        return 'bg-transparent text-black underline border-none';
      case 'border':
        return 'bg-transparent text-black border border-[#09090B]';
      case 'red':
        return 'bg-red-600 text-white border border-red-600';
      default: // 'default' version
        return 'bg-[#09090B] text-white';
    }
  };

  return (
    <div className="group relative inline-block">
      {/* Button */}
      <motion.div
        className={`cursor-pointer relative py-2 px-4 rounded-[7px] h-[36px] flex justify-center items-center overflow-hidden z-10 ${getVersionStyles()}`} // Dynamically apply version-based styles
        whileHover={shadowEffect ? { x: -5, y: -5 } : undefined} // Move only if shadowEffect is true
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Text inside the button */}
        {
            rollign ? (
                <div className=''>
                    hello
                </div>
            ) : 
            (
                <h1 className={`text-[14px] leading-5 font-semibold ${version === 'underline' ? 'text-black' : ''} relative`}>
          continue
        </h1>
            )
        }

        {/* Light Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          initial={{ x: '-100%' }}
          animate={lightEffect ? { x: '100%' } : undefined}
          whileHover={{ x: '100%' }} // Moves the gradient on hover
          transition={{
            repeat: lightEffect ? Infinity : 0, // Infinite loop if `lightEffect` is true
            duration: 1,
            ease: 'easeInOut',
            repeatDelay: 2, // Repeat every 3 seconds (1s duration + 2s delay)
          }}
        />
      </motion.div>

      {/* Shadow effect */}
      {shadowEffect && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[#09090B] rounded-[7px] z-0" // Behind the button
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileHover={{ opacity: 1 }} // Shadow appears on hover
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default Button;
