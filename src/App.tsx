import React, { useState, useEffect } from 'react';
import { ActiveTab, Company, UserAccount, SubscriptionTier } from './types';
import { INITIAL_COMPANIES } from './data/mockData';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { StorefrontView } from './components/StorefrontView';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { OnboardingView } from './components/OnboardingView';
import { VendorDashboardView } from './components/VendorDashboardView';
import { PricingView } from './components/PricingView';
import { AdminView } from './components/AdminView';
import { Check, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // Main view navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('storefront');

  // Directory companies state with local persistence
  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('zambuild_companies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached companies', e);
      }
    }
    return INITIAL_COMPANIES;
  });

  // Current logged in vendor profile
  const [vendorCompanyId, setVendorCompanyId] = useState<string>(() => {
    return companies[2]?.id || companies[0]?.id || 'comp-3';
  });

  // Modal detail view
  const [selectedCompanyModal, setSelectedCompanyModal] = useState<Company | null>(null);

  // Global toast system
  const [globalToast, setGlobalToast] = useState<{ message: string; icon?: string } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('zambuild_companies', JSON.stringify(companies));
  }, [companies]);

  const showToast = (message: string) => {
    setGlobalToast({ message });
    setTimeout(() => setGlobalToast(null), 3500);
  };

  // Currently logged in vendor company
  const vendorCompany = companies.find(c => c.id === vendorCompanyId) || companies[0] || null;

  // Handle WhatsApp click
  const handleWhatsAppClick = (company: Company) => {
    // 1. Increment lead click count
    setCompanies(prev => prev.map(c => {
      if (c.id === company.id) {
        return {
          ...c,
          leadClicks: c.leadClicks + 1
        };
      }
      return c;
    }));

    showToast(`Redirecting to WhatsApp to quote ${company.name}...`);

    // 2. Format phone number & message
    const cleanNumber = company.whatsapp.replace(/\D/g, '');
    const defaultMsg = encodeURIComponent(
      `Hello ${company.name}, I found your listing on ZamBuild Directory and would like to request an official quotation for our project.`
    );
    const waUrl = `https://wa.me/${cleanNumber}?text=${defaultMsg}`;
    
    // Open in new window safely
    const newWindow = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = waUrl;
    }
  };

  // Handle in-modal Quote Request submission
  const handleQuoteSubmit = (companyId: string, quoteData: { name: string; phone: string; details: string }) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return {
          ...c,
          leadClicks: c.leadClicks + 1
        };
      }
      return c;
    }));
    showToast(`Quotation inquiry dispatched to ${quoteData.name}!`);
  };

  // Handle vendor registration
  const handleRegisterCompany = (newCompanyData: Partial<Company>, user: UserAccount) => {
    const newComp: Company = {
      id: `comp-${Date.now()}`,
      name: newCompanyData.name || 'New Zambian Contractor',
      town: newCompanyData.town || 'Lusaka',
      category: newCompanyData.category || 'Building & Civil',
      nccGrade: newCompanyData.nccGrade || 'NCC Grade 4',
      rating: 5.0,
      reviewsCount: 1,
      shortBio: newCompanyData.shortBio || 'Verified Zambian contractor.',
      fullDescription: newCompanyData.fullDescription || '',
      services: newCompanyData.services || ['General Construction'],
      phone: newCompanyData.phone || '+260 97 1234567',
      whatsapp: newCompanyData.whatsapp || '+260971234567',
      email: newCompanyData.email || 'info@contractor.zm',
      address: newCompanyData.address || 'Zambia',
      isVerified: true,
      isFeatured: false,
      status: 'Active Trial',
      plan: 'Free Trial',
      trialDaysLeft: 30,
      leadClicks: 0,
      viewsCount: 1,
      photos: newCompanyData.photos || [],
      joinedDate: 'Oct 2026',
    };

    setCompanies(prev => [newComp, ...prev]);
    setVendorCompanyId(newComp.id);
    setActiveTab('dashboard');
    showToast(`Welcome! Your 30-Day Free Trial for ${newComp.name} is now live.`);
  };

  // Handle demo vendor sign in
  const handleLoginDemo = (companyId: string) => {
    setVendorCompanyId(companyId);
    setActiveTab('dashboard');
    const matched = companies.find(c => c.id === companyId);
    showToast(`Switched vendor session to ${matched?.name || 'Contractor'}`);
  };

  // Handle vendor profile updates
  const handleUpdateCompany = (updated: Company) => {
    setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast('Company profile changes successfully updated!');
  };

  // Handle upgrade plan
  const handleUpgradePlan = (plan: SubscriptionTier) => {
    if (!vendorCompany) return;
    setCompanies(prev => prev.map(c => {
      if (c.id === vendorCompany.id) {
        return {
          ...c,
          status: 'Paid',
          plan,
          trialDaysLeft: 0,
          isFeatured: plan === 'Enterprise' ? true : c.isFeatured
        };
      }
      return c;
    }));
    showToast(`Successfully subscribed to ${plan} Plan!`);
  };

  // Admin table operations
  const handleToggleFeatured = (companyId: string) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return { ...c, isFeatured: !c.isFeatured };
      }
      return c;
    }));
  };

  const handleToggleStatus = (companyId: string) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        const nextStatus = c.status === 'Paid' ? 'Active Trial' : 'Paid';
        return {
          ...c,
          status: nextStatus,
          plan: nextStatus === 'Paid' ? 'Professional' : 'Free Trial',
          trialDaysLeft: nextStatus === 'Paid' ? 0 : 30
        };
      }
      return c;
    }));
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  const handleSimulateLeadClick = (companyId: string) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return { ...c, leadClicks: c.leadClicks + 1 };
      }
      return c;
    }));
  };

  const handleAddQuickDemoCompany = () => {
    const demo: Company = {
      id: `comp-${Date.now()}`,
      name: 'Luanshya Structural & Steel Fabrication',
      town: 'Luanshya',
      category: 'Building & Civil',
      nccGrade: 'NCC Grade 3',
      rating: 4.8,
      reviewsCount: 14,
      shortBio: 'Pre-engineered warehouse steel frames, industrial trusses, and mining structural fabrication in Luanshya.',
      fullDescription: 'Luanshya Structural & Steel provides high-precision steel fabrication, crane gantry beams, and certified welding services for industrial plants.',
      services: ['Structural Steel Trusses', 'Industrial Warehouse Frames', 'Gantry Crane Rails', 'Certified Pipe Welding'],
      phone: '+260 212 510200',
      whatsapp: '+260978119033',
      email: 'sales@luanshyasteel.zm',
      address: 'Industrial Road, Luanshya, Zambia',
      isVerified: true,
      isFeatured: false,
      status: 'Active Trial',
      plan: 'Free Trial',
      trialDaysLeft: 27,
      leadClicks: 18,
      viewsCount: 310,
      joinedDate: 'Oct 2026',
      photos: [
        {
          id: `p-${Date.now()}`,
          url: '/src/assets/images/hero_lusaka_construction_1790707183929.jpg',
          title: 'Structural Steel Warehouse Framework',
          description: 'Bolted structural connections.'
        }
      ]
    };
    setCompanies(prev => [demo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Global Toast */}
      {globalToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-60 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-top-3 max-w-md w-[90%] sm:w-auto">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{globalToast.message}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vendorCompany={vendorCompany}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'storefront' && (
          <StorefrontView
            companies={companies}
            onSelectCompany={(c) => setSelectedCompanyModal(c)}
            onWhatsAppClick={handleWhatsAppClick}
            onListCompanyClick={() => setActiveTab('onboarding')}
          />
        )}

        {activeTab === 'onboarding' && (
          <OnboardingView
            onRegisterCompany={handleRegisterCompany}
            onLoginDemo={handleLoginDemo}
            companies={companies}
          />
        )}

        {activeTab === 'dashboard' && vendorCompany && (
          <VendorDashboardView
            company={vendorCompany}
            onUpdateCompany={handleUpdateCompany}
            onNavigateToPricing={() => setActiveTab('pricing')}
            onViewStorefrontProfile={(c) => setSelectedCompanyModal(c)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingView
            currentCompany={vendorCompany}
            onUpgradePlan={handleUpgradePlan}
            onNavigateToOnboarding={() => setActiveTab('onboarding')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            companies={companies}
            onToggleFeatured={handleToggleFeatured}
            onToggleStatus={handleToggleStatus}
            onDeleteCompany={handleDeleteCompany}
            onSimulateLeadClick={handleSimulateLeadClick}
            onAddQuickDemoCompany={handleAddQuickDemoCompany}
            onViewCompany={(c) => setSelectedCompanyModal(c)}
          />
        )}
      </main>

      {/* Company Detail Modal */}
      {selectedCompanyModal && (
        <CompanyDetailModal
          company={selectedCompanyModal}
          onClose={() => setSelectedCompanyModal(null)}
          onWhatsAppClick={handleWhatsAppClick}
          onQuoteSubmit={handleQuoteSubmit}
        />
      )}

      {/* Mobile Bottom Navigation (Strictly visible on mobile viewports) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Desktop / Tablet Minimalist Footer */}
      <footer className="hidden md:block bg-white border-t border-slate-200/80 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ZamBuild Directory</span>
            <span>·</span>
            <span>National Council for Construction (NCC) Verified Ecosystem</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('storefront')} className="hover:text-slate-900 transition-colors">Directory</button>
            <button onClick={() => setActiveTab('pricing')} className="hover:text-slate-900 transition-colors">Pricing Packages</button>
            <button onClick={() => setActiveTab('onboarding')} className="hover:text-slate-900 transition-colors">List Your Company</button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-slate-900 transition-colors">Admin Panel</button>
          </div>

          <div>
            <span>© 2026 ZamBuild. Built for Zambian Contractors & Builders.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
