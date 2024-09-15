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
  duration = 0.25,
}) => {
  const STAGGER = 0.025;

  const getVersionStyles = () => {
    switch (version) {
      case 'underline':
        return `bg-transparent text-${textColor} underline border-none`;
      case 'border':
        return `bg-transparent text-${textColor} border border-[${borderColor}]`;
      case 'red':
        return `bg-red-600 text-${textColor} border border-red-600`;
      case 'funky':
        return `bg-[${backgroundColor}] text-${textColor} rounded-full`;
      default:
        return `bg-[${backgroundColor}] text-${textColor}`;
    }
  };

  return (
    <div className="group relative inline-block">
      <motion.div
        className={` group cursor-pointer relative hover:bg-[#1e1e20]  transition-colors duration-150 ease-in-out py-2 px-4 ${version === 'funky' ? 'rounded-full' : 'rounded-[7px]'} h-[36px] flex justify-center items-center overflow-hidden z-10 ${getVersionStyles()}`}
        whileHover={shadowEffect ? { x: -5, y: -5 } : undefined}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {rolling ? (
          <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden whitespace-nowrap text-[${textSize}] font-semibold`}
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
          <h1 className={`text-[${textSize}] group-hover:text-[#E4E4E7] leading-5 font-semibold relative`}>
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
          className={`absolute top-0 left-0 w-full h-full bg-[${backgroundColor}] ${version === 'funky' ? 'rounded-full' : 'rounded-[7px]'} z-0`}
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default Button;