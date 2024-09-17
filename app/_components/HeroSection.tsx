import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="  px-[120px] py-32 flex-col justify-center items-center gap-12 inline-flex">
    <div className="flex-col justify-start items-center gap-6 flex">
        <div className="text-center text-zinc-100 text-5xl font-semibold  leading-[60px]">The Last UI Library You&apos;ll Ever Need</div>
        <div className="w-[902px] text-center text-[#8e8e8e] text-xl font-medium  leading-[30px]">Create stunning, responsive designs effortlessly with our comprehensive, all-in-one UI library built to handle every project, every time.</div>
    </div>
    <div className="justify-start items-start gap-8 inline-flex">
        <div className="px-8 py-2 w-[166px] bg-zinc-950 rounded-[10px] shadow hover:bg-[#18181B] hover:text-[#D4D4D8] transition-all duration-150 ease-in-out cursor-pointer justify-center items-center gap-2.5 flex">
            <div className="text-center text-slate-300 text-base font-medium  leading-7">Components</div>
        </div>
       <Link href="/Docs">
        <div className="h-11 px-8 py-2 w-[166px] rounded-[10px] shadow border  border-[#efefef] hover:border-[#D4D4D8] text-slate-200 transition-all duration-150 ease-in-out cursor-pointer hover:text-slate-300 justify-center items-center gap-2.5 flex">
            <div className="text-center  text-lg font-medium  leading-7">Document</div>
        </div>
        </Link> 
    </div>
</div>
  )
}
