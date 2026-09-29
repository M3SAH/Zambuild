import React, { useState, useMemo } from 'react';
import { Company, SubscriptionStatus } from '../types';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Search, 
  Star, 
  AlertTriangle, 
  Trash2, 
  ExternalLink,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Zap,
  Check
} from 'lucide-react';

interface AdminViewProps {
  companies: Company[];
  onToggleFeatured: (companyId: string) => void;
  onToggleStatus: (companyId: string) => void;
  onDeleteCompany: (companyId: string) => void;
  onSimulateLeadClick: (companyId: string) => void;
  onAddQuickDemoCompany: () => void;
  onViewCompany: (company: Company) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  companies,
  onToggleFeatured,
  onToggleStatus,
  onDeleteCompany,
  onSimulateLeadClick,
  onAddQuickDemoCompany,
  onViewCompany,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | SubscriptionStatus>('All');
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3000);
  };

  // Stats calculation
  const totalVendors = companies.length;
  const activeTrials = companies.filter(c => c.status === 'Active Trial').length;
  const paidSubscribers = companies.filter(c => c.status === 'Paid').length;
  const totalLeadClicks = companies.reduce((acc, curr) => acc + curr.leadClicks, 0);

  // Filtered rows
  const filteredList = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Toast Notification */}
      {adminToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{adminToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
              System Console
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Platform Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            ZamBuild Admin Control Panel
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onAddQuickDemoCompany();
              showNotification('New verified Zambian contractor added to registry');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Demo Vendor</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Vendors</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalVendors}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Contractors in directory</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active 30-Day Trials</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
            {activeTrials}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Pending subscription conversion</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Paid Subscribers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {paidSubscribers}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Active paid tiers</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp Leads</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalLeadClicks}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total RFQ engagements</p>
        </div>
      </div>

      {/* Vendor Management Table Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Table Filter & Search Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by company name, town, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['All', 'Active Trial', 'Paid', 'Expired'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Company & Contact</th>
                <th className="py-3.5 px-4">Town</th>
                <th className="py-3.5 px-4">NCC Grade</th>
                <th className="py-3.5 px-4">Trial / Subscription</th>
                <th className="py-3.5 px-4">Leads</th>
                <th className="py-3.5 px-4 text-center">Featured Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Moderation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No vendors found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredList.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Name & Contact */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{company.name}</span>
                        {company.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        <span>{company.email}</span> · <span className="font-mono">{company.whatsapp}</span>
                      </div>
                    </td>

                    {/* Town */}
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {company.town}
                    </td>

                    {/* NCC Grade */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        {company.nccGrade}
                      </span>
                    </td>

                    {/* Trial / Subscription */}
                    <td className="py-3.5 px-4">
                      {company.status === 'Active Trial' ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span>{company.trialDaysLeft}d Trial Left</span>
                        </div>
                      ) : company.status === 'Paid' ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid ({company.plan})</span>
                        </div>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[11px]">
                          Expired
                        </span>
                      )}
                    </td>

                    {/* WhatsApp Leads */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 tabular-nums">
                      <button
                        onClick={() => {
                          onSimulateLeadClick(company.id);
                          showNotification(`Dispatched test WhatsApp lead to ${company.name}`);
                        }}
                        className="hover:text-emerald-700 inline-flex items-center gap-1"
                        title="Click to dispatch simulated lead"
                      >
                        <span>{company.leadClicks}</span>
                        <Zap className="w-3 h-3 text-slate-300 hover:text-emerald-600" />
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          onToggleFeatured(company.id);
                          showNotification(company.isFeatured ? `Removed featured tag from ${company.name}` : `Marked ${company.name} as Featured Contractor`);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                          company.isFeatured
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {company.isFeatured ? '★ Featured' : 'Standard'}
                      </button>
                    </td>

                    {/* Moderation Controls */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            onToggleStatus(company.id);
                            showNotification(`Updated status for ${company.name}`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            company.status === 'Paid'
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                          title="Toggle between Paid and Trial status"
                        >
                          {company.status === 'Paid' ? 'Set Trial' : 'Approve Paid'}
                        </button>

                        <button
                          onClick={() => onViewCompany(company)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove ${company.name} from directory?`)) {
                              onDeleteCompany(company.id);
                              showNotification(`Removed ${company.name}`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Suspend / Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredList.length} of {companies.length} Zambian contractors</span>
          <span className="font-mono">NCC Registry Sync: Live</span>
        </div>

      </div>

    </div>
  );
};
