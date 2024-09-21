"use client"
import React, { useState } from 'react';
import Logo from '../Assets/Logo';
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaBars } from "react-icons/fa";
import Link from 'next/link';

export default function NavbarMid(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility when clicking on the hamburger icon
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className='flex justify-center items-center h-24 sm:px-8 md:px-16 lg:px-24 border-b border-[#8e8e8e]/30'>
            <div className="h-[60px] px-8 py-3 bg-white/10 rounded-[7px] backdrop-blur-[24.10px] flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="sm:w-[620px] md:w-[720px] lg:w-[820px] xl:w-[1006px] min-[315px]:w-[300px] justify-between items-center inline-flex">
                    <div className="h-full justify-center items-center gap-12 flex">
                        {/* Hamburger for small screens */}
                        <FaBars className="w-6 h-6 text-zinc-300 md:hidden text-2xl cursor-pointer" onClick={handleMenuToggle} />

                        {/* Logo for larger screens */}
                        <div className="hidden md:flex">
                            <Logo />
                        </div>

                        {/* Navigation links for larger screens */}
                        <div className="justify-start items-center gap-6 lg:flex hidden">
                            <Link href="/Docs">
                            <div className="text-zinc-300 text-sm font-medium cursor-pointer hover:text-white transition-colors ">Document</div>
                            </Link>
                            <Link href="/Docs/button">
                            <div className="text-zinc-300 text-sm font-medium cursor-pointer hover:text-white transition-colors ">Components</div>
                            </Link>
                        </div>

                    </div>

                    {/* Menu for smaller screens */}
                    {isMenuOpen && (
                        <div className="absolute top-20 left-0 w-full bg-zinc-950 text-white p-4 md:hidden">
                            <ul className="flex flex-col gap-4">
                            <Link href="/Docs">
                                <li className="cursor-pointer hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Document</li>
                                </Link>
                                <Link href="/Docs/button">
                                <li className="cursor-pointer hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Components</li>
                                </Link>
                            </ul>
                        </div>
                    )}

                    <div className="justify-start items-center gap-12 flex">
                        <div className="justify-start items-center gap-6 flex">
                            <div className="px-6 py-1.5 rounded-[44px] border hidden md:flex border-[#d9d9d9] justify-start items-center gap-80">
                                <div className="text-[#8e8e8e] text-sm font-medium">Search ... </div>
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
    );
}
