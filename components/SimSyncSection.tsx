'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Smartphone,
  Radio,
  Cpu,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Check,
  Bell,
  ArrowRight,
  Sparkles,
  Zap,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SimSyncSection() {
  const { language, t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [simMessageActive, setSimMessageActive] = useState(false);
  const [isScanningSim, setIsScanningSim] = useState(false);

  const handleSimulateSms = () => {
    setSimMessageActive(false);
    setIsScanningSim(true);

    setTimeout(() => {
      setIsScanningSim(false);
      setSimMessageActive(true);
    }, 600);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8B5CF6', '#06B6D4', '#10B981']
      });
    } catch {
      // Ignore
    }
  };

  return (
    <section id="sim-sync" className="relative scroll-mt-20 py-16 lg:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-r from-violet-600/10 via-cyan-600/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-3 backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>{t('simSyncBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('simSyncTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {t('simSyncSubtitle')}
          </p>
        </div>

        {/* 2-Column Showcase: Interactive Phone Mockup on Left + 3 Pillars on Right */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column (5 cols): Interactive Smartphone SIM Interception Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] rounded-[40px] border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl shadow-violet-950/60 ring-1 ring-white/10">
              
              {/* Phone Notch & Speaker */}
              <div className="mx-auto mb-3 h-4 w-28 rounded-full bg-slate-800 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                <span className="h-1.5 w-8 rounded-full bg-slate-900" />
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-2 text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-900">
                <div className="flex items-center gap-1">
                  <Radio className="h-3 w-3 text-cyan-400" />
                  <span className="font-semibold text-slate-300">GP / BL 4G</span>
                </div>
                <span>10:48 AM</span>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>

              {/* App Screen Container */}
              <div className="relative mt-3 min-h-[380px] rounded-2xl bg-[#0B1020] p-3.5 border border-slate-800/90 flex flex-col justify-between">
                
                {/* Active Guard Status Chip */}
                <div>
                  <div className="flex items-center justify-between rounded-xl bg-violet-950/60 border border-violet-800/50 p-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400 animate-ping" />
                      <div>
                        <div className="text-[11px] font-bold text-white">
                          BartaGuard SIM Shield
                        </div>
                        <div className="text-[9px] text-emerald-400 font-medium">
                          {language === 'bn' ? 'অ্যাক্টিভ ব্যাকগ্রাউন্ড মনিটরিং' : 'Active Background Receiver'}
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                      ON
                    </span>
                  </div>

                  {/* Incoming SMS Notification Simulator Popup */}
                  {simMessageActive && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-4 duration-300 rounded-xl border border-rose-500/50 bg-rose-950/80 p-3 shadow-xl backdrop-blur-md">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400 mt-0.5 animate-bounce" />
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-rose-300">
                              {language === 'bn' ? 'সরাসরি সিম সতর্কতা (INTERCEPTED)' : 'SIM THREAT INTERCEPTED'}
                            </span>
                            <span className="text-[9px] text-slate-400">Just now</span>
                          </div>

                          <p className="mt-1 text-[11px] text-slate-100 font-medium leading-snug">
                            &ldquo;bKash: আপনার একাউন্ট স্থগিত। পিন দিন: bkash-fake.net&rdquo;
                          </p>

                          <div className="mt-2 rounded-lg bg-black/40 border border-rose-500/30 p-1.5 text-[10px] text-rose-200">
                            <strong>{language === 'bn' ? 'ফলাফল:' : 'AI Verdict:'}</strong>{' '}
                            {language === 'bn'
                              ? 'মারাত্মক ফিশিং ফাঁদ! লিংকটি ব্লক করা হয়েছে।'
                              : 'High risk phishing trap blocked!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isScanningSim && (
                    <div className="mt-4 flex flex-col items-center justify-center p-6 text-center">
                      <div className="h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs text-cyan-300 font-medium">
                        {language === 'bn' ? 'সিম এসএমএস স্ক্যান করা হচ্ছে...' : 'Intercepting incoming SMS...'}
                      </span>
                    </div>
                  )}

                  {!simMessageActive && !isScanningSim && (
                    <div className="mt-6 text-center p-4 rounded-xl border border-dashed border-slate-800 text-slate-400 text-xs">
                      <Bell className="h-6 w-6 text-slate-600 mx-auto mb-2" />
                      <p>
                        {language === 'bn'
                          ? 'নিচের বাটনে চাপ দিয়ে ফোনে একটি ফেক বিকাশ এসএমএস আসার দৃশ্য পরীক্ষা করুন।'
                          : 'Click below to simulate an incoming scam SMS on the SIM card.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Simulator Trigger Button */}
                <div className="pt-3 border-t border-slate-900">
                  <button
                    type="button"
                    onClick={handleSimulateSms}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-950/40 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>{t('simTestBtn')}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): The 3 Strategic Engineering Pillars */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Pillar 1: Android Background Receiver */}
            <div className="rounded-3xl border border-slate-800 bg-[#12182F]/80 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-violet-500/50 hover:bg-[#161F3D]">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-violet-500/30 bg-violet-950/50 p-3 text-violet-400 shrink-0">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t('simPillar1Title')}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t('simPillar1Desc')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-violet-300">
                    <span className="rounded-md border border-violet-800/60 bg-violet-950/30 px-2 py-0.5">
                      android.permission.RECEIVE_SMS
                    </span>
                    <span className="rounded-md border border-violet-800/60 bg-violet-950/30 px-2 py-0.5">
                      BartaGuard Rest API Endpoint
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: WhatsApp & Telegram Bot */}
            <div className="rounded-3xl border border-slate-800 bg-[#12182F]/80 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:bg-[#161F3D]">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/50 p-3 text-cyan-400 shrink-0">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t('simPillar2Title')}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t('simPillar2Desc')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-cyan-300">
                    <span className="rounded-md border border-cyan-800/60 bg-cyan-950/30 px-2 py-0.5">
                      WhatsApp Cloud Webhook
                    </span>
                    <span className="rounded-md border border-cyan-800/60 bg-cyan-950/30 px-2 py-0.5">
                      Telegram Bot API
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Telco Gateway / MNO */}
            <div className="rounded-3xl border border-slate-800 bg-[#12182F]/80 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:bg-[#161F3D]">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/50 p-3 text-emerald-400 shrink-0">
                  <Radio className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t('simPillar3Title')}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t('simPillar3Desc')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-300">
                    <span className="rounded-md border border-emerald-800/60 bg-emerald-950/30 px-2 py-0.5">
                      SMPP Gateway Integration
                    </span>
                    <span className="rounded-md border border-emerald-800/60 bg-emerald-950/30 px-2 py-0.5">
                      BTRC Compliance Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Early Access Beta Signup Card */}
            <div className="rounded-3xl border border-violet-500/40 bg-gradient-to-r from-violet-950/40 to-slate-900 p-5 sm:p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>{t('simWaitlistTitle')}</span>
              </h4>
              <p className="mt-1 text-xs text-slate-300">
                {t('simWaitlistDesc')}
              </p>

              {submitted ? (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 p-3 text-xs text-emerald-300">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>{t('simWaitlistSuccess')}</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="mt-3 flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={t('simWaitlistInputPlaceholder')}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors shadow-md active:scale-95"
                  >
                    <span>{t('simWaitlistBtn')}</span>
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
