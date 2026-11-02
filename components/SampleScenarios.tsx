'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { sampleScenarios, SampleScenario } from '@/data/sampleScenarios';
import {
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  Truck,
  ShoppingBag,
  CreditCard
} from 'lucide-react';

interface SampleScenariosProps {
  onSelectScenario: (text: string) => void;
}

export default function SampleScenarios({ onSelectScenario }: SampleScenariosProps) {
  const { language, t } = useLanguage();

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'financial-impersonation':
        return <CreditCard className="h-5 w-5 text-rose-400" />;
      case 'fake-recruitment':
        return <Briefcase className="h-5 w-5 text-amber-400" />;
      case 'delivery-scam':
        return <Truck className="h-5 w-5 text-indigo-400" />;
      case 'shopping-fraud':
        return <ShoppingBag className="h-5 w-5 text-violet-400" />;
      case 'legitimate-notification':
      default:
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
    }
  };

  const getRiskBadge = (risk: 'high' | 'medium' | 'low') => {
    if (risk === 'high') {
      return (
        <span className="rounded-full border border-rose-500/30 bg-rose-950/40 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
          {language === 'bn' ? 'উচ্চ ঝুঁকি (Scam)' : 'High Risk (Scam)'}
        </span>
      );
    }
    return (
      <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
        {language === 'bn' ? 'নিরাপদ (Safe)' : 'Safe Notification'}
      </span>
    );
  };

  return (
    <section id="scenarios" className="relative scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('scenariosHeading')}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {language === 'bn' ? 'বাস্তব ঘটনার ৫টি নমুনা সরাসরি পরীক্ষা করুন' : 'Test 5 Realistic Scenarios Live with AI'}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto">
            {t('scenariosSubheading')}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sampleScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#12182F]/80 p-5 transition-all duration-300 hover:border-violet-500/50 hover:bg-[#161F3D] hover:shadow-xl hover:shadow-violet-950/30 backdrop-blur-xl"
            >
              <div>
                {/* Header of card: Icon + Category + Risk Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-2">
                      {getScenarioIcon(scenario.id)}
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      {language === 'bn' ? scenario.category_bn : scenario.category_en}
                    </span>
                  </div>
                  {getRiskBadge(scenario.risk_expected)}
                </div>

                {/* Scenario Title */}
                <h3 className="mt-3.5 text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {language === 'bn' ? scenario.title_bn : scenario.title_en}
                </h3>

                {/* Snippet preview */}
                <div className="mt-2.5 rounded-xl border border-slate-800/90 bg-slate-950/70 p-3 text-xs font-mono text-slate-300 line-clamp-3 leading-relaxed">
                  &ldquo;{scenario.text}&rdquo;
                </div>

                <p className="mt-2.5 text-xs text-slate-400 leading-normal">
                  {language === 'bn' ? scenario.description_bn : scenario.description_en}
                </p>
              </div>

              {/* Action Button: Load into Scanner */}
              <div className="mt-5 pt-3 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => onSelectScenario(scenario.text)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:border-violet-500 hover:bg-violet-600 hover:text-white active:scale-95 shadow-sm"
                >
                  <span>{t('testScenarioBtn')}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
