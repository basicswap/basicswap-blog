'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="relative bg-[#1b202d]">
          <div className="p-8 container flex flex-wrap items-center justify-between mx-auto">
            <div className="xl:w-1/3">
              <Link className="block max-w-max xl:mr-14" href="https://basicswapdex.com" passHref>
                <Image className="h-12" src="/images/basicswap-logo.svg" alt="BasicSwap Logo" width={150} height={50} />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden xl:block">
              <ul className="flex justify-center">
                <li className="mr-12">
                  <Link className="text-white hover:text-coolGray-50 font-medium" href="https://basicswapdex.com" passHref>
                    Home
                  </Link>
                </li>
                <li className="mr-12">
                  <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium" target="_blank" href="https://docs.basicswapdex.com/docs/intro" passHref>
                    Docs
                  </Link>
                </li>
                <li className="mr-12">
                  <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/faq" passHref>
                    FAQ
                  </Link>
                </li>
                <li className="mr-12">
                  <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/about" passHref>
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium" href="/" passHref>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop GitHub Button */}
            <div className="hidden xl:block xl:w-1/3">
              <div className="flex items-center justify-end">
                <a className="flex flex-wrap justify-center inline-block px-4 py-2.5 bg-blue-500 hover:bg-blue-600 font-bold text-sm text-white border border-blue-500 rounded-md shadow-button focus:ring-0 focus:outline-none" href="https://github.com/basicswap/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" className="mr-2" viewBox="0 0 24 24"><g fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" fill="#ffffff" d="M12,0.3c-6.6,0-12,5.4-12,12c0,5.3,3.4,9.8,8.2,11.4 C8.8,23.8,9,23.4,9,23.1c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6c-0.5-1.4-1.3-1.8-1.3-1.8C2.5,17,3.7,17,3.7,17 c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6c-2.7-0.3-5.5-1.3-5.5-5.9c0-1.3,0.5-2.4,1.2-3.2 C5.5,8.1,5,6.9,5.7,5.3c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4c2.3-1.6,3.3-1.2,3.3-1.2c0.7,1.7,0.2,2.9,0.1,3.2 c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6 c4.8-1.6,8.2-6.1,8.2-11.4C24,5.7,18.6,0.3,12,0.3z"></path></g></svg> <span>BasicSwap Github</span>
                </a>
              </div>
            </div>
            {/* Mobile burger button */}
            <button className="navbar-burger self-center ml-auto xl:hidden" onClick={toggleMobileMenu}>
              <Menu size={35} className="text-coolGray-400 dark:text-coolGray-800" />
            </button>
          </div>
        </nav>
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col items-center justify-center">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={toggleMobileMenu}>
              &times;
            </button>
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <Link className="text-white hover:text-coolGray-50 font-medium text-2xl" href="https://basicswapdex.com" passHref>
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium text-2xl" target="_blank" href="https://docs.basicswapdex.com/docs/intro" passHref>
                  Docs
                </Link>
              </li>
              <li>
                <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium text-2xl" href="https://basicswapdex.com/faq" passHref>
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium text-2xl" href="https://basicswapdex.com/about" passHref>
                  About
                </Link>
              </li>
              <li>
                <Link className="text-coolGray-400 hover:text-coolGray-50 font-medium text-2xl" href="/" passHref>
                  Blog
                </Link>
              </li>
              <li>
                <a className="flex flex-wrap justify-center inline-block px-4 py-2.5 bg-blue-500 hover:bg-blue-600 font-bold text-sm text-white border border-blue-500 rounded-md shadow-button focus:ring-0 focus:outline-none text-2xl" href="https://github.com/basicswap/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" className="mr-2" viewBox="0 0 24 24"><g fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" fill="#ffffff" d="M12,0.3c-6.6,0-12,5.4-12,12c0,5.3,3.4,9.8,8.2,11.4 C8.8,23.8,9,23.4,9,23.1c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6c-0.5-1.4-1.3-1.8-1.3-1.8C2.5,17,3.7,17,3.7,17 c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6c-2.7-0.3-5.5-1.3-5.5-5.9c0-1.3,0.5-2.4,1.2-3.2 C5.5,8.1,5,6.9,5.7,5.3c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4c2.3-1.6,3.3-1.2,3.3-1.2c0.7,1.7,0.2,2.9,0.1,3.2 c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6 c4.8-1.6,8.2-6.1,8.2-11.4C24,5.7,18.6,0.3,12,0.3z"></path></g></svg> <span>BasicSwap Github</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
