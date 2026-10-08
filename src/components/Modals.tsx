import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { SiteItem } from '../types/awwwards';

// 1. Interactive Vote Modal for Nominees
export const VoteModal: React.FC<{
  site: SiteItem | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ site, isOpen, onClose }) => {
  const [designScore, setDesignScore] = useState(8);
  const [usabilityScore, setUsabilityScore] = useState(7);
  const [creativityScore, setCreativityScore] = useState(8);
  const [contentScore, setContentScore] = useState(7);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !site) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-neutral-400 hover:text-black p-1">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#3ea094]/15 text-[#3ea094] flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#181818]">Vote Recorded!</h3>
            <p className="text-neutral-500 text-xs max-w-xs mx-auto leading-relaxed">
              Your evaluation for <strong className="text-neutral-800">{site.title}</strong> has been added to the community tally.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-4 px-6 py-2 rounded-sm bg-[#181818] text-white text-xs font-bold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3ea094] font-bold">
                Community Nominee Evaluation
              </span>
              <h3 className="text-xl font-bold text-[#181818]">
                Vote for {site.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Rate each category from 1 to 10. Your vote helps determine the Site of the Day.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-neutral-800 mb-1">
                  <span>Design (40%):</span>
                  <span className="font-mono text-[#3ea094] font-bold">{designScore}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={designScore}
                  onChange={e => setDesignScore(Number(e.target.value))}
                  className="w-full accent-[#3ea094]"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-800 mb-1">
                  <span>Usability (30%):</span>
                  <span className="font-mono text-[#3ea094] font-bold">{usabilityScore}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={usabilityScore}
                  onChange={e => setUsabilityScore(Number(e.target.value))}
                  className="w-full accent-[#3ea094]"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-800 mb-1">
                  <span>Creativity (20%):</span>
                  <span className="font-mono text-[#3ea094] font-bold">{creativityScore}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={creativityScore}
                  onChange={e => setCreativityScore(Number(e.target.value))}
                  className="w-full accent-[#3ea094]"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-800 mb-1">
                  <span>Content (10%):</span>
                  <span className="font-mono text-[#3ea094] font-bold">{contentScore}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={contentScore}
                  onChange={e => setContentScore(Number(e.target.value))}
                  className="w-full accent-[#3ea094]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-sm bg-[#181818] hover:bg-[#3ea094] text-white font-bold tracking-wider uppercase transition-colors"
                >
                  Submit Vote
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Auth Modal (Log in / Sign Up)
export const AuthModal: React.FC<{
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
}> = ({ isOpen, mode: initialMode, onClose }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 max-w-sm w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-neutral-400 hover:text-black p-1">
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-6 space-y-2">
            <Check className="w-8 h-8 text-[#3ea094] mx-auto mb-2" />
            <h3 className="text-lg font-bold">Welcome to Awwwards!</h3>
            <p className="text-neutral-500 text-xs">You are logged into your community profile.</p>
            <button onClick={() => { setDone(false); onClose(); }} className="mt-4 px-4 py-2 bg-[#181818] text-white text-xs font-bold uppercase rounded-sm">Done</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex border-b border-[#E7E7E7] pb-2 gap-4">
              <button
                onClick={() => setMode('login')}
                className={`text-sm font-bold pb-1 transition-colors ${mode === 'login' ? 'text-black border-b-2 border-black' : 'text-neutral-400'}`}
              >
                Log In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`text-sm font-bold pb-1 transition-colors ${mode === 'signup' ? 'text-black border-b-2 border-black' : 'text-neutral-400'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="designer@studio.com"
                  className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#181818] hover:bg-[#3ea094] text-white font-bold tracking-wider uppercase transition-colors mt-2"
              >
                {mode === 'login' ? 'Log in to Awwwards' : 'Create Free Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Submit Website Modal
export const SubmitModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-neutral-400 hover:text-black p-1">
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-6 space-y-2">
            <Check className="w-8 h-8 text-[#3ea094] mx-auto mb-2" />
            <h3 className="text-lg font-bold">Submission Received!</h3>
            <p className="text-neutral-500 text-xs">Your project will be reviewed by the evaluation committee within 48 hours.</p>
            <button onClick={() => { setDone(false); onClose(); }} className="mt-4 px-4 py-2 bg-[#181818] text-white text-xs font-bold uppercase rounded-sm">Close</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#3ea094] font-bold">
                Awards Submission
              </div>
              <h3 className="text-xl font-bold text-[#181818]">Submit Your Website</h3>
              <p className="text-neutral-500 text-[11px] mt-0.5">
                Gain international visibility, juror feedback, and eligibility for Site of the Day.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Site Title *</label>
              <input required type="text" placeholder="e.g. Atelier Forma Monograph" className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none" />
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Live URL *</label>
              <input required type="url" placeholder="https://mywebsite.com" className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Category</label>
                <select className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none">
                  <option>Architecture</option>
                  <option>E-commerce</option>
                  <option>Design Agencies</option>
                  <option>Technology</option>
                  <option>Animation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Submission Tier</label>
                <select className="w-full px-3 py-2 rounded border border-[#D0D0D0] focus:border-black focus:outline-none">
                  <option>Standard Review ($60)</option>
                  <option>Priority Jury ($150)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-sm bg-[#181818] hover:bg-[#3ea094] text-white font-bold tracking-wider uppercase transition-colors">
              Submit Project for Evaluation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
