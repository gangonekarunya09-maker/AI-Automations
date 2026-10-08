import React from 'react';
import { LayoutDashboard, Layers, Users, ShoppingBag, FileCode2, Settings, ArrowLeft, LogOut, Shield } from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
  newLeadsCount: number;
  newRequestsCount: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  children,
  newLeadsCount,
  newRequestsCount
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workflows', label: 'Workflows', icon: Layers },
    { id: 'leads', label: 'Leads', icon: Users, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'custom-requests', label: 'Custom Requests', icon: FileCode2, badge: newRequestsCount > 0 ? newRequestsCount : undefined },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Webhooks & Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07080B] text-neutral-200">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#090A0E] border-b border-white/[0.08] px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>
          <span className="text-neutral-800">/</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-display font-bold text-sm text-white">
              Offlo Operations Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
              Admin V1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
            Connected: Local DB + n8n Webhook
          </div>
          <button
            onClick={onExitAdmin}
            className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Subheader Navigation Tabs */}
      <div className="bg-[#07080A] border-b border-white/[0.06] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    isActive ? 'bg-black text-white' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {children}
      </main>
    </div>
  );
};
