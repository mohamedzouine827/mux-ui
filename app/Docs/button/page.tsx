"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';
import { motion } from 'framer-motion';
import Badge from '../badge/Badge';
import Button from './Button';

const Page: React.FC = () => {
    const [showCodeStates, setShowCodeStates] = useState({
        preview: false,
        example1: false,
        example2: false
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
    <div className={\`inline-block \${hovered ? 'hover:-translate-y-1' : ''} transition-transform duration-300\`}>
      <button
        className={\`
          relative
          px-[10px] py-[2px] 
          rounded-full 
          text-[12px] leading-[16px] font-semibold
          transition-all duration-300 ease-in-out
          overflow-hidden
        \`}
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
              backgroundImage: \`linear-gradient(to right, transparent, \${lightColorValue}, transparent)\`,
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
`.trim();

    const buttonCodeExample1 = `
<Badge hovered={true}>Hello</Badge>
    `.trim();

    const buttonCodeExample2 = `
<Badge hovered={true} animated={true}>Hello</Badge>
    `.trim();

    const renderSection = (section: keyof typeof showCodeStates, title: string, description: string) => {
        let buttonCode;
        switch (section) {
            case 'example1':
                buttonCode = buttonCodeExample1;
                break;
            case 'example2':
                buttonCode = buttonCodeExample2;
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
                            <div className="flex flex-col items-center justify-center min-h-full space-y-4">
                                <Button version="border" shadowEffect={true} />
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
                    <h1 className="text-[32px] font-semibold text-white">Button</h1>
                    <p className="text-lg text-zinc-300 font-medium">Displays a button or a component that looks like a button.</p>
                </header>

                {renderSection('preview', 'Preview', "Here's a preview of Badge components with a code.")}
                {renderSection('example1', 'Examples', "Examples of the Badge Components that you might use")}
                {renderSection('example2', 'Animated Example', "An example of an animated Badge component")}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Props</h2>
                    <p className="text-lg text-zinc-300"></p>
                    <div>
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
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>Children</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The text that will shows up</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>TextColor</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Color of the text</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>bgColor</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Color of the background</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>hovered</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The badge goes up if you hover on it</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>animated</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">If you want the light to be animated or not</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>lightDuration</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Number</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The duration of the light</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>lightOpacity</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Number</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The percentage of the light</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>lightColor</Badge></td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                    <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The color of the light</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Page;