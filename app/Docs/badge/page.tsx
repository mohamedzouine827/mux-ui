"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';
import { motion } from 'framer-motion';

const Page: React.FC = () => {
    const [showCode, setShowCode] = useState(false);
    /* we need to do 3 styles : (normal, light, animated light, hover jump, hover jump, hover jump animated light, hover jump light)
        props : ( text, color, light color, duration , speed)
    */
    const styles = [
        {
            id : 3,
            style : `  <button className="
        relative
        px-[10px] py-[2px] 
        bg-zinc-600 text-white 
        rounded-full 
        text-[12px] leading-[16px] font-semibold
        transition-all duration-300 ease-in-out
        
      ">
        hello

      </button>`
        },
        {
            id: 1,
            style: `<button className="px-[10px] py-[2px] bg-zinc-600 text-white rounded-full hover:bg-zinc-500 text-[12px] leading-[16px] font-semibold ">
                  Badge
                </button>`
        },
        {
            id : 2,
            style : `<motion.div
          className="
            absolute inset-0 
            bg-gradient-to-r from-transparent via-white to-transparent
            opacity-30
          "
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 1,
            ease: 'linear',
            repeatDelay: 4
          }}
        />`
        }

    ]
    const buttonCode = `
<button className="px-6 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition-colors">
  Button
</button>
  `.trim();

    return (
        <Layout>
            <div className=" mx-auto p-12 space-y-8">
                <header className="space-y-3">
                    <h1 className="text-[32px] font-semibold text-white">Badge</h1>
                    <p className="text-lg text-zinc-300 font-medium">Displays a badge or a component that looks like a badge.</p>
                </header>

                <section className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Preview</h2>
                        <p className="text-lg text-zinc-300">Here's a preview of Button components with a code.</p>
                    </div>

                    <div className="space-y-6 ">
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

                        <div className="p-6 h-[350px] flex justify-center items-center bg-white bg-opacity-10 rounded-xl border border-zinc-700 backdrop-filter backdrop-blur-lg">
                            {showCode ? (
                                <SyntaxHighlighter language="jsx" style={vscDarkPlus}>

                                    {buttonCode}
                                </SyntaxHighlighter>
                            ) : (
                                <div className="inline-block">
      <button className="
        relative
        px-[10px] py-[2px] 
        bg-zinc-600 text-white 
        rounded-full 
        text-[12px] leading-[16px] font-semibold
        transition-all duration-300 ease-in-out
        
      ">
        hello

      </button>
    </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Examples</h2>
                        <p className="text-lg text-zinc-300">Examples of the Button Components that you might use</p>
                    </div>

                    <div className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-lg">
                        <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Click here to install Tailwind CSS
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Page;