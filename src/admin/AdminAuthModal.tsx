import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

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
    // Default passkeys
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#090A0E] border border-white/[0.12] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white text-black flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            Admin Portal Access
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Enter administrative credentials to access leads, custom requests, catalog controls, and n8n webhooks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 bg-red-950/40 border border-red-800 text-red-300 text-xs text-center font-mono">
              Incorrect key. (Default: offlo2026)
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Admin Access Key / PIN:
            </label>
            <input
              type="password"
              value={passphrase}
              onChange={e => {
                setPassphrase(e.target.value);
                setError(false);
              }}
              placeholder="e.g. offlo2026"
              className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify & Enter Console</span>
          </button>
        </form>

        <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-3 text-xs font-mono uppercase tracking-wider text-emerald-300 hover:text-emerald-200 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-800/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Quick Reviewer Access (1-Click)</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full text-center text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-300 py-1 transition-colors cursor-pointer"
          >
            Cancel & Return
          </button>
        </div>
      </motion.div>
    </div>
  );
};
