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
    <div className="min-h-screen bg-[#E4E3E0] text-[#0E0E0E]">
      {/* Admin Top Navigation: Thin black strip */}
      <header className="sticky top-0 z-30 bg-[#0E0E0E] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#0E0E0E]">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>
          <span className="text-neutral-700">/</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="font-extrabold uppercase tracking-tight text-sm text-white">
              OFFLO ADMIN CONSOLE
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 text-white font-semibold">
              V1.4 PROD
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 hidden sm:block font-medium">
            Connected: Local DB + Supabase + Webhook
          </div>
          <button
            onClick={onExitAdmin}
            className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Subheader Navigation Tabs */}
      <div className="bg-[#F6F5F3] border-b border-[#CFCFCC] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0E0E0E] text-white'
                    : 'text-[#6B6B6B] hover:text-[#0E0E0E] bg-white border border-[#CFCFCC]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-[#0E0E0E]' : 'bg-[#0E0E0E] text-white'
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
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        {children}
      </main>
    </div>
  );
};
