
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // you can use Heroicons or SVG too

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b py-3 px-4 flex justify-between items-center text-white bg-black sticky top-0 z-50">
      {/* Logo */}
      <div className='flex items-center space-x-2'>
      <img src="/logo.png" alt="Logo" className="h-10 w-10" />
      <h1 className="font-bold text-gray-300 text-3xl">PaxPay</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-md text-gray-300 font-semibold space-x-10 pr-8">
        <a href="">Home</a>
        <a href="">Company</a>
        <a href="">About Us</a>
        <div className='flex justify-center lg:justify-start'>
            <button className="bg-transparent text-lime-300 border-2 border-lime-300 px-4 py-1 rounded-2xl text-md font-semibold ml-4">
                Send 
            </button>
            <button className="bg-lime-300 text-black px-3 py-1 rounded-full text-lg font-semibold ml-4">
                Accept
            </button>
            </div>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute min-h-screen top-16 left-0 w-full bg-black flex flex-col space-y-4 text-xl font-semibold px-4 py-2 shadow-md md:hidden">
          <a href="">Home</a>
          <a href="">Company</a>
          <a href="">About Us</a>
          <a href="">Support</a>
          <div className='flex flex-col gap-4 justify-center pt-4'>
            <button className="bg-transparent text-lime-300 border-2 border-lime-300 py-1 rounded-2xl text-md font-semibold ml-4">
                Send 
            </button>
            <button className="bg-lime-300 text-black px-3 py-1 rounded-full text-lg font-semibold ml-4">
                Accept
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
