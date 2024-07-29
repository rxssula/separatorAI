"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white">
      <div className="flex flex-row justify-between items-center pt-7 px-4 sm:px-8 lg:px-28">
        <div className="text-xl font-medium flex flex-row gap-2 place-items-center">
          <Image src="/images/logo.svg" alt="logo" width={35} height={35} />
          trome
        </div>

        {/* Hamburger menu for mobile and medium screens */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center flex-1 justify-center text-md">
          <Link className="px-5" href="#">
            Music Separation
          </Link>
          <Link className="px-5" href="#">
            Vocal Remover
          </Link>
          <Link className="px-5" href="#">
            Piano + Guitar
          </Link>
        </div>

        {/* Try Demo button for large screens */}
        <div className="hidden lg:block">
          <Link href="/upload">
            <button className="text-white text-sm px-4 py-2 rounded-full border-solid border-2 border-[#AAA9A9]">
              Try Demo
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile and medium screen menu */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 px-5">
          <Link className="block px-4 py-2" href="#">
            Music Separation
          </Link>
          <Link className="block px-4 py-2" href="#">
            Vocal Remover
          </Link>
          <Link className="block px-4 py-2" href="#">
            Piano + Guitar
          </Link>
        </div>
      )}
    </div>
  );
};
