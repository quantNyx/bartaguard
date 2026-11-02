'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, ShieldCheck, Database, FileCheck, EyeOff } from 'lucide-react';

export default function PrivacyManifesto() {
  const { language, t } = useLanguage();

  return (
    <section id="privacy" className="relative scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/20 via-[#12182F] to-[#0E152C] p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <div className="rounded-2xl border border-violet-500/30 bg-violet-950/60 p-3.5 text-violet-400">
              <EyeOff className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {t('privacyHeading')}
              </h2>
              <p className="text-sm text-violet-300/90 mt-0.5">
                {t('privacySubheading')}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
              <Database className="h-5 w-5 shrink-0 text-cyan-400 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'জিরো ডাটাবেজ স্টোরেজ' : 'Zero Database Retention'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {t('privacyP1')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
              <Lock className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'মেমোরিতে তাৎক্ষণিক ধ্বংস' : 'Ephemeral In-Memory Lifecycle'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {t('privacyP2')}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
