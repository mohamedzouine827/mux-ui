"use client";
import React, { useState } from 'react';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';

import Badge from '../badge/Badge';
import SplitText from './SplitText';


const Page: React.FC = () => {
  const [showCodeStates, setShowCodeStates] = useState({
    preview: false,
    example1: false,
    example2: false,
    Random: false,
  });
  const [copied, setCopied] = useState(false);

  const toggleCodeView = (section: keyof typeof showCodeStates) => {
    setShowCodeStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(buttonCodePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const buttonCodePreview = `
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
      <div className={\`mb-8 flex space-x-2 \${textSize} \${fontWeight}\`} style={textStyle}>
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
`.trim();



  


  const renderSection = (section: keyof typeof showCodeStates, title: string, description: string) => {
    let buttonCode;
    switch (section) {

      default:
        buttonCode = buttonCodePreview;
    }

    return (
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="text-lg text-zinc-300">{description}</p>
        </div>
        <div className="space-y-6">
          <div className="flex flex-row justify-between border-b border-zinc-700">
            <div className='flex flex-row gap-8'>
              <button
                className={`text-base pb-2 ${!showCodeStates[section] ? 'text-zinc-300 border-b-2 border-zinc-300' : 'text-zinc-300'}`}
                onClick={() => toggleCodeView(section)}
              >
                Preview
              </button>
              <button
                className={`text-base pb-2 ${showCodeStates[section] ? 'text-zinc-300 border-b-2 border-zinc-300' : 'text-zinc-300'}`}
                onClick={() => toggleCodeView(section)}
              >
                Code
              </button>
            </div>
            {section === "preview" && (
              <div
                className='text-white flex flex-row gap-1 bg-[#666565] w-8 h-8 items-center justify-center rounded-[4px] cursor-pointer'
                onClick={copyToClipboard}
              >
                {copied ? (
                  <span>✓</span>
                ) : (
                  <Copy />
                )}
              </div>
            )}
          </div>

          <div className="p-6 max-h-[350px] bg-white bg-opacity-10 rounded-xl border border-zinc-700 backdrop-filter backdrop-blur-lg overflow-auto">
            {showCodeStates[section] ? (
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  padding: '0',
                  margin: '0',
                }}
                codeTagProps={{
                  style: {
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }
                }}
              >
                {buttonCode}
              </SyntaxHighlighter>
            ) : (
              <div className="flex flex-col items-center min-h-56 justify-center space-y-4">
                Hover on <SplitText text='Mohamed Zouine' className='text-4xl font-bold text-white'/>
              </div>
            )}
          </div>
        </div>

      </section>
    );
  };

  return (
    <Layout>
      <div className="mx-auto px-14 py-12 space-y-8 max-w-4xl">
        <header className="space-y-3">
          <h1 className="text-[32px] font-semibold text-white">Split Text</h1>
          <p className="text-lg text-zinc-300 font-medium">Displays a text that split when you hover on it.</p>
        </header>

        {renderSection('preview', 'Preview', "Here's a preview of Split Text components with a code.")}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Props</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left text-base text-white font-semibold border border-gray-300">Prop</th>
                <th className="px-4 py-2 text-left text-zinc-300 font-semibold border border-gray-300">Type</th>
                <th className="px-4 py-2 text-left text-zinc-300 font-semibold border border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>text</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The text that you want to display</td>
              </tr>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>ClassName</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The tailwind classname of the text</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
