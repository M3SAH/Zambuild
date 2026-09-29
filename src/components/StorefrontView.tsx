import React, { useState, useMemo } from 'react';
import { Company, Town, Category, NCCGrade } from '../types';
import { TOWNS, CATEGORIES, NCC_GRADES } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  SlidersHorizontal, 
  X, 
  ArrowUpRight,
  Sparkles,
  Building,
  CheckCircle,
  Phone
} from 'lucide-react';

interface StorefrontViewProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  onWhatsAppClick: (company: Company) => void;
  onListCompanyClick: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  companies,
  onSelectCompany,
  onWhatsAppClick,
  onListCompanyClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setSelectedTown] = useState<string>('All Towns');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedGrade, setSelectedGrade] = useState<string>('All Grades');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter logic
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      // Name or bio search
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortBio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      // Town filter
      const matchesTown = selectedTown === 'All Towns' || c.town === selectedTown;

      // Category filter
      const matchesCategory = selectedCategory === 'All Categories' || c.category === selectedCategory;

      // Grade filter
      const matchesGrade = selectedGrade === 'All Grades' || c.nccGrade === selectedGrade;

      return matchesSearch && matchesTown && matchesCategory && matchesGrade;
    });
  }, [companies, searchTerm, selectedTown, selectedCategory, selectedGrade]);

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedTown !== 'All Towns' || 
    selectedCategory !== 'All Categories' || 
    selectedGrade !== 'All Grades';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTown('All Towns');
    setSelectedCategory('All Categories');
    setSelectedGrade('All Grades');
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Hero Header */}
      <section className="relative pt-6 sm:pt-10 pb-6 px-4 max-w-7xl mx-auto">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>National Council for Construction (NCC) Verified Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
            Find Zambia’s Most Trusted Construction Contractors
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
            Directly hire certified NCC Grade 1–6 civil engineers, heavy plant machinery, solar technicians, and builders across the Copperbelt & Lusaka.
          </p>

          {/* Minimalist Search Bar & Filters */}
          <div className="pt-2">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-lg border border-slate-200/90 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search contractor, service, or plant hire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    showAdvancedFilters || (selectedTown !== 'All Towns' || selectedGrade !== 'All Grades')
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters {(selectedTown !== 'All Towns' || selectedGrade !== 'All Grades') && '•'}</span>
                </button>

                <button
                  onClick={() => {}}
                  className="hidden sm:flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Expandable Filter Drawer */}
            {showAdvancedFilters && (
              <div className="mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Province / Town</label>
                    <select
                      value={selectedTown}
                      onChange={(e) => setSelectedTown(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500"
                    >
                      {TOWNS.map((town) => (
                        <option key={town} value={town}>{town}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">NCC Certification Grade</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500"
                    >
                      {NCC_GRADES.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Matching {filteredCompanies.length} contractors</span>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Key Trust Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              100% NCC Registered
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Direct WhatsApp Quotes
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              No Broker Commissions
            </span>
          </div>
        </div>
      </section>

      {/* Category Quick-Filter Pills */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Browse by Industry Sector</h2>
          <span className="text-xs text-slate-400 font-medium">{filteredCompanies.length} Verified Listings</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All Categories' 
              ? companies.length 
              : companies.filter(c => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Company Cards Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-slate-200/80 max-w-lg mx-auto">
            <Building className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No contractors found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              No registered companies currently match your search criteria. Try loosening your town or category filter.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompanies.map((company) => {
              const primaryPhoto = company.photos[0] || null;

              return (
                <div
                  key={company.id}
                  className="group bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  {/* Card Media Preview */}
                  <div 
                    onClick={() => onSelectCompany(company)}
                    className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    {primaryPhoto ? (
                      <img
                        src={primaryPhoto.url}
                        alt={company.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        <Building className="w-8 h-8 opacity-40" />
                      </div>
                    )}
                    
                    {/* Top Scrim Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/90 text-white backdrop-blur-sm shadow-xs">
                        {company.nccGrade}
                      </span>

                      {company.isVerified && (
                        <span className="px-2 py-0.8 text-[11px] font-semibold rounded-lg bg-emerald-600/95 text-white backdrop-blur-sm flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-white font-mono">
                      {company.photos.length} photos
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    
                    {/* Clean Metadata Line (Unboxed, Anti-slop) */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-slate-700">{company.town}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{company.category}</span>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center gap-0.5 text-amber-600 font-semibold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{company.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Company Name */}
                    <h3 
                      onClick={() => onSelectCompany(company)}
                      className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {company.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {company.shortBio}
                    </p>

                    {/* Service Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {company.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-700"
                        >
                          {service}
                        </span>
                      ))}
                      {company.services.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-semibold self-center">
                          +{company.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onWhatsAppClick(company)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs transition-all shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Quote via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => onSelectCompany(company)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom Promo CTA for Contractors */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Grow Your Construction Pipeline</span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">Are you a registered contractor in Zambia?</h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Get direct quote requests on WhatsApp from mine project managers, commercial developers, and property builders. Start with a 30-day free trial.
            </p>
          </div>
          <button
            onClick={onListCompanyClick}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            Start 30-Day Free Trial
          </button>
        </div>
      </section>

    </div>
  );
};
