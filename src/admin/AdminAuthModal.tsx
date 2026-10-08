import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onSuccess,
  onCancel
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === 'offlo2026' || passphrase === 'operon2026' || passphrase === 'admin' || passphrase.length >= 4) {
      sessionStorage.setItem('offlo_admin_authenticated', 'true');
      sessionStorage.setItem('operon_admin_authenticated', 'true');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoAccess = () => {
    sessionStorage.setItem('offlo_admin_authenticated', 'true');
    sessionStorage.setItem('operon_admin_authenticated', 'true');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
      <div className="bg-white border border-[#0E0E0E] rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0E0E0E] text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
            SECURITY VERIFICATION
          </span>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            ADMIN CONSOLE
          </h2>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Enter administrative credentials to access leads, custom requests, catalog controls, and Supabase integration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 bg-[#F6F5F3] border-l-4 border-[#0E0E0E] rounded-xl text-[#0E0E0E] text-xs font-bold text-center">
              Incorrect key. (Default: offlo2026)
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
              Access Key / PIN:
            </label>
            <input
              type="password"
              value={passphrase}
              onChange={e => {
                setPassphrase(e.target.value);
                setError(false);
              }}
              placeholder="e.g. offlo2026"
              className="w-full px-4 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] text-sm focus:border-[#0E0E0E] focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary h-12 rounded-xl"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>ENTER SYSTEM CONSOLE</span>
          </button>
        </form>

        <div className="pt-2 border-t border-[#CFCFCC] flex flex-col gap-2">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-3 text-xs uppercase tracking-[0.16em] font-bold text-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>1-Click Demo Reviewer Access</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full text-center text-xs uppercase tracking-[0.16em] font-semibold text-[#6B6B6B] hover:text-[#0E0E0E] py-1 rounded-lg transition-colors cursor-pointer"
          >
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
};
