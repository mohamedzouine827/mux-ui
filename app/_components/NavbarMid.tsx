import React from 'react'
import Logo from '../Assets/Logo'
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function NavbarMid(): JSX.Element {
    return (
        <section className='flex justify-center items-center h-24  sm:px-8 md:px-16 lg:px-24 border-b border-[#8e8e8e]/30'>
            <div className="h-[60px] px-8 py-3 bg-white/10 rounded-[7px] backdrop-blur-[24.10px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-[942px] justify-between items-center inline-flex">
                    <div className="justify-center items-center gap-12 flex">
                        <Logo />
                        <div className="justify-start items-center gap-6 flex">
                            <div className="text-zinc-300 text-sm font-medium cursor-pointer hover:text-white transition-colors ">Document</div>
                            <div className="text-zinc-300 text-sm font-medium cursor-pointer hover:text-white transition-colors ">Components</div>
                        </div>
                    </div>
                    <div className="justify-start items-center gap-12 flex">
                        <div className="justify-start items-center gap-6 flex">
                            <div className="px-6 py-1.5 rounded-[44px] border border-[#d9d9d9] justify-start items-center gap-80 flex">
                                <div className="text-[#8e8e8e] text-sm font-medium ">Search ... </div>
                                <div className="w-6 h-6 relative">
                                    <div className="w-[16.50px] h-[16.50px] left-[4px] top-[4px] absolute">
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <FaGithub className='w-6 h-6 text-zinc-300' />
                                <FaXTwitter className="w-6 h-6 text-zinc-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

