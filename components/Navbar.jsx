import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useUser } from '@/context/userContext';
import { toast } from "react-toastify";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const router = useRouter();

  // Conditional navLinks array to hide "Dashboard" for unauthenticated users
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Jobs' },
    ...(user ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const handleLogout = () => {
    logout(); 
        toast.success('Logged out successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        router.push("/"); // Redirect to home
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center text-gray-800 text-lg font-bold">
          <div className="flex items-center text-2xl font-semibold">
            <div className="w-10 mr-2">
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                id="work"
                data-name="Line Color"
                xmlns="http://www.w3.org/2000/svg"
                className="icon line-color"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="primary"
                    d="M16,4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7h8Zm5,16V8a1,1,0,0,0-1-1H4A1,1,0,0,0,3,8V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20Z"
                    style={{
                      fill: 'none',
                      stroke: '#000000',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: 2,
                    }}
                  ></path>
                  <path
                    id="secondary"
                    d="M11,14H8.64A4,4,0,0,1,5,11.58L3.18,7.43A1,1,0,0,1,4,7H20a1,1,0,0,1,.82.43L19,11.58A4,4,0,0,1,15.36,14H13"
                    style={{
                      fill: 'none',
                      stroke: '#0EA5E9',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: 2,
                    }}
                  ></path>
                  <rect
                    id="primary-2"
                    data-name="primary"
                    x="11"
                    y="13"
                    width="2"
                    height="2"
                    style={{
                      fill: 'none',
                      stroke: '#000000',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: 2,
                    }}
                  ></rect>
                </g>
              </svg>
            </div>
            Hire <span className='text-[#0EA5E9]'>scape</span>
          </div>
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`absolute md:static top-[72px] left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-8 z-40 px-6 md:px-0 py-4 md:py-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-teal-600">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Avatar or Login Button */}
          <div className="mt-4 md:mt-0">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center">
                {user.user?.firstName?.charAt(0).toUpperCase()} {/* Show the first letter of the user's first name */}
                </div>
                <span className='text-base font-bold'>{user.user.firstName}</span>
                <button
                  className="py-2 px-4 text-sm bg-red-600 hover:bg-red-800 rounded text-white"
                  onClick={handleLogout}
                >
                  <span className="font-semibold">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="py-2 px-5 text-sm bg-[#0EA5E9] hover:bg-teal-600 rounded text-white">
                <span className="font-semibold">
                    Login
                  </span>
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
