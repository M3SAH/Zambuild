import React, { useState } from 'react';
import { Company, Town, Category, NCCGrade, UserAccount } from '../types';
import { TOWNS, CATEGORIES, NCC_GRADES } from '../data/mockData';
import { 
  Building2, 
  CheckCircle, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

interface OnboardingViewProps {
  onRegisterCompany: (company: Partial<Company>, user: UserAccount) => void;
  onLoginDemo: (companyId: string) => void;
  companies: Company[];
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onRegisterCompany,
  onLoginDemo,
  companies,
}) => {
  const [mode, setMode] = useState<'register' | 'signin'>('register');
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: User Account State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Step 2: Company Setup State
  const [companyName, setCompanyName] = useState('');
  const [town, setTown] = useState<Town>('Kitwe');
  const [category, setCategory] = useState<Category>('Building & Civil');
  const [nccGrade, setNccGrade] = useState<NCCGrade>('NCC Grade 3');
  const [shortBio, setShortBio] = useState('');
  const [servicesInput, setServicesInput] = useState('');

  // Sign In state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !whatsapp) return;
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !shortBio) return;

    const services = servicesInput
      ? servicesInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['Civil Engineering', 'General Contracting', 'Site Works'];

    const newCompany: Partial<Company> = {
      name: companyName,
      town,
      category,
      nccGrade,
      shortBio,
      fullDescription: `${companyName} is an NCC certified contractor registered in ${town}, Zambia. Providing professional ${category} solutions.`,
      services,
      phone: whatsapp,
      whatsapp: whatsapp.startsWith('+') ? whatsapp : `+260${whatsapp.replace(/^0/, '')}`,
      email,
      address: `Industrial Site, ${town}, Zambia`,
      isVerified: true,
      isFeatured: false,
      status: 'Active Trial',
      plan: 'Free Trial',
      trialDaysLeft: 30,
      leadClicks: 0,
      viewsCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      joinedDate: 'Oct 2026',
      photos: [
        {
          id: `photo-${Date.now()}`,
          url: '/src/assets/images/hero_lusaka_construction_1790707183929.jpg',
          title: `${companyName} Active Operations`,
          description: 'Verified Zambian project site execution.'
        }
      ]
    };

    const user: UserAccount = {
      fullName,
      email,
      phone: whatsapp,
      isLoggedIn: true,
    };

    onRegisterCompany(newCompany, user);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pick the first company or match
    const found = companies.find(c => c.email.toLowerCase() === loginEmail.toLowerCase()) || companies[0];
    onLoginDemo(found.id);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      
      {/* Mode Switcher */}
      <div className="flex justify-center mb-6">
        <div className="p-1 bg-slate-100 rounded-2xl flex items-center border border-slate-200/80">
          <button
            onClick={() => setMode('register')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register Company (Free Trial)
          </button>
          <button
            onClick={() => setMode('signin')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vendor Sign In
          </button>
        </div>
      </div>

      {mode === 'register' ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Header & Step Tracker */}
          <div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                30-Day Free Trial Included
              </span>
              <span className="text-xs font-semibold text-slate-400">Step {step} of 2</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-2">
              {step === 1 ? 'Create Your Vendor Account' : 'Company Quick-Setup'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {step === 1 
                ? 'Takes under 60 seconds. No credit card required.'
                : 'Provide your NCC Grade & details to activate direct WhatsApp leads.'}
            </p>

            {/* Stepper Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
          </div>

          {step === 1 ? (
            /* STEP 1: USER ACCOUNT */
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Representative Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kabwe Mulenga"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="kabwe@copperbeltcivil.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Direct WhatsApp Number (For Client Leads)</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="+260 97 7123456"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Prospective clients will quote you directly on this WhatsApp line.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Company Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: COMPANY QUICK-SETUP */
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Registered Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mulenga & Sons Engineering Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters Town</label>
                  <select
                    value={town}
                    onChange={(e) => setTown(e.target.value as Town)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  >
                    {TOWNS.filter(t => t !== 'All Towns').map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  >
                    {CATEGORIES.filter(c => c !== 'All Categories').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">National Council for Construction (NCC) Grade</label>
                <select
                  value={nccGrade}
                  onChange={(e) => setNccGrade(e.target.value as NCCGrade)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-800"
                >
                  {NCC_GRADES.filter(g => g !== 'All Grades').map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Company Bio (1–2 sentences)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Specializing in commercial concrete foundations, road paving, and structural steel in Kitwe."
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Key Services (comma separated)</label>
                <input
                  type="text"
                  placeholder="Road Paving, Bridge Construction, Bulk Earthworks"
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">30-Day Free Trial will start immediately!</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Your profile goes live on ZamBuild Directory immediately. Upgrade or cancel anytime.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate 30-Day Free Trial</span>
                </button>
              </div>
            </form>
          )}

        </div>
      ) : (
        /* VENDOR SIGN IN MODE */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Vendor Sign In</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Access your vendor dashboard, view lead metrics, and manage portfolio photos.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vendor Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="tenders@copperbeltcivil.zm"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-3 text-center">Or test as an existing contractor:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {companies.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onLoginDemo(c.id)}
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors flex items-center justify-between group"
                >
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold text-slate-800 truncate">{c.name}</p>
                    <p className="text-[10px] text-slate-500">{c.town} · {c.nccGrade}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
