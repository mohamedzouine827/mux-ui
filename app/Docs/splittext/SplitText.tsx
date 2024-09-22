"use client"
import React, { useState, useMemo } from 'react';

interface HoverTextEffectProps {
  text: string;
  className?: string;
}

const HoverTextEffect: React.FC<HoverTextEffectProps> = ({ text, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRandomOffset = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const getRandomDirection = (): [number, number] => {
    const directions: [number, number][] = [
      [-1, -1], [1, 1], [-1, 1], [1, -1]  // top-left, bottom-right, top-right, bottom-left
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const letterOffsets = useMemo(() => {
    return text.split('').map((char) => ({
      direction: char !== ' ' ? getRandomDirection() : [0, 0],
      offset: char !== ' ' ? getRandomOffset(20, 50) : 0,
      rotation: char !== ' ' ? getRandomOffset(-25, 25) : 0,
    }));
  }, [text]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const letterStyle = (index: number): React.CSSProperties => ({
    display: 'inline-block',
    transition: 'transform 0.5s ease',
    transform: isHovered && text[index] !== ' '
      ? `translate(${letterOffsets[index].direction[0] * letterOffsets[index].offset}px, 
                   ${letterOffsets[index].direction[1] * letterOffsets[index].offset}px) 
         rotate(${letterOffsets[index].rotation}deg)`
      : 'none',
    position: 'relative',
    zIndex: isHovered && text[index] !== ' ' ? 1 : 'auto',
    whiteSpace: 'pre',  // This preserves spaces
  });

  return (
    <div 
      className={`${className || 'text-4xl font-bold '}`}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, index) => (
        <span key={index} style={letterStyle(index)}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default HoverTextEffect;