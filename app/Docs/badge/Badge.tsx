import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  hovered?: boolean;
  animated?: boolean;
  lightDuration?: number;
  lightOpacity?: string;
  lightColor?: string;
}

const tailwindColors: { [key: string]: string } = {
  'zinc-400': '#a1a1aa',
  'zinc-600': '#52525b',
  // Add more color mappings as needed
};

export default function Badge({
  children,
  textColor = 'white',
  bgColor = 'zinc-600',
  hovered = false,
  animated = false,
  lightDuration = 1,
  lightOpacity = '30',
  lightColor = "white"
}: BadgeProps) {
  const getColor = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }
    return tailwindColors[color] || color;
  };

  const bgColorValue = getColor(bgColor);
  const textColorValue = getColor(textColor);
  const lightColorValue = getColor(lightColor);

  return (
    <div className={`inline-block ${hovered ? 'hover:-translate-y-1' : ''} transition-transform duration-300`}>
      <button
        className={`
          relative
          px-[10px] py-[2px] 
          rounded-full 
          text-[12px] leading-[16px] font-semibold
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
        style={{
          backgroundColor: bgColorValue,
          color: textColorValue,
        }}
      >
        {children}
        {animated && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${lightColorValue}, transparent)`,
              opacity: parseInt(lightOpacity) / 100,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: lightDuration,
              ease: 'linear',
              repeatDelay: 4
            }}
          />
        )}
      </button>
    </div>
  );
}