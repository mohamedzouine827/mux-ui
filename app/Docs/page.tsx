import React from 'react'
import Layout from './Layout'
import Link from 'next/link'
import LeftArrow from '../Assets/LeftArrow'

interface StepData {
  number: number;
  text: string;
  link?: string;
  linkText?: string;
  button?: {
    text: string;
    icon: React.ReactNode;
  };
}

const stepsData: StepData[] = [
  {
    number: 1,
    text: "Set Up Tailwind CSS in your project",
    link: "https://tailwindcss.com/docs/installation",
    linkText: "click here to install tailwind css"
  },
  {
    number: 2,
    text: "Set Up Framer Motion in your project",
    link: "https://www.framer.com/motion/introduction/",
    linkText: "click here to install Framer Motion"
  },
  {
    number: 3,
    text: "Create Component File in your project ( CLI coming soon )",
  },
  {
    number: 4,
    text: "Start Building With our components",
    button: {
      text: "Components",
      icon: <LeftArrow />
    }
  }
]

const Step: React.FC<StepData> = ({ number, text, link, linkText, button }) => (
  <div className="flex-col justify-start items-start gap-7 flex">
    <div className="justify-start items-center gap-2 inline-flex">
      <div className="w-[33px] p-[7.50px] bg-zinc-300 rounded-[30.75px] flex-col justify-center items-center gap-[7.50px] inline-flex">
        <div className="text-black text-sm font-medium leading-[18px]">{number}</div>
      </div>
      <div className="text-zinc-300 text-base font-medium leading-normal">{text}</div>
    </div>
    {link && linkText && (
      <Link href={link}>
        <div className="w-[592px] px-6 py-4 text-[#d9d9d9] hover:text-slate-50 transition-all duration-150 ease-in-out bg-white/10 rounded-[14px] backdrop-blur-[25.30px] justify-center cursor-pointer items-center inline-flex">
          <div className="text-base font-medium underline leading-normal">{linkText}</div>
        </div>
      </Link>
    )}
    {button && (
      <div className="flex-col justify-end items-center gap-4 flex">
        <div className="px-12 py-[18px] bg-white/10 text-[#d9d9d9] hover:text-slate-50 transition-all duration-150 ease-in-out cursor-pointer rounded-[14px] backdrop-blur-[25.30px] justify-center items-center gap-1 inline-flex">
          <div className="text-base font-medium leading-normal">{button.text}</div>
          {button.icon}
        </div>
      </div>
    )}
  </div>
)

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="justify-between items-start inline-flex scrollbar scrollbar-thin scrollbar-thumb-gray-500">
        <div className="p-12 flex-col justify-start items-start gap-12 inline-flex">
          <div className="self-stretch h-[120px] flex-col justify-start items-start gap-6 flex">
            <div className="text-white text-[32px] font-semibold leading-[48px]">Getting Started With MUX UI</div>
            <div className="self-stretch text-zinc-300 text-lg font-medium leading-normal">MUX UI is a modern, flexible component library that makes building responsive user interfaces easy. With customizable components and a focus on design and performance, it helps you create stunning apps fast.</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-8 flex">
            <div className="self-stretch h-[72px] flex-col justify-start items-start gap-6 flex">
              <div className="text-white text-2xl font-semibold leading-normal">Installation</div>
              <div className="text-zinc-300 text-lg font-medium leading-normal">To get started, you'll need to have Node.js and npm (or yarn) installed on your system.</div>
            </div>
            <div className="flex-col justify-start items-start gap-12 flex">
              {stepsData.map((step, index) => (
                <Step key={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page