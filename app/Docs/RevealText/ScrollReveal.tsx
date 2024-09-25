"use client";

import React, { FC, ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RevealMode = 'GrayReveal' | 'ShadowReveal';

interface ScrollRevealProps {
  text: string;
  mode: RevealMode;
  className?: string;
  height?: string;
  width?: string;
}

const ScrollReveal: FC<ScrollRevealProps> = ({ 
  text, 
  mode, 
  className, 
  height = "300px", 
  width = "100%" 
}) => {
  const words = text.split(" ");
  const containerClass = className || 'text-4xl font-bold text-black';
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        const scrollRange = scrollHeight - clientHeight;
        setScrollRange({ start: 0, end: scrollRange });
      }
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-0 overflow-auto ${containerClass}`}
      style={{ height, width }}
    >
      <div className="sticky top-0 flex max-w-4xl items-center bg-transparent">
        <p className="flex flex-wrap text-2xl text-black/20 dark:text-white/20">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                mode={mode}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
      <div style={{ height: "200%" }}></div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
  mode: RevealMode;
}

const Word: FC<WordProps> = ({ children, progress, range, mode }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const baseOpacity = mode === 'GrayReveal' ? 0.25 : 0;

  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span
        className="absolute"
        style={{ opacity: baseOpacity, color: mode === 'GrayReveal' ? 'gray' : 'black' }}
      >
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className="text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default ScrollReveal;