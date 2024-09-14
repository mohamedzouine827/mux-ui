import React, { ReactNode } from 'react';
import NavbarMid from '../_components/NavbarMid';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="sticky top-0 z-50">
        <NavbarMid />
      </header>
      <main className="flex flex-row container">
        <aside className="sticky top-0 h-screen overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 invisible lg:visible">
          <Sidebar />
        </aside>
        <div className="flex-1 ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
