import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onRequestCustom }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Workflows', path: '/workflows' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#E4E3E0] hairline-b transition-colors">
      {/* 1. Announcement Bar: Thin black strip, white 11px uppercase text */}
      <div className="bg-[#0E0E0E] text-white text-[11px] uppercase tracking-[0.18em] font-medium py-2 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 bg-white shrink-0"></span>
          <span className="truncate">OFFLO AUTOMATION STUDIO — PRODUCTION-READY n8n & ENTERPRISE PIPELINES</span>
        </div>
        <div className="hidden sm:flex items-center divide-x divide-white/20 text-[10px] tracking-[0.16em] text-neutral-300">
          <span className="px-3">STATUS: ALL RUNTIMES OPTIMAL</span>
          <span className="px-3">V1.4 BLUEPRINTS</span>
          <button
            onClick={() => handleLinkClick('/admin')}
            className="px-3 hover:text-white transition-colors cursor-pointer uppercase"
          >
            SYS CONSOLE
          </button>
        </div>
      </div>

      {/* 2. Main Header: Three zones on page-colored warm-neutral background */}
      <div className="w-full px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Zone 1 (Left): Primary navigation links (uppercase, small, wide tracking) */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0E0E0E]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors cursor-pointer py-1 relative group ${
                  isActive ? 'text-[#0E0E0E]' : 'text-[#6B6B6B] hover:text-[#0E0E0E]'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`block h-[1px] bg-[#0E0E0E] transition-all duration-200 mt-0.5 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 2 (Center): Logo or app name (Oversized, bold geometric sans-serif) */}
        <div className="flex items-center">
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left font-bold text-2xl sm:text-3xl tracking-[-0.04em] text-[#0E0E0E] hover:opacity-80 transition-opacity cursor-pointer uppercase select-none"
          >
            OFFLO
          </button>
        </div>

        {/* Zone 3 (Right): Utility actions as icon + tiny label */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onRequestCustom}
            className="h-10 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white bg-[#0E0E0E] hover:bg-[#222222] transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Request Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0E0E0E] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#CFCFCC] bg-[#E4E3E0] px-6 pt-4 pb-8 space-y-4 overflow-hidden"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`block w-full text-left py-3 text-xs uppercase tracking-[0.18em] font-bold border-b border-[#CFCFCC] transition-colors ${
                    currentPath === link.path ? 'text-[#0E0E0E]' : 'text-[#6B6B6B] hover:text-[#0E0E0E]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  onRequestCustom();
                  setMobileMenuOpen(false);
                }}
                className="w-full h-12 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white bg-[#0E0E0E] hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Custom Automation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
