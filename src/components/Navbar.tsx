import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
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

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbfbf9]/95 backdrop-blur-md border-b border-[#e4e4df] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand wordmark as single text element */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left font-serif italic font-semibold text-2xl tracking-tight text-[#1a1a1a] hover:text-[#2e4ff4] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 group"
          >
            <span>Offlo</span>
            <span className="text-xs font-mono font-normal not-italic uppercase tracking-widest text-neutral-400 pl-1 border-l border-[#e4e4df]">
              Automations
            </span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-[#1a1a1a]/60">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors cursor-pointer relative py-2 hover:text-[#1a1a1a] ${
                  isActive ? 'text-[#1a1a1a] font-semibold' : 'text-[#1a1a1a]/60'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#2e4ff4]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3.5">
          <button
            onClick={() => handleLinkClick('/admin')}
            className={`text-[11px] font-mono px-3 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer ${
              isAdmin
                ? 'border-[#2e4ff4] bg-[#2e4ff4]/10 text-[#2e4ff4]'
                : 'border-[#e4e4df] text-neutral-600 hover:text-[#1a1a1a] hover:border-neutral-400 bg-white'
            }`}
            title="Open Admin Console"
          >
            <Shield className="w-3 h-3 text-[#2e4ff4]" />
            <span>Admin</span>
          </button>

          <button
            onClick={onRequestCustom}
            className="group px-4 py-2 text-[11px] font-mono uppercase tracking-wider font-semibold text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>Request Automation</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('/admin')}
            className="text-[11px] font-mono px-2 py-1 text-neutral-600 border border-[#e4e4df] bg-white"
          >
            Admin
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-[#1a1a1a] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-b border-[#e4e4df] bg-[#fbfbf9] px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`block w-full text-left py-2.5 px-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                    currentPath === link.path
                      ? 'bg-[#1a1a1a] text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onRequestCustom();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors cursor-pointer"
              >
                Request Custom Automation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
