'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Cpu, Search, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const { language, t } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: <FileText className="h-6 w-6 text-violet-400" />,
      title: t('step1Title'),
      desc: t('step1Desc')
    },
    {
      number: '02',
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      title: t('step2Title'),
      desc: t('step2Desc')
    },
    {
      number: '03',
      icon: <Search className="h-6 w-6 text-rose-400" />,
      title: t('step3Title'),
      desc: t('step3Desc')
    },
    {
      number: '04',
      icon: <CheckCircle className="h-6 w-6 text-emerald-400" />,
      title: t('step4Title'),
      desc: t('step4Desc')
    }
  ];

  return (
    <section id="how-it-works" className="relative scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-300 mb-3">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('navHowItWorks')}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('howItWorksHeading')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            {t('howItWorksSubheading')}
          </p>
        </div>

        {/* 4 Steps Flow */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#12182F]/80 p-6 backdrop-blur-xl transition-all hover:border-violet-500/40 hover:bg-[#161F3D]"
            >
              <div>
                {/* Step number & icon */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-700">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
