import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[120px] py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center gap-8 md:gap-12">
      <div className="flex flex-col justify-start items-center gap-4 md:gap-6">
        <h1 className="text-center text-zinc-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[1.2]">The Last UI Library You&apos;ll Ever Need</h1>
        <p className="max-w-[902px] text-center text-zinc-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed">Create stunning, responsive designs effortlessly with our comprehensive, all-in-one UI library built to handle every project, every time.</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <Link href="/Docs/button">
          <div className="px-6 py-2 w-full sm:w-[166px] bg-zinc-950 rounded-[10px] shadow hover:bg-[#18181B] hover:text-[#D4D4D8] transition-all duration-150 ease-in-out cursor-pointer flex justify-center items-center">
            <span className="text-center text-slate-300 text-base font-medium leading-7">Components</span>
          </div>
        </Link> 
        <Link href="/Docs">
          <div className="px-6 py-2 w-full sm:w-[166px] rounded-[10px] shadow border border-[#efefef] hover:border-[#D4D4D8] text-slate-200 transition-all duration-150 ease-in-out cursor-pointer hover:text-slate-300 flex justify-center items-center">
            <span className="text-center text-lg font-medium leading-7">Document</span>
          </div>
        </Link> 
      </div>
    </div>
  )
}