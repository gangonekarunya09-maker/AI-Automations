import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleLink = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E7E7E7] shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-[13px]">
          {/* Column 1: Awards */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              Awards
            </div>
            <ul className="space-y-2 text-neutral-700 font-medium">
              <li>
                <button onClick={() => handleLink('/websites?award=HM')} className="hover:text-[#3ea094] transition-colors text-left">
                  Honor Mentions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/websites?award=NOMINEE')} className="hover:text-[#3ea094] transition-colors text-left">
                  Nominees
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/websites?award=SOTD')} className="hover:text-[#3ea094] transition-colors text-left">
                  Sites of the Day
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/websites?award=SOTM')} className="hover:text-[#3ea094] transition-colors text-left">
                  Sites of the Month
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/websites?award=SOTY')} className="hover:text-[#3ea094] transition-colors text-left">
                  Sites of the Year
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <button onClick={() => handleLink('/websites?award=Honors')} className="hover:text-[#3ea094] transition-colors text-left">
                  Honors
                </button>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#3ea094]/15 text-[#3ea094] font-bold">
                  New
                </span>
              </li>
              <li>
                <button onClick={() => handleLink('/directory')} className="hover:text-[#3ea094] transition-colors text-left">
                  Most Awarded Profiles
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/about')} className="hover:text-[#3ea094] transition-colors text-left">
                  Jury 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Trending */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              Trending
            </div>
            <ul className="space-y-2 text-neutral-700 font-medium">
              <li><button onClick={() => handleLink('/websites?tag=Portfolio')} className="hover:text-[#3ea094] transition-colors text-left">Portfolio Websites</button></li>
              <li><button onClick={() => handleLink('/websites?tag=Typography')} className="hover:text-[#3ea094] transition-colors text-left">Free fonts</button></li>
              <li><button onClick={() => handleLink('/websites?tag=Animation')} className="hover:text-[#3ea094] transition-colors text-left">Animated websites</button></li>
              <li><button onClick={() => handleLink('/websites?award=SOTD')} className="hover:text-[#3ea094] transition-colors text-left">Sites of the Day</button></li>
              <li><button onClick={() => handleLink('/websites?tag=Scrolling')} className="hover:text-[#3ea094] transition-colors text-left">Scrolling</button></li>
              <li><button onClick={() => handleLink('/websites?tag=OnePage')} className="hover:text-[#3ea094] transition-colors text-left">One page design</button></li>
              <li><button onClick={() => handleLink('/websites?tag=UI')} className="hover:text-[#3ea094] transition-colors text-left">UI design</button></li>
              <li><button onClick={() => handleLink('/websites?tag=Ecommerce')} className="hover:text-[#3ea094] transition-colors text-left">E-commerce layouts</button></li>
            </ul>
          </div>

          {/* Column 3: By Category */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              By Category
            </div>
            <ul className="space-y-2 text-neutral-700 font-medium">
              <li><button onClick={() => handleLink('/websites?category=E-commerce')} className="hover:text-[#3ea094] transition-colors text-left">E-commerce</button></li>
              <li><button onClick={() => handleLink('/websites?category=Architecture')} className="hover:text-[#3ea094] transition-colors text-left">Architecture</button></li>
              <li><button onClick={() => handleLink('/websites?category=Hotel & Restaurant')} className="hover:text-[#3ea094] transition-colors text-left">Restaurant & Hotel</button></li>
              <li><button onClick={() => handleLink('/websites?category=Design Agencies')} className="hover:text-[#3ea094] transition-colors text-left">Design Agencies</button></li>
              <li><button onClick={() => handleLink('/websites?category=Technology')} className="hover:text-[#3ea094] transition-colors text-left">Business & Corporate</button></li>
              <li><button onClick={() => handleLink('/websites?category=Fashion')} className="hover:text-[#3ea094] transition-colors text-left">Fashion</button></li>
              <li><button onClick={() => handleLink('/websites?category=Mobile & Apps')} className="hover:text-[#3ea094] transition-colors text-left">Mobile & Apps</button></li>
              <li><button onClick={() => handleLink('/websites?category=Animation')} className="hover:text-[#3ea094] transition-colors text-left">Interaction Design</button></li>
            </ul>
          </div>

          {/* Column 4: By Technology */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              By Technology
            </div>
            <ul className="space-y-2 text-neutral-700 font-medium">
              <li><button onClick={() => handleLink('/websites?tech=CSS')} className="hover:text-[#3ea094] transition-colors text-left">CSS animations</button></li>
              <li><button onClick={() => handleLink('/websites?tech=Shopify')} className="hover:text-[#3ea094] transition-colors text-left">Shopify</button></li>
              <li><button onClick={() => handleLink('/websites?tech=WebGL')} className="hover:text-[#3ea094] transition-colors text-left">WebGL sites</button></li>
              <li><button onClick={() => handleLink('/websites?tech=React')} className="hover:text-[#3ea094] transition-colors text-left">React Websites</button></li>
              <li><button onClick={() => handleLink('/websites?tech=Three.js')} className="hover:text-[#3ea094] transition-colors text-left">3D websites</button></li>
              <li><button onClick={() => handleLink('/websites?tech=GSAP')} className="hover:text-[#3ea094] transition-colors text-left">GSAP</button></li>
              <li><button onClick={() => handleLink('/websites?tech=Next.js')} className="hover:text-[#3ea094] transition-colors text-left">Next.js</button></li>
            </ul>
          </div>

          {/* Column 5: Standalone Highlights */}
          <div className="bg-[#F8F8F8] p-4 rounded-lg flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                Featured Spaces
              </div>
              <ul className="space-y-3 font-semibold text-neutral-800">
                <li>
                  <button onClick={() => handleLink('/collections')} className="flex items-center justify-between w-full hover:text-[#3ea094] transition-colors">
                    <span>Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLink('/blog')} className="flex items-center justify-between w-full hover:text-[#3ea094] transition-colors">
                    <span>Awwwards Blog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLink('/academy')} className="flex items-center justify-between w-full hover:text-[#3ea094] transition-colors">
                    <span>Academy Masterclasses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E7E7E7] text-[11px] text-neutral-500">
              Curated daily by the international design jury.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
