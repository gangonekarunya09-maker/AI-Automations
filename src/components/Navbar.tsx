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
    <header className="sticky top-0 z-40 w-full bg-[#07080B]/92 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand wordmark as single text element */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left font-display font-bold text-lg sm:text-xl tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 group"
          >
            <span>Offlo Automations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all"></span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links (4-6 single-line links) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-medium text-neutral-400">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors cursor-pointer relative py-2 hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"
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
                ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                : 'border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/30 bg-white/[0.02]'
            }`}
            title="Open Admin Console"
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Admin</span>
          </button>

          <button
            onClick={onRequestCustom}
            className="group px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>Request Automation</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('/admin')}
            className="text-[11px] font-mono px-2 py-1 text-neutral-400 border border-white/10"
          >
            Admin
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
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
            className="sm:hidden border-b border-white/[0.08] bg-[#07080B] px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`block w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                    currentPath === link.path
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-300 hover:bg-white/5'
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
                className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
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
