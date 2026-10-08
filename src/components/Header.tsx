import React, { useState } from 'react';
import { ChevronDown, Menu, X, Instagram, Twitter, Facebook, Youtube, Share2, Plus } from 'lucide-react';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSubmitSite: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenPro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onSubmitSite,
  onOpenAuth,
  onOpenPro
}) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLink = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setIsExploreOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E7E7E7] transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Section: Logo & Explore MegaMenu Trigger */}
        <div className="flex items-center gap-6">
          {/* Original Brand Wordmark */}
          <button
            onClick={() => handleLink('/')}
            className="flex items-center gap-1.5 font-extrabold text-xl sm:text-2xl tracking-tighter text-[#181818] hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="font-serif italic font-black text-2xl text-[#181818] tracking-tighter group-hover:text-[#3ea094] transition-colors">
              w.
            </span>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-400 hidden sm:inline">
              Awwwards
            </span>
          </button>

          {/* Explore Dropdown Trigger */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setIsExploreOpen(true)}
          >
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-black py-2 cursor-pointer transition-colors"
            >
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExploreOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Top-Level Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            <button
              onClick={() => handleLink('/directory')}
              className={`hover:text-black transition-colors ${currentPath === '/directory' ? 'text-black' : ''}`}
            >
              Directory
            </button>
            <button
              onClick={() => handleLink('/academy')}
              className={`hover:text-black transition-colors flex items-center gap-1.5 ${currentPath === '/academy' ? 'text-black' : ''}`}
            >
              <span>Academy</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#3ea094] text-white font-bold leading-tight">
                New
              </span>
            </button>
            <button
              onClick={() => handleLink('/websites')}
              className={`hover:text-black transition-colors ${currentPath === '/websites' ? 'text-black' : ''}`}
            >
              Websites
            </button>
            <button
              onClick={() => handleLink('/market')}
              className={`hover:text-black transition-colors ${currentPath === '/market' ? 'text-black' : ''}`}
            >
              Market
            </button>
          </nav>
        </div>

        {/* Right Section: Socials, Auth & CTAs */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Social Icons Row */}
          <div className="hidden xl:flex items-center gap-3 text-neutral-400 border-r border-[#E7E7E7] pr-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors" title="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors" title="X / Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors" title="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors" title="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Auth Links */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-neutral-600">
            <button
              onClick={() => onOpenAuth('login')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPro}
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#181818] border border-[#D0D0D0] hover:border-black rounded-sm transition-all cursor-pointer whitespace-nowrap"
            >
              Be Pro
            </button>

            <button
              onClick={onSubmitSite}
              className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white bg-[#181818] hover:bg-[#3ea094] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Website</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-700 hover:text-black lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MegaMenu Dropdown (Desktop) */}
      <MegaMenu
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onNavigate={handleLink}
      />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E7E7] bg-white px-5 py-6 space-y-5 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="space-y-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
            <button onClick={() => handleLink('/websites')} className="block w-full text-left py-2 border-b border-[#F0F0F0]">
              Explore Winning Websites
            </button>
            <button onClick={() => handleLink('/directory')} className="block w-full text-left py-2 border-b border-[#F0F0F0]">
              Creators & Agencies Directory
            </button>
            <button onClick={() => handleLink('/academy')} className="block w-full text-left py-2 border-b border-[#F0F0F0] flex items-center justify-between">
              <span>Academy Masterclasses</span>
              <span className="text-[10px] bg-[#3ea094] text-white px-1.5 py-0.5 rounded">New</span>
            </button>
            <button onClick={() => handleLink('/collections')} className="block w-full text-left py-2 border-b border-[#F0F0F0]">
              Design Collections
            </button>
            <button onClick={() => handleLink('/market')} className="block w-full text-left py-2 border-b border-[#F0F0F0]">
              Marketplace
            </button>
            <button onClick={() => handleLink('/blog')} className="block w-full text-left py-2 border-b border-[#F0F0F0]">
              Design Blog
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E7]">
            <div className="flex gap-4 text-xs font-semibold text-neutral-700">
              <button onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}>Log in</button>
              <button onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}>Sign Up</button>
            </div>
            <button
              onClick={() => { onOpenPro(); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-[#3ea094]"
            >
              Become Pro →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
