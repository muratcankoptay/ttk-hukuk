'use client';

import { memo } from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled: boolean;
  onClick?: () => void;
}

export const NavLink = memo(function NavLink({ href, label, isScrolled, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative font-medium transition-colors duration-300 py-2 group
        ${isScrolled ? 'text-[#0a1628] hover:text-[#d4af37]' : 'text-white hover:text-[#d4af37]'}`}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
});

interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
  delay?: number;
}

export const MobileNavLink = memo(function MobileNavLink({ href, label, onClick, delay = 0 }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-3xl font-semibold text-white hover:text-[#d4af37] transition-colors py-4 block text-center animate-fade-in-up"
      style={{ 
        fontFamily: 'Playfair Display, serif',
        animationDelay: `${delay}ms`
      }}
    >
      {label}
    </Link>
  );
});
