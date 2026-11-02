'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Lock, Eye, AlertOctagon, CheckCircle2, ArrowRight, Sparkles, MessageSquareWarning, Zap } from 'lucide-react';

export default function Hero() {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-violet-600/15 via-indigo-600/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-60 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        

        {/* Hero Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="text-center lg:col-span-7 lg:text-left">
            
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 mb-5">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t('heroBadge')}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              {language === 'bn' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                    বোঝার আগে
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
                    বিশ্বাস নয়।
                  </span>
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                    Not Every Message
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
                    Deserves Your Trust.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 text-base text-slate-300 sm:text-lg sm:leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('heroSubheading')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#scanner"
                className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-900/40 transition-all hover:shadow-violet-900/60 hover:brightness-110 active:scale-95"
              >
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span>{t('heroAnalyzeBtn')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#how-it-works"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
              >
                <span>{t('heroHowItWorksBtn')}</span>
              </a>
            </div>

            {/* Micro Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{t('heroStat1')}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('heroStat1Desc')}</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                  <Shield className="h-3.5 w-3.5" />
                  <span>{t('heroStat2')}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('heroStat2Desc')}</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{t('heroStat3')}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('heroStat3Desc')}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Security Scanner Simulation Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-violet-500/30 bg-[#12182F]/90 p-5 shadow-2xl shadow-violet-950/50 backdrop-blur-xl">
              
              {/* Header of simulated scanner */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-rose-500/80 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-300">
                    {language === 'bn' ? 'সরাসরি এআই হুমকি বিশ্লেষণ' : 'Real-time AI Threat Analysis'}
                  </span>
                </div>
                <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                  {language === 'bn' ? 'উচ্চ ঝুঁকি (HIGH RISK)' : 'HIGH RISK DETECTED'}
                </span>
              </div>

              {/* Sample incoming intercepted SMS preview */}
              <div className="mt-4 rounded-xl border border-slate-800/90 bg-slate-950/80 p-3.5 text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span className="text-cyan-400 font-semibold">SMS FROM: +88019XXXXXX</span>
                  <span>10:42 AM</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  &ldquo;bKash: আপনার একাউন্ট স্থগিত করা হয়েছে। ২৪ ঘণ্টার মধ্যে সচল করতে পিন ভেরিফাই করুন: <span className="text-rose-400 underline underline-offset-2">bkash-login24.net</span>&rdquo;
                </p>
              </div>

              {/* Laser scanning beam animation effect */}
              <div className="relative my-3 h-1 w-full overflow-hidden rounded bg-slate-800">
                <div className="h-full w-24 rounded bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[pulse_1.5s_infinite]" />
              </div>

              {/* Detected indicators preview */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 rounded-lg border border-rose-500/20 bg-rose-950/20 p-2.5">
                  <AlertOctagon className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-300">
                      {language === 'bn' ? 'ভুয়া বিকাশ ফিশিং ও পিন দাবি' : 'bKash Impersonation & PIN Request'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {language === 'bn'
                        ? 'বিকাশ কখনো লিংকে গিয়ে পিন ভেরিফাই করতে বলে না।'
                        : 'Official bKash never requests PINs over web links.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-950/20 p-2.5">
                  <MessageSquareWarning className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300">
                      {language === 'bn' ? 'অস্বাভাবিক কৃত্রিম তাড়াহুড়ো' : 'Artificial Urgency Tactic (24h)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {language === 'bn'
                        ? 'ভিকটিমকে দ্রুত ফাঁদে ফেলতে ২৪ ঘণ্টার চরম সময়সীমা দেওয়া হয়েছে।'
                        : 'Forces hurried compliance without careful verification.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Verification Footer */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-violet-950/40 border border-violet-800/40 px-3 py-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-violet-300 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
                  <span>Google Gemini 2.5/3.8 Flash Multimodal</span>
                </div>
                <span className="font-mono text-cyan-300 font-bold">Confidence: HIGH</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
