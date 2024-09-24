"use client";

import React, { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RevealMode = 'GrayReveal' | 'ShadowReveal';

interface ScrollRevealProps {
  text: string;
  mode: RevealMode;
  className?: string;
  marginTop?: string;  // User can control margin-top
  marginBottom?: string;  // User can control margin-bottom
}

const ScrollReveal: FC<ScrollRevealProps> = ({ text, mode, className, marginTop = "0px", marginBottom = "0px" }) => {
  const words = text.split(" ");
  const containerClass = className || 'text-4xl font-bold text-black';
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Get the scroll progress based on the target reference
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <div
      ref={targetRef}
      className={`relative z-0 h-[200vh] ${containerClass}`}
      style={{ marginTop, marginBottom }}  // Apply user-defined margin
    >
      <div className="sticky top-0  flex  max-w-4xl items-center bg-transparent ">
        <p className="flex flex-wrap text-2xl text-black/20 dark:text-white/20">
          {words.map((word, i) => {
            // Calculate the reveal timing for each word
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
  // Animate opacity based on scroll progress
  const opacity = useTransform(progress, range, [0, 1]);

  // Define base opacity for the background effect (GrayReveal or ShadowReveal)
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
