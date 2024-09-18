"use client";
import React, { useEffect, useState } from 'react';
import { motion, animate, AnimationPlaybackControls, useMotionValue} from 'framer-motion';

interface CounterProps {
  targetNumber: number;
  variant?: 'normal' | 'reverse' | 'random' | 'casino';
  speed?: 'slow' | 'normal' | 'fast';
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl'; // Tailwind text sizes
  textColor?: string; // Text color (hex, rgb, or named colors)
  fontWeight?: 'font-thin' | 'font-extralight' | 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold' | 'font-black'; // Tailwind font weights
}

const Counter: React.FC<CounterProps> = ({
  targetNumber,
  variant = 'normal',
  speed = 'normal',
  textSize = 'text-6xl', // Default size
  textColor = 'text-blue-600', // Default color
  fontWeight = 'font-bold' // Default font weight
}) => {
  const [digits, setDigits] = useState<number[]>(Array.from(String(targetNumber), Number)); 
  const count = useMotionValue(variant === 'reverse' ? targetNumber : 0);

  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  const getDuration = () => {
    const speedMap: Record<string, number> = {
      slow: 7,
      normal: 3,
      fast: 1,
    };
    return speedMap[speed] || speedMap.normal;
  };

  const startCasinoEffect = (): (() => void) => {
    const targetDigits = Array.from(String(targetNumber), Number); 
    const digitIntervals: NodeJS.Timeout[] = [];

    targetDigits.forEach((digit, index) => {
      let currentDigit = generateRandomDigit(); 
      const interval = setInterval(() => {
        currentDigit = generateRandomDigit(); 
        setDigits((prevDigits) => {
          const newDigits = [...prevDigits];
          newDigits[index] = currentDigit;
          return newDigits;
        });
      }, 50); 

      setTimeout(() => {
        clearInterval(interval);
        setDigits((prevDigits) => {
          const newDigits = [...prevDigits];
          newDigits[index] = digit; 
          return newDigits;
        });
      }, (index + 1) * 1000); 
      digitIntervals.push(interval);
    });

    return () => {
      digitIntervals.forEach(clearInterval);
    };
  };

  const startRandomEffect = () => {
    const totalDigits = String(targetNumber).length;
    const randomDigits = Array.from({ length: totalDigits }, generateRandomDigit);
    setDigits(randomDigits);
  };

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (variant === 'casino') {
      setDigits(Array.from(String(targetNumber), Number));
      const cleanup = startCasinoEffect();
      return cleanup;
    } else if (variant === 'random') {
      const interval = setInterval(() => {
        startRandomEffect();
      }, 50); // Updated to 50ms for faster updates

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDigits(Array.from(String(targetNumber), Number)); // Show target number after 4 seconds
      }, 4000); // Stop after 4 seconds

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      controls = animate(count, variant === 'reverse' ? 0 : targetNumber, {
        duration: getDuration(),
        onUpdate: (value) => {
          setDigits(Array.from(String(Math.floor(value)), Number));
        },
      });

      return () => {
        controls?.stop();
      };
    }
  }, [targetNumber, variant, speed, count]);

  const textStyle = {
    color: textColor ? textColor : undefined,
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={`mb-8 flex space-x-2 ${textSize} ${fontWeight}`} style={textStyle}>
        {digits.map((digit, index) => (
          <motion.div key={index} className="digit">
            {digit}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
