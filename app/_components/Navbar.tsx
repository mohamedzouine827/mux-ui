import React from 'react';
import Logo from '../Assets/Logo';
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';

export default function Navbar(): JSX.Element {
    return (
        <section className='flex justify-center items-center h-24 px-4 sm:px-8 md:px-16 lg:px-24'>
            <div className=" sm:w-[620px] md:w-[750px] lg:w-[850px] xl:w-[1006px] min-[315px]:w-[300px] h-12 px-4  sm:px-8 py-3 bg-white/10 rounded-lg backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-10">
                    <Logo />
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/Docs" >
                        <NavItem>Document</NavItem>
                        </Link>
                        <Link href="/Docs/button" >
                        <NavItem>Components</NavItem>
                        </Link>
                        <Link href="https://discord.gg/ZxGaAV7e" >
                        <NavItem>Community</NavItem>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                    <FaGithub className='w-5 h-5 sm:w-6 sm:h-6 text-zinc-300' />
                    <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" />
                </div>
            </div>
        </section>
    )
}

interface NavItemProps {
    children: React.ReactNode;
}

function NavItem({ children }: NavItemProps): JSX.Element {
    return (
        <div className="text-zinc-300 text-sm hidden lg:flex font-medium cursor-pointer hover:text-white transition-colors">
            {children}
        </div>
    )
}
