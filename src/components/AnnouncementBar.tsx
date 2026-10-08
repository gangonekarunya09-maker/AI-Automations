import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigate: (path: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#181818] text-white text-[12px] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 hidden sm:block"></div> {/* Spacer for center alignment */}

        <div className="flex items-center gap-2 mx-auto cursor-pointer group" onClick={() => onNavigate('/academy')}>
          <span className="font-bold tracking-tight text-[#3ea094]">The Creative Pass</span>
          <span className="text-neutral-400">·</span>
          <span className="text-neutral-300">Watch all masterclass courses for just $12/month</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#3ea094] group-hover:translate-x-0.5 transition-transform" />
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-neutral-400 hover:text-white p-1 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
