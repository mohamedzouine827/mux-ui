"use client";
import React, { useState } from 'react';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';

import Badge from '../badge/Badge';
import Testimonial from './Testimonial';
import Picture from "@/public/Picture.png";


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
import Image from 'next/image';
import React from 'react';


export default function Testimonial({ 
  darkMode = false, 
  name = "Mohamed Zouine", 
  role = "UX Designer", 
  content = "Hello all the city of gotham, i want to thanks the jocker for this opportunity that he gives me to play my little games that i'm aware that i does it in a matter of seconds",
  avatarSrc = Picture.src
}) {
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-[#D4D4D8]';
  const nameColor = darkMode ? 'text-gray-100' : 'text-[#09090B]';
  const roleColor = darkMode ? 'text-gray-400' : 'text-[#A1A1AA]';
  const textColor = darkMode ? 'text-gray-300' : 'text-[#71717A]';

  return (
    <section className={\`lg:w-[396px] w-[343px] px-6 py-6 rounded-[20px] border justify-center items-center lg:items-start \${borderColor} \${bgColor} flex flex-col gap-[24px]\`}>
      <div className='flex lg:flex-row flex-col items-center gap-2'>
        <Image className='rounded-full h-12 w-12' src={avatarSrc} alt='avatar' width={1920} height={1920}/>
        <div className='flex flex-col gap-1'>
          <h1 className={\`text-[16px] leading-5 text-center lg:text-start \${nameColor} font-semibold\`}>
            {name}
          </h1>
          <h2 className={\`text-[14px] text-center lg:text-start leading-[18px] \${roleColor}\`}>
            {role}
          </h2>
        </div>
      </div>
      <p className={\`-tracking-2 \${textColor} text-base font-normal lg:text-start text-center\`}>
        {content}
      </p>
    </section>
  );
}
`.trim();

  const renderSection = (section: keyof typeof showCodeStates, title: string, description: string) => {
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
                {buttonCodePreview}
              </SyntaxHighlighter>
            ) : (
              <div className="flex flex-col items-center min-h-56 justify-center space-y-4">
                <Testimonial
                  darkMode={true}
                  name="John Doe"
                  role="Software Engineer"
                  content="This is a custom testimonial content. It can be as long or short as needed. Make sure that you set it as you need."
                  avatarSrc={Picture.src}
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
          <h1 className="text-[32px] font-semibold text-white">Testimonial Component</h1>
          <p className="text-lg text-zinc-300 font-medium">Here is a custom testimonial component that can be reused with different props.</p>
        </header>

        {renderSection('preview', 'Preview', "Here's a preview of the testimonial component.")}

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
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>darkMode</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Sets the component to dark mode or light mode</td>
              </tr>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>name</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The name of the person giving the testimonial</td>
              </tr>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>role</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The role or title of the person</td>
              </tr>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>content</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The content of the testimonial</td>
              </tr>
              <tr className="">
                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>avatarSrc</Badge></td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The source URL of the avatar image</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
};

export default Page;
