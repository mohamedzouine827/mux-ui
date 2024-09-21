"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`text-sm font-medium ${isActive ? 'text-[#acacac] underline' : 'text-[#8e8e8e]'}`}
    >
      {children}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-[250px] h-[962px] px-4 py-12 border-r border-[#8e8e8e]/30 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="flex-col justify-start items-start gap-12 flex">
        <div className="flex-col justify-start items-start gap-7 flex">
          <div className="text-slate-300 text-base font-semibold">Getting Started</div>
          <div className="flex-col justify-center items-start gap-4 flex">
            <MenuItem href="/Docs">Installation</MenuItem>
            <MenuItem href="/Docs/button">Components</MenuItem>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-7 flex">
          <div className="text-slate-300 text-base font-semibold">Components</div>
          <div className="flex-col justify-center items-start gap-4 flex">
            <MenuItem href="/Docs/button">Button</MenuItem>
            <MenuItem href="/Docs/badge">Badge</MenuItem>
            <MenuItem href="/Docs/counter">Counter</MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;