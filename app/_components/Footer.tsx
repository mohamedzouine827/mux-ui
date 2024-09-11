import React from 'react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import Logo from '../Assets/Logo'

export default function Footer() {
  return (
    <div className='py-[96px] w-full flex flex-row justify-between items-center text-white px-[120px]'>
      <div className="flex items-center gap-10">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer'>Document</span>
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer' >Components</span>
          <span className='text-zinc-300 text-sm font-medium hover:text-white transition-colors cursor-pointer'>Community</span>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <FaGithub className='w-6 h-6 text-zinc-300' />
        <FaXTwitter className="w-6 h-6 text-zinc-300" />
      </div>
    </div>
  )
}
