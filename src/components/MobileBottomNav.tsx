import React from 'react';
import { ActiveTab } from '../types';
import { Compass, Tag, PlusCircle, LayoutDashboard, Shield } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      id: 'storefront' as ActiveTab,
      label: 'Directory',
      icon: Compass,
    },
    {
      id: 'pricing' as ActiveTab,
      label: 'Pricing',
      icon: Tag,
    },
    {
      id: 'onboarding' as ActiveTab,
      label: 'List Co.',
      icon: PlusCircle,
      isSpecial: true,
    },
    {
      id: 'dashboard' as ActiveTab,
      label: 'Portal',
      icon: LayoutDashboard,
    },
    {
      id: 'admin' as ActiveTab,
      label: 'Admin',
      icon: Shield,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-lg pb-safe">
      <nav className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] relative focus:outline-none"
                aria-label={tab.label}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center -mt-3 shadow-md transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25 scale-105'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald-300" />
                </div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-1 truncate ${
                    isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] relative focus:outline-none transition-colors"
              aria-label={tab.label}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight transition-colors ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 absolute bottom-1"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
