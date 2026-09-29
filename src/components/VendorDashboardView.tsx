import React, { useState } from 'react';
import { Company, Town, Category, NCCGrade, ProjectPhoto } from '../types';
import { TOWNS, CATEGORIES, NCC_GRADES } from '../data/mockData';
import { 
  Building2, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  MessageSquare, 
  Eye, 
  Star, 
  CheckCircle2, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  ShieldCheck,
  Phone,
  MapPin,
  ExternalLink,
  Zap,
  Check
} from 'lucide-react';

interface VendorDashboardViewProps {
  company: Company;
  onUpdateCompany: (updated: Company) => void;
  onNavigateToPricing: () => void;
  onViewStorefrontProfile: (company: Company) => void;
}

export const VendorDashboardView: React.FC<VendorDashboardViewProps> = ({
  company,
  onUpdateCompany,
  onNavigateToPricing,
  onViewStorefrontProfile,
}) => {
  // Form editable state
  const [name, setName] = useState(company.name);
  const [town, setTown] = useState<Town>(company.town);
  const [category, setCategory] = useState<Category>(company.category);
  const [nccGrade, setNccGrade] = useState<NCCGrade>(company.nccGrade);
  const [phone, setPhone] = useState(company.phone);
  const [whatsapp, setWhatsapp] = useState(company.whatsapp);
  const [email, setEmail] = useState(company.email);
  const [address, setAddress] = useState(company.address);
  const [shortBio, setShortBio] = useState(company.shortBio);
  const [fullDescription, setFullDescription] = useState(company.fullDescription);
  
  // Services tag management
  const [services, setServices] = useState<string[]>(company.services);
  const [newServiceTag, setNewServiceTag] = useState('');

  // Portfolio photo management
  const [photos, setPhotos] = useState<ProjectPhoto[]>(company.photos);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');

  // Toast feedback
  const [savedToast, setSavedToast] = useState(false);

  const samplePhotoPresets = [
    {
      title: 'Structural Steel & Heavy Foundations',
      url: '/src/assets/images/hero_lusaka_construction_1790707183929.jpg'
    },
    {
      title: 'Civil Earthworks & Road Paving',
      url: '/src/assets/images/civil_engineering_copperbelt_1790707197809.jpg'
    },
    {
      title: 'Earthmoving Fleet & Mining Plant',
      url: '/src/assets/images/heavy_equipment_plant_hire_1790707209383.jpg'
    },
    {
      title: 'Solar Power Grid & Electrical Reticulation',
      url: '/src/assets/images/solar_electrical_industrial_1790707221135.jpg'
    },
    {
      title: 'Commercial Office Tower Facade',
      url: '/src/assets/images/lusaka_commercial_building_1790707231897.jpg'
    }
  ];

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTag.trim()) return;
    if (!services.includes(newServiceTag.trim())) {
      setServices([...services, newServiceTag.trim()]);
    }
    setNewServiceTag('');
  };

  const handleRemoveService = (tagToRemove: string) => {
    setServices(services.filter(s => s !== tagToRemove));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) return;
    const newP: ProjectPhoto = {
      id: `p-${Date.now()}`,
      url: newPhotoUrl.trim(),
      title: newPhotoTitle.trim(),
      description: 'Verified contractor project completion.'
    };
    setPhotos([...photos, newP]);
    setNewPhotoUrl('');
    setNewPhotoTitle('');
  };

  const handleSelectPresetPhoto = (preset: { title: string; url: string }) => {
    const newP: ProjectPhoto = {
      id: `p-${Date.now()}`,
      url: preset.url,
      title: preset.title,
      description: 'Zambian site execution.'
    };
    setPhotos([...photos, newP]);
  };

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Company = {
      ...company,
      name,
      town,
      category,
      nccGrade,
      phone,
      whatsapp,
      email,
      address,
      shortBio,
      fullDescription,
      services,
      photos,
    };
    onUpdateCompany(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">Company profile updated successfully!</span>
        </div>
      )}

      {/* Trial Status Banner */}
      {company.status === 'Active Trial' ? (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white p-5 sm:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Free Trial Active</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              30-Day Free Trial Active — {company.trialDaysLeft} Days Remaining
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Your company is actively receiving inbound leads on WhatsApp. Keep your priority position and verified badge by selecting a subscription plan.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onNavigateToPricing}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs shadow-sm transition-all whitespace-nowrap"
            >
              Upgrade Plan
            </button>
            <button
              onClick={() => onViewStorefrontProfile(company)}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>View Public Card</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-900 text-white p-5 sm:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{company.plan} Active Plan</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {company.name} — Verified Active Member
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Your listings have top visibility across search rankings for {company.category} in {company.town}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewStorefrontProfile(company)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>Live Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">WhatsApp Leads</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {company.leadClicks}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Direct quote clicks</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Profile Views</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {company.viewsCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Directory impressions</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Client Rating</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums flex items-center gap-1.5">
            {company.rating.toFixed(1)}
            <span className="text-xs text-slate-400 font-normal">({company.reviewsCount})</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Verified reviews</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">NCC Status</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">
            {company.nccGrade}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Verified & Active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Profile Details Editor */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Company Details Editor</h3>
                <p className="text-xs text-slate-500 mt-0.5">Keep your contact lines and NCC grade up-to-date for RFQs.</p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters Town</label>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value as Town)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                >
                  {TOWNS.filter(t => t !== 'All Towns').map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                >
                  {CATEGORIES.filter(c => c !== 'All Categories').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">National Council for Construction (NCC) Grade</label>
                <select
                  value={nccGrade}
                  onChange={(e) => setNccGrade(e.target.value as NCCGrade)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-800"
                >
                  {NCC_GRADES.filter(g => g !== 'All Grades').map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Dispatch Line</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Office Telephone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Short Directory Tagline / Bio</label>
              <textarea
                rows={2}
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Detailed Capabilities</label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              ></textarea>
            </div>

            {/* Service Tags Editor */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-700">Services Offered</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {services.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(tag)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom capability (e.g. Concrete Pumping)"
                  value={newServiceTag}
                  onChange={(e) => setNewServiceTag(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save All Changes</span>
              </button>
            </div>
          </form>

          {/* Portfolio Photo Uploader & Gallery Manager */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Portfolio Gallery Manager</h3>
              <p className="text-xs text-slate-500 mt-0.5">High-quality project photos increase client quote inquiries by 3.4x.</p>
            </div>

            {/* Existing photos preview grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {photos.map((p) => (
                <div key={p.id} className="relative rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 aspect-[4/3]">
                  <img
                    src={p.url}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                    <p className="text-xs font-semibold leading-tight line-clamp-1">{p.title}</p>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(p.id)}
                      className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Presets for Demo */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Quick Add Zambian Project Photos (Presets):</span>
              <div className="flex flex-wrap gap-2">
                {samplePhotoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPresetPhoto(preset)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL addition */}
            <form onSubmit={handleAddPhoto} className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-700 block">Or Add Custom Photo URL:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Photo Title (e.g. Ndola Substation)"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
                <input
                  type="url"
                  placeholder="https://... image URL"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo to Gallery</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Subscription Plan Card & Tips */}
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Subscription Status</span>
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                company.status === 'Paid' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {company.status}
              </span>
            </div>

            <div>
              <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">{company.plan}</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {company.status === 'Active Trial' 
                  ? `${company.trialDaysLeft} days remaining on free trial` 
                  : 'Active auto-renewing listing'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified NCC Grade Badge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Lead Link</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Up to {photos.length} Project Photos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Search placement in {company.town}</span>
              </div>
            </div>

            <button
              onClick={onNavigateToPricing}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upgrade / Manage Plan</span>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="p-5 rounded-3xl bg-slate-100/80 border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Contractor Best Practices</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a client taps your WhatsApp button, reply within 15 minutes with your official NCC registration number and portfolio PDF to maximize your bid conversion rate.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
