"use client";
import React, { useEffect, useState } from 'react';
import { motion, animate, AnimationPlaybackControls, useMotionValue, useTransform } from 'framer-motion';

interface CounterProps {
  targetNumber: number;
  variant?: 'normal' | 'reverse' | 'random' | 'casino'; 
  speed?: 'slow' | 'normal' | 'fast'; 
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl'; // Tailwind text sizes
  fontSize?: number; // Font size in pixels
  textColor?: string; // Text color (hex, rgb, or named colors)
  fontWeight?: 'font-thin' | 'font-extralight' | 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold' | 'font-black'; // Tailwind font weights
}

const Counter: React.FC<CounterProps> = ({
  targetNumber,
  variant = 'normal',
  speed = 'normal',
  textSize = 'text-6xl', // Default size
  fontSize,
  textColor = 'text-blue-600', // Default color
  fontWeight = 'font-bold' // Default font weight
}) => {
  const [digits, setDigits] = useState<number[]>([]); 
  const count = useMotionValue(variant === 'reverse' ? targetNumber : 0); 
  const rounded = useTransform(count, (value) => Math.floor(value));

  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  const getDuration = () => {
    switch (speed) {
      case 'slow':
        return 7; 
      case 'fast':
        return 1; 
      case 'normal':
      default:
        return 3; 
    }
  };

  const startCasinoEffect = (): (() => void) => {
    const targetDigits = targetNumber.toString().split('').map(Number); 
    const totalDigits = targetDigits.length;

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
      }, 100);

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

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (variant === 'casino') {
      setDigits(new Array(targetNumber.toString().length).fill(0));
      const cleanup = startCasinoEffect();
      return cleanup; 
    } else {
      controls = animate(count, variant === 'reverse' ? 0 : targetNumber, {
        duration: getDuration(),
        onUpdate: (value) => {
          setDigits(value.toString().split('').map(Number));
        },
      });

      return () => {
        controls?.stop();
      };
    }
  }, [targetNumber, variant, speed, count]);

  // Apply dynamic styles
  const textStyle = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
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
