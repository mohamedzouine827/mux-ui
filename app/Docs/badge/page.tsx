"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';
import { motion } from 'framer-motion';
import Badge from './Badge';



const Page: React.FC = () => {
    const [showCode, setShowCode] = useState(false);

    const buttonCode = `
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
  return (
    <div className={\`inline-block \${hovered ? 'hover:-translate-y-1' : ''} transition-transform duration-300\`}>
      <button
        className={\`
          relative
          px-[10px] py-[2px] 
          bg-\${bgColor} text-\${textColor}
          rounded-full 
          text-[12px] leading-[16px] font-semibold
          transition-all duration-300 ease-in-out
          overflow-hidden
        \`}
      >
        {children}
        {animated && (
          <motion.div
            className={\`
              absolute inset-0 
              bg-gradient-to-r from-transparent via-\${lightColor} to-transparent
              opacity-\${lightOpacity}
            \`}
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

// Usage example:
<Badge 
  textColor="white"
  bgColor="blue-500"
  hovered={true}
  animated={true}
  lightDuration={7}
  lightOpacity="100"
  lightColor="yellow"
>
  Hello
</Badge>
    `.trim();

    return (
        <Layout>
            <div className="mx-auto p-12 space-y-8">
                <header className="space-y-3">
                    <h1 className="text-[32px] font-semibold text-white">Badge</h1>
                    <p className="text-lg text-zinc-300 font-medium">Displays a badge or a component that looks like a badge.</p>
                </header>

                <section className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Preview</h2>
                        <p className="text-lg text-zinc-300">Here's a preview of Badge components with a code.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-row justify-between border-b border-zinc-700">
                            <div className='flex flex-row gap-8'>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300' : 'text-zinc-300 border-b-2 border-zinc-300'}`}
                                    onClick={() => setShowCode(false)}
                                >
                                    Preview
                                </button>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300 border-b-2 border-zinc-300' : 'text-zinc-300'}`}
                                    onClick={() => setShowCode(true)}
                                >
                                    Code
                                </button>
                            </div>
                            <div className='text-white flex flex-row gap-1 bg-[#666565] w-8 h-8 items-center justify-center rounded-[4px]'>
                                <Copy />
                            </div>
                        </div>

                        <div className="p-6 h-[350px] bg-white bg-opacity-10 rounded-xl border border-zinc-700 backdrop-filter backdrop-blur-lg overflow-auto">
                            {showCode ? (
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
                                <div className="flex justify-center items-center h-full">
                                    <Badge  >Hello</Badge>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Examples</h2>
                        <p className="text-lg text-zinc-300">Examples of the Badge Components that you might use</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-row justify-between border-b border-zinc-700">
                            <div className='flex flex-row gap-8'>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300' : 'text-zinc-300 border-b-2 border-zinc-300'}`}
                                    onClick={() => setShowCode(false)}
                                >
                                    Preview
                                </button>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300 border-b-2 border-zinc-300' : 'text-zinc-300'}`}
                                    onClick={() => setShowCode(true)}
                                >
                                    Code
                                </button>
                            </div>
                            <div className='text-white flex flex-row gap-1 bg-[#666565] w-8 h-8 items-center justify-center rounded-[4px]'>
                                <Copy />
                            </div>
                        </div>

                        <div className="p-6 h-[350px] bg-white bg-opacity-10 rounded-xl border border-zinc-700 backdrop-filter backdrop-blur-lg overflow-auto">
                            {showCode ? (
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
                                <div className="flex justify-center items-center h-full">
                                    <Badge hovered={true} >Hello</Badge>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="space-y-8">

                    <div className="space-y-6">
                        <div className="flex flex-row justify-between border-b border-zinc-700">
                            <div className='flex flex-row gap-8'>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300' : 'text-zinc-300 border-b-2 border-zinc-300'}`}
                                    onClick={() => setShowCode(false)}
                                >
                                    Preview
                                </button>
                                <button
                                    className={`text-base pb-2 ${showCode ? 'text-zinc-300 border-b-2 border-zinc-300' : 'text-zinc-300'}`}
                                    onClick={() => setShowCode(true)}
                                >
                                    Code
                                </button>
                            </div>
                            <div className='text-white flex flex-row gap-1 bg-[#666565] w-8 h-8 items-center justify-center rounded-[4px]'>
                                <Copy />
                            </div>
                        </div>

                        <div className="p-6 h-[350px] bg-white bg-opacity-10 rounded-xl border border-zinc-700 backdrop-filter backdrop-blur-lg overflow-auto">
                            {showCode ? (
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
                                <div className="flex justify-center items-center h-full">
                                    <Badge hovered={true} animated={true} >Hello</Badge>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Page;