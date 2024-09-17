"use client";
import React, { useState } from 'react';
import Layout from '../Layout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Copy from '@/app/Assets/Copy';

import Badge from '../badge/Badge';
import Button from './Button';

const Page: React.FC = () => {
    const [showCodeStates, setShowCodeStates] = useState({
        preview: false,
        example1: false,
        example2: false,
        funky: false,
        border: false,
        underline: false
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

interface ButtonProps {
  children: React.ReactNode;
  lightEffect?: boolean;
  shadowEffect?: boolean;
  rolling?: boolean;
  version?: 'default' | 'underline' | 'border' | 'red' | 'funky';
  textSize?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  lightEffect = false,
  shadowEffect = false,
  rolling = false,
  version = 'default',
  textSize = 'text-base',
  onClick,
}) => {
  const versionStyles = {
    default: 'bg-blue-500 text-white',
    underline: 'bg-transparent text-blue-500 underline',
    border: 'bg-transparent border border-blue-500 text-blue-500',
    red: 'bg-red-500 text-white',
    funky: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white',
  };

  return (
    <motion.button
      className={\`px-4 py-2 rounded-md transition-all duration-300 ease-in-out \${versionStyles[version]} \${textSize} \${shadowEffect ? 'shadow-lg' : ''}\`}
      whileHover={{
        scale: 1.05,
        rotate: rolling ? 360 : 0,
        boxShadow: lightEffect ? '0px 0px 8px 2px rgba(255, 255, 255, 0.5)' : 'none',
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
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
                                <Button
                                    shadowEffect={section === "example2"}
                                    rolling={section === "example1"}
                                    version={section === "funky" ? "funky" : section === "border" ? "border"  :section === "underline" ? "underline"  : undefined}
                                    
                                >
                                    Components
                                </Button>

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
                {renderSection('funky', 'Funky Button Example', "An example of a Button with the funky version")}
                {renderSection('border', 'Border Button Example', "An example of a Button with the border version")}
                {renderSection('underline', 'Underline Button Example', "An example of a Button with the underline version")}
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
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>children</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The content of the Button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>lightEffect</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Whether to apply a light effect to the button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>shadowEffect</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Whether to apply a shadow effect to the button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>version</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The version of the button style (&apos;default&apos; or other variants)</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>rolling</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Boolean</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Whether the button should have a rolling animation</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>textSize</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The size of the text in the button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>textColor</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The color of the text in the button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>borderColor</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The color of the button&apos;s border</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>backgroundColor</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">String</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The background color of the button</td>
                            </tr>
                            <tr className="">
                                <td className="px-4 py-2 text-sm font-medium text-zinc-300 border border-gray-300"><Badge>duration</Badge></td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">Number</td>
                                <td className="px-4 py-2 text-sm text-zinc-300 border border-gray-300">The duration of animations in seconds</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
