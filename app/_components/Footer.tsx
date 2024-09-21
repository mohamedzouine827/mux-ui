import React from 'react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import Logo from '../Assets/Logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='py-12 sm:py-16 md:py-24 w-full flex flex-col sm:flex-row justify-between items-center text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] gap-8 sm:gap-0'>
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <Logo />
        <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <Link href="/Docs" >
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer'>Document</span>
          </Link>
          <Link href="/Docs/button" >
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer'>Components</span>
          </Link>
          <Link href="https://discord.gg/ZxGaAV7e" >
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer'>Community</span>
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <Link href="https://github.com/mohamedzouine827/mux-ui">
        <FaGithub className='w-5 h-5 sm:w-6 sm:h-6 text-zinc-300' /></Link>
        <Link href="https://x.com/mux0001">
        <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" />
        </Link>
      </div>
    </div>
  )
}