import React, { useState } from 'react';
import { Company, ProjectPhoto } from '../types';
import { 
  X, 
  MapPin, 
  Star, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  Building2,
  Calendar,
  Eye,
  Check
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
  onWhatsAppClick: (company: Company) => void;
  onQuoteSubmit: (companyId: string, quoteData: { name: string; phone: string; details: string }) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
  onWhatsAppClick,
  onQuoteSubmit,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  if (!company) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;
    onQuoteSubmit(company.id, {
      name: quoteName,
      phone: quotePhone,
      details: quoteDetails,
    });
    setQuoteSent(true);
    setTimeout(() => {
      setQuoteSent(false);
      setQuoteName('');
      setQuotePhone('');
      setQuoteDetails('');
    }, 4000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(company.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Profile</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified NCC
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Main Hero Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 text-white">
                  {company.nccGrade}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700">
                  {company.category}
                </span>
                {company.isFeatured && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60">
                    Featured Contractor
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {company.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{company.town}, Zambia</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{company.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({company.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Member since {company.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={() => onWhatsAppClick(company)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Quote via WhatsApp</span>
              </button>
              <a
                href={`tel:${company.phone}`}
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call {company.phone}</span>
              </a>
            </div>
          </div>

          {/* About / Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">About Company</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {company.fullDescription}
            </p>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Certified Services & Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {company.services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-800">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Portfolio Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Verified Project Portfolio</h3>
              <span className="text-xs text-slate-500 font-mono">{company.photos.length} Project Photos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {company.photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 aspect-[4/3]"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                    <p className="text-xs sm:text-sm font-semibold leading-snug">{photo.title}</p>
                    {photo.description && (
                      <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{photo.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Details Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-slate-500 font-medium">Physical Address:</p>
              <p className="font-semibold text-slate-800 mt-0.5">{company.address}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Official Contact Email:</p>
              <a href={`mailto:${company.email}`} className="font-semibold text-emerald-700 hover:underline mt-0.5 block">
                {company.email}
              </a>
            </div>
            <div>
              <p className="text-slate-500 font-medium">WhatsApp Dispatch:</p>
              <p className="font-semibold text-slate-800 mt-0.5">{company.whatsapp}</p>
            </div>
          </div>

          {/* Quick Direct Quote Form */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Direct Request for Quotation (RFQ)</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Send your project specifications directly to {company.name}. You will receive a formal quotation via WhatsApp or phone.
            </p>

            {quoteSent ? (
              <div className="p-4 rounded-xl bg-white border border-emerald-200 text-center space-y-1 animate-in fade-in">
                <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-slate-900">Quotation Request Dispatched!</p>
                <p className="text-xs text-slate-600">The contractor has been notified. They typically reply within 2 working hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mwamba Banda"
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +260 97 7123456"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Scope & Location</label>
                  <textarea
                    rows={2}
                    placeholder="Describe your site location, project requirements, or machinery needed..."
                    value={quoteDetails}
                    onChange={(e) => setQuoteDetails(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Quotation Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>ZamBuild Certified Listing #{company.id.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Close Profile
          </button>
        </div>
      </div>

      {/* Lightbox Modal for enlarged photo */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="text-center mt-3 text-white">
              <p className="font-semibold text-base">{selectedPhoto.title}</p>
              {selectedPhoto.description && (
                <p className="text-xs text-slate-300 mt-1 max-w-md">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
