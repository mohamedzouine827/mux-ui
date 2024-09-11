import React from 'react'
import Logo from '../Assets/Logo'
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function Navbar(): JSX.Element {
    return (
        <section className='flex justify-center items-center h-24  sm:px-8 md:px-16 lg:px-24'>
            <div className="xl:w-[1006px]  h-12 px-8 py-3 bg-white/10 rounded-lg backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-8">
                        <NavItem>Document</NavItem>
                        <NavItem>Components</NavItem>
                        <NavItem>Community</NavItem>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <FaGithub className='w-6 h-6 text-zinc-300' />
                    <FaXTwitter className="w-6 h-6 text-zinc-300" />
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
        <div className="text-zinc-300 text-sm font-medium cursor-pointer hover:text-white transition-colors">
            {children}
        </div>
    )
}