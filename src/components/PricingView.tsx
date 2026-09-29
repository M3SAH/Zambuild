import React, { useState } from 'react';
import { Company, SubscriptionTier } from '../types';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Smartphone, 
  CreditCard, 
  Zap, 
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';

interface PricingViewProps {
  currentCompany: Company | null;
  onUpgradePlan: (plan: SubscriptionTier) => void;
  onNavigateToOnboarding: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  currentCompany,
  onUpgradePlan,
  onNavigateToOnboarding,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionTier | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | 'zamtel' | 'card'>('mtn');
  const [mobileNumber, setMobileNumber] = useState(currentCompany?.phone || '+260 97 7123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const plans = [
    {
      id: 'Starter' as SubscriptionTier,
      name: 'Starter Listing',
      monthlyPrice: 50,
      quarterlyPrice: 125, // saves ~15%
      popular: false,
      description: 'Essential directory presence for emerging local builders and trade contractors.',
      features: [
        'Standard directory listing in chosen town',
        'Direct WhatsApp lead quote button',
        'Up to 3 portfolio gallery photos',
        'Basic contact info & service tags',
        'Town & category indexing'
      ],
      cta: 'Choose Starter'
    },
    {
      id: 'Professional' as SubscriptionTier,
      name: 'Professional',
      monthlyPrice: 100,
      quarterlyPrice: 255, // saves 15%
      popular: true,
      description: 'High visibility for established Zambian contractors seeking consistent commercial inquiries.',
      features: [
        'Verified NCC trust badge & seal',
        'Priority search placement in category',
        'Up to 10 high-resolution project photos',
        'Direct client phone call button',
        'Monthly lead & impression metrics',
        'Prominent listing in town directory'
      ],
      cta: 'Choose Professional'
    },
    {
      id: 'Enterprise' as SubscriptionTier,
      name: 'Enterprise / Featured',
      monthlyPrice: 150,
      quarterlyPrice: 380, // saves ~15%
      popular: false,
      description: 'Maximum prominence for major civil engineering firms and heavy plant hire fleets.',
      features: [
        'Top-row homepage featured showcase',
        'Gold "Featured Contractor" badge',
        'Unlimited project portfolio photos',
        'Custom Direct RFQ lead form on profile',
        'Monthly performance & analytics report',
        'Dedicated directory concierge support',
        'Priority routing across North-Western & Copperbelt'
      ],
      cta: 'Choose Enterprise'
    }
  ];

  const handleStartCheckout = (planId: SubscriptionTier) => {
    setSelectedPlanForCheckout(planId);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      onUpgradePlan(selectedPlanForCheckout);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setSelectedPlanForCheckout(null);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Start with 30 Days Free · No Credit Card Required</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
          Transparent Subscription Plans for Zambian Contractors
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Gain direct commercial leads from mine expansion projects, civil infrastructure tenders, and property developers.
        </p>

        {/* Monthly vs. Quarterly Toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center border border-slate-200/80">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Quarterly</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Save 15%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((p) => {
          const price = billingCycle === 'monthly' ? p.monthlyPrice : p.quarterlyPrice;
          const isCurrentPlan = currentCompany?.plan === p.id && currentCompany?.status === 'Paid';

          return (
            <div
              key={p.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                p.popular
                  ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-102'
                  : 'bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md hover:shadow-lg'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Most Popular for Contractors
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  {isCurrentPlan && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold">
                      Current Plan
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 min-h-[32px] leading-relaxed">
                  {p.description}
                </p>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-slate-500">ZMW</span>
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                      K{price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      /{billingCycle === 'monthly' ? 'month' : 'quarter'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {billingCycle === 'quarterly' ? 'Billed every 3 months' : 'Billed monthly · Cancel anytime'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    What’s included:
                  </span>
                  <ul className="space-y-2.5">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                {currentCompany ? (
                  <button
                    onClick={() => handleStartCheckout(p.id)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      p.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{isCurrentPlan ? 'Renew Plan' : p.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToOnboarding}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Register with 30-Day Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Payment Security Assurance */}
      <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Official Zambian Mobile Money & Bank Payments</h4>
            <p className="text-xs text-slate-500 mt-0.5">Direct integration with MTN MoMo, Airtel Money, and Zambian Visa/Mastercards.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200">MTN MoMo</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200">Airtel Money</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200">Card</span>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirm Subscription</h3>
                <p className="text-xs text-slate-500">Upgrading to {selectedPlanForCheckout}</p>
              </div>
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="p-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Subscription Activated!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your company listing has been updated to {selectedPlanForCheckout}. Your verified badge and search priorities are live.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPayment} className="p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Selected Tier:</span>
                    <p className="text-sm font-bold text-slate-900">{selectedPlanForCheckout}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium">Amount Due:</span>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">
                      ZMW K{billingCycle === 'monthly' 
                        ? plans.find(p => p.id === selectedPlanForCheckout)?.monthlyPrice 
                        : plans.find(p => p.id === selectedPlanForCheckout)?.quarterlyPrice}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mtn')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        paymentMethod === 'mtn'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mb-1 text-amber-500" />
                      <span>MTN Mobile Money</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('airtel')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        paymentMethod === 'airtel'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mb-1 text-red-500" />
                      <span>Airtel Money</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('zamtel')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        paymentMethod === 'zamtel'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mb-1 text-emerald-600" />
                      <span>Zamtel Kwacha</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        paymentMethod === 'card'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mb-1 text-slate-700" />
                      <span>Visa / Mastercard</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {paymentMethod === 'card' ? 'Cardholder Phone Number' : 'Mobile Money Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                    placeholder="+260 97 1234567"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">A prompt will be sent to your handset to approve payment.</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing with Mobile Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Authorize Payment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
