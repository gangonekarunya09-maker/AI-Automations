import React, { useState, useEffect } from 'react';
import { Workflow, Lead, CustomRequest, Order } from './types';
import { Storage } from './lib/storage';

// Public components & pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Workflows } from './pages/Workflows';
import { WorkflowDetails } from './pages/WorkflowDetails';
import { Services } from './pages/Services';
import { Industries } from './pages/Industries';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';

// Modals
import { GetWorkflowModal } from './components/GetWorkflowModal';
import { RequestCustomModal } from './components/RequestCustomModal';
import { AdminAuthModal } from './admin/AdminAuthModal';

// Admin components
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminWorkflows } from './admin/AdminWorkflows';
import { AdminLeads } from './admin/AdminLeads';
import { AdminOrders } from './admin/AdminOrders';
import { AdminCustomRequests } from './admin/AdminCustomRequests';
import { AdminSettings } from './admin/AdminSettings';

export default function App() {
  // Navigation & route state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Selected workflow for detail view
  const [selectedWorkflowSlug, setSelectedWorkflowSlug] = useState<string | null>(null);

  // Data collections from persistent local storage
  const [workflows, setWorkflows] = useState<Workflow[]>(() => Storage.getWorkflows());
  const [leads, setLeads] = useState<Lead[]>(() => Storage.getLeads());
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => Storage.getCustomRequests());
  const [orders, setOrders] = useState<Order[]>(() => Storage.getOrders());

  // Modals state
  const [workflowToAcquire, setWorkflowToAcquire] = useState<Workflow | null>(null);
  const [isRequestCustomOpen, setIsRequestCustomOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('offlo_admin_authenticated') === 'true' || sessionStorage.getItem('operon_admin_authenticated') === 'true';
  });

  // Admin tab state
  const [adminTab, setAdminTab] = useState<string>('dashboard');

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      if (path.startsWith('/workflows/')) {
        const slug = path.replace('/workflows/', '');
        setSelectedWorkflowSlug(slug);
      } else {
        setSelectedWorkflowSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse path on initial load
  useEffect(() => {
    const path = currentPath;
    if (path.startsWith('/workflows/')) {
      const slug = path.replace('/workflows/', '');
      setSelectedWorkflowSlug(slug);
    } else if (path.startsWith('/admin')) {
      // Check if deep admin tab requested
      const segments = path.split('/').filter(Boolean);
      if (segments[1]) {
        setAdminTab(segments[1]);
      }
    }
  }, []);

  const refreshData = () => {
    setWorkflows(Storage.getWorkflows());
    setLeads(Storage.getLeads());
    setCustomRequests(Storage.getCustomRequests());
    setOrders(Storage.getOrders());
  };

  const navigateTo = (path: string) => {
    if (path.startsWith('/admin') && !isAdminAuthenticated) {
      setIsAdminAuthOpen(true);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path.startsWith('/workflows/')) {
      const slug = path.replace('/workflows/', '');
      setSelectedWorkflowSlug(slug);
    } else {
      setSelectedWorkflowSlug(null);
    }

    if (path.startsWith('/admin')) {
      const segments = path.split('/').filter(Boolean);
      setAdminTab(segments[1] || 'dashboard');
    }
  };

  const handleSelectWorkflow = (wf: Workflow) => {
    navigateTo(`/workflows/${wf.slug}`);
  };

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
    setIsAdminAuthOpen(false);
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
  };

  const handleExitAdmin = () => {
    sessionStorage.removeItem('offlo_admin_authenticated');
    sessionStorage.removeItem('operon_admin_authenticated');
    setIsAdminAuthenticated(false);
    navigateTo('/');
  };

  // Find selected workflow if on detail page
  const activeWorkflow = selectedWorkflowSlug
    ? workflows.find(w => w.slug === selectedWorkflowSlug)
    : null;

  // Counts for admin badges
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const newRequestsCount = customRequests.filter(r => r.status === 'New').length;

  // Render Admin View if in /admin and authenticated
  if (currentPath.startsWith('/admin') && isAdminAuthenticated) {
    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={(tab) => {
          setAdminTab(tab);
          const newPath = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
          window.history.pushState({}, '', newPath);
          setCurrentPath(newPath);
        }}
        onExitAdmin={handleExitAdmin}
        newLeadsCount={newLeadsCount}
        newRequestsCount={newRequestsCount}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            workflows={workflows}
            leads={leads}
            customRequests={customRequests}
            orders={orders}
            onNavigateTab={(tab) => {
              setAdminTab(tab);
              const newPath = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
              window.history.pushState({}, '', newPath);
              setCurrentPath(newPath);
            }}
          />
        )}
        {adminTab === 'workflows' && (
          <AdminWorkflows
            workflows={workflows}
            onRefresh={refreshData}
            onPreviewWorkflow={(wf) => {
              navigateTo(`/workflows/${wf.slug}`);
            }}
          />
        )}
        {adminTab === 'leads' && (
          <AdminLeads
            leads={leads}
            onRefresh={refreshData}
          />
        )}
        {adminTab === 'custom-requests' && (
          <AdminCustomRequests
            customRequests={customRequests}
            onRefresh={refreshData}
          />
        )}
        {adminTab === 'orders' && (
          <AdminOrders
            orders={orders}
            onRefresh={refreshData}
          />
        )}
        {adminTab === 'settings' && (
          <AdminSettings
            onRefresh={refreshData}
          />
        )}
      </AdminLayout>
    );
  }

  // Render Public Website View
  return (
    <div className="min-h-screen flex flex-col bg-[#07080B] text-[#ECEFF4]">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onRequestCustom={() => setIsRequestCustomOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* Route: Home / */}
        {currentPath === '/' && (
          <Home
            workflows={workflows}
            onNavigate={navigateTo}
            onSelectWorkflow={handleSelectWorkflow}
            onRequestWorkflow={(wf) => setWorkflowToAcquire(wf)}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /workflows */}
        {currentPath === '/workflows' && (
          <Workflows
            workflows={workflows}
            onSelectWorkflow={handleSelectWorkflow}
            onRequestWorkflow={(wf) => setWorkflowToAcquire(wf)}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /workflows/:slug */}
        {currentPath.startsWith('/workflows/') && activeWorkflow && (
          <WorkflowDetails
            workflow={activeWorkflow}
            onBack={() => navigateTo('/workflows')}
            onRequestWorkflow={(wf) => setWorkflowToAcquire(wf)}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /services */}
        {currentPath === '/services' && (
          <Services
            onNavigate={navigateTo}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /industries */}
        {currentPath === '/industries' && (
          <Industries
            onNavigate={navigateTo}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /about */}
        {currentPath === '/about' && (
          <About
            onNavigate={navigateTo}
            onRequestCustom={() => setIsRequestCustomOpen(true)}
          />
        )}

        {/* Route: /contact */}
        {currentPath === '/contact' && (
          <Contact
            onSuccess={() => {
              refreshData();
            }}
          />
        )}

        {/* Route: /terms */}
        {currentPath === '/terms' && (
          <Terms
            onNavigate={navigateTo}
          />
        )}

        {/* Route: /privacy */}
        {currentPath === '/privacy' && (
          <Privacy
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onRequestCustom={() => setIsRequestCustomOpen(true)}
      />

      {/* Modal: Get Workflow Dialog */}
      <GetWorkflowModal
        workflow={workflowToAcquire}
        isOpen={Boolean(workflowToAcquire)}
        onClose={() => setWorkflowToAcquire(null)}
        onSuccess={() => {
          refreshData();
        }}
      />

      {/* Modal: Request Custom Automation */}
      <RequestCustomModal
        isOpen={isRequestCustomOpen}
        onClose={() => setIsRequestCustomOpen(false)}
        onSuccess={() => {
          refreshData();
        }}
      />

      {/* Modal: Admin Authentication Gate */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onSuccess={handleAdminAuthenticated}
        onCancel={() => setIsAdminAuthOpen(false)}
      />
    </div>
  );
}
