"use client";
import React, { useEffect, useState } from 'react';
import { motion, animate, AnimationPlaybackControls, useMotionValue, useTransform } from 'framer-motion';

interface CounterProps {
  targetNumber: number;
  variant?: 'normal' | 'reverse' | 'random' | 'casino'; // Add casino variant
  speed?: 'slow' | 'normal' | 'fast'; // Add speed variants
}

const Counter: React.FC<CounterProps> = ({ targetNumber, variant = 'normal', speed = 'normal' }) => {
  const [digits, setDigits] = useState<number[]>([]); // Store each digit separately
  const count = useMotionValue(variant === 'reverse' ? targetNumber : 0); // Start at targetNumber if reverse

  // Create a formatted number animation from 0 to targetNumber
  const rounded = useTransform(count, (value) => Math.floor(value));

  // Helper function to generate a random number for a single digit
  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  // Set animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow':
        return 7; // Slower animation
      case 'fast':
        return 1; // Faster animation
      case 'normal':
      default:
        return 3; // Default duration for normal speed
    }
  };

  // Animation logic for casino variant
  const startCasinoEffect = (): (() => void) => {
    const targetDigits = targetNumber.toString().split('').map(Number); // Split the target number into digits
    const totalDigits = targetDigits.length;

    const digitIntervals: NodeJS.Timeout[] = [];

    // For each digit, create a random animation that stops sequentially
    targetDigits.forEach((digit, index) => {
      let currentDigit = generateRandomDigit(); // Start with a random digit
      const interval = setInterval(() => {
        currentDigit = generateRandomDigit(); // Keep showing random digits
        setDigits((prevDigits) => {
          const newDigits = [...prevDigits];
          newDigits[index] = currentDigit;
          return newDigits;
        });
      }, 100); // Update random digit every 100ms

      // Stop the animation for the current digit after some delay, in sequence
      setTimeout(() => {
        clearInterval(interval); // Stop updating the current digit
        setDigits((prevDigits) => {
          const newDigits = [...prevDigits];
          newDigits[index] = digit; // Set the final digit
          return newDigits;
        });
      }, (index + 1) * 1000); // Sequential stopping with 1s delay between each digit
      digitIntervals.push(interval);
    });

    // Cleanup all intervals when the component unmounts
    return () => {
      digitIntervals.forEach(clearInterval);
    };
  };

  // Handle different variants
  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (variant === 'casino') {
      // Initialize digits with the same length as targetNumber, but filled with 0
      setDigits(new Array(targetNumber.toString().length).fill(0));
      // Start the casino effect
      const cleanup = startCasinoEffect();
      return cleanup; // Cleanup on unmount
    } else {
      // Handle other cases (normal, reverse, random)
      controls = animate(count, variant === 'reverse' ? 0 : targetNumber, {
        duration: getDuration(),
        onUpdate: (value) => {
          setDigits(value.toString().split('').map(Number));
        },
      });

      return () => {
        controls?.stop(); // Cleanup on unmount
      };
    }
  }, [targetNumber, variant, speed, count]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold text-blue-600 mb-8 flex space-x-2">
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
