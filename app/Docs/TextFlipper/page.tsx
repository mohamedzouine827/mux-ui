"use client";
import React, { useState } from 'react';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';

import Badge from '../badge/Badge';
import TextFlipper from './TextFlipper';


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
"use client"
import React, { useState, useMemo, FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props type for the TextFlipper component
interface TextFlipperProps {
  words: string[];
  staticText: string;
  animatedClassName: string;
  staticClassName: string;
}

const TextFlipper: FC<TextFlipperProps> = ({ words, staticText, animatedClassName, staticClassName }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  const slideVariants = {
    enter: {
      y: '100%',  // New word enters from below
      opacity: 0,
    },
    center: {
      y: 0,      // Word is centered
      opacity: 1,
    },
    exit: {
      y: '-100%', // Old word exits upwards
      opacity: 0,
    },
  };

  return (
    <div className="flex items-center text-xl leading-normal">
      <span className={staticClassName}>{staticText}</span>
      <div className="w-32 h-10 overflow-hidden relative ml-2 flex items-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className={\`\${animatedClassName} flex items-center\`}
            style={{
              position: 'absolute',
            }}
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface SplitTextProps {
  text: string;
  className?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ text, className = '' }) => {
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
      ? \`translate(\${letterOffsets[index].direction[0] * letterOffsets[index].offset}px, 
                   \${letterOffsets[index].direction[1] * letterOffsets[index].offset}px) 
         rotate(\${letterOffsets[index].rotation}deg)\`
      : 'none',
    position: 'relative',
    zIndex: isHovered && text[index] !== ' ' ? 1 : 'auto',
    whiteSpace: 'pre',  // This preserves spaces
  });

  return (
    <div 
      className={\`\${className || 'text-4xl font-bold '}\`}
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

export default SplitText;
`.trim();


    const code1 = `<TextFlipper words={["Mux", "UI", "Design", "Figma", "Web"]} staticText="Fun is" 
    animatedClassName="font-bold text-white" 
    staticClassName="font-bold text-gray-500"/>`.trim();




    const renderSection = (section: keyof typeof showCodeStates, title: string, description: string) => {
        let buttonCode;
        switch (section) {
            case ("Random"):
                buttonCode = code1;
                break;
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
                                <TextFlipper
                                    words={["Mux", "UI", "Design", "Figma", "Web"]} staticText="Fun is" animatedClassName="font-bold text-white" staticClassName="font-bold text-gray-500"
                                />
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
                    <h1 className="text-[32px] font-semibold text-white">Text Flipper</h1>
                    <p className="text-lg text-zinc-300 font-medium">Displays a text that flipper automaticaly.</p>
                </header>

                {renderSection('preview', 'Preview', "Here's a preview of Text Flipper components with a code.")}
                {renderSection('Random', 'Example', "Here's a example of Text Flipper components with a code.")}
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
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>words</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String : Array</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The words you wanted to be animated</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>staticText</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The Text you want it to be static</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>animatedClassName</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The tailwind Class of styling the words</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>staticClassName</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The tailwind Class of styling the the static text</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
