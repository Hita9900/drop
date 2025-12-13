'use client';
import { useState } from 'react';
import { Link, Menu } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Button - toggles dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 ml-20 text-white px-3 py-3 rounded-md font-medium hover:opacity-50"
      >
        <Menu size={30} />
      </button>

      {/* Dropdown - shows only when isOpen is true */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-30 text-primary-light bg-primary-dark rounded-md shadow-lg overflow-hidden z-50">
          <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-primary-accent-60 ">Home</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-primary-accent-60">Option 2</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-primary-accent-60">sdkgf</a>
        </div>
      )}

      {/* Optional: close when clicking outside */}
      {isOpen && <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />}
    </div>
  );
}