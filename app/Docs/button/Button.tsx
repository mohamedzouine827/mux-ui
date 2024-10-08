import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  lightEffect?: boolean;
  shadowEffect?: boolean;
  rolling?: boolean;
  version?: 'default' | 'underline' | 'border' | 'red' | 'funky';
  textSize?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  duration?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  lightEffect = false,
  shadowEffect = false,
  version = 'default',
  rolling = false,
  textSize = '14px',
  textColor = 'white',
  borderColor = '#ffffff',
  backgroundColor = '#09090B',
  hoverBackgroundColor = '#2D2D30',
  duration = 0.25,
}) => {
  const STAGGER = 0.025;

  const getVersionStyles = () => {
    switch (version) {
      case 'underline':
        return `underline border-none`;
      case 'border':
        return `border border-[${borderColor}]`;
      case 'red':
        return `bg-red-600 border border-red-600`;
      case 'funky':
        return `rounded-full`;
      default:
        return '';
    }
  };

  const buttonStyle = {
    color: textColor,
    fontSize: textSize,
  };

  const buttonVariants = {
    initial: (version === 'default' || version==='funky') ? { backgroundColor } : {},
    hover: version === 'default' ? { 
      backgroundColor: hoverBackgroundColor,
      ...(shadowEffect ? { x: -5, y: -5 } : {})
    } : {},
  };


  return (
    <div className="group relative inline-block">
      <motion.div
        className={`cursor-pointer relative py-2 px-4 ${version === 'funky' ? 'rounded-full' : 'rounded-[7px]'} h-[36px] flex justify-center items-center overflow-hidden z-10 ${getVersionStyles()}`}
        style={buttonStyle}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        animate="initial"
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} // Using easeInOutQuad for smoother transition
      >
        {rolling ? (
          <motion.div
            initial="initial"
            whileHover="hovered"
            className="relative block overflow-hidden whitespace-nowrap font-semibold"
          >
            <div>
              {(children as string).split("").map((l, i) => (
                <motion.span
                  variants={{
                    initial: { y: 0 },
                    hovered: { y: "-100%" },
                  }}
                  transition={{
                    duration: duration,
                    ease: "easeInOut",
                    delay: STAGGER * i,
                  }}
                  className="inline-block group-hover:text-[#E4E4E7]"
                  key={i}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="absolute inset-0 group-hover:text-[#E4E4E7]">
              {(children as string).split("").map((l, i) => (
                <motion.span
                  variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
                  }}
                  transition={{
                    duration: duration,
                    ease: "easeInOut",
                    delay: STAGGER * i,
                  }}
                  className="inline-block"
                  key={i}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <h1 className="group-hover:text-[#E4E4E7] leading-5 font-semibold relative">
            {children}
          </h1>
        )}

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          initial={{ x: '-100%' }}
          animate={lightEffect ? { x: '100%' } : undefined}
          whileHover={{ x: '100%' }}
          transition={{
            repeat: lightEffect ? Infinity : 0,
            duration: 1,
            ease: 'easeInOut',
            repeatDelay: 2,
          }}
        />
      </motion.div>

      {shadowEffect && (
        <motion.div
          className="absolute inset-0 rounded-[7px]"
          style={{ backgroundColor }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileHover={{ opacity: 1, x: 5, y: 5 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </div>
  );
};

export default Button;