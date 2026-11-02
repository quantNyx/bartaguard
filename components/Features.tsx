'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Camera, Languages, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function Features() {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-violet-400" />,
      title_bn: 'উন্নত এআই বিশ্লেষণ ইঞ্জিন',
      title_en: 'Advanced AI Analysis Engine',
      desc_bn: 'গুগল জেমিনাই এর শক্তিশালী ভাষা মডেলের সাহায্যে যেকোনো সন্দেহজনক মেসেজের অন্তর্নিহিত ঝুঁকি ও ফাঁদ শনাক্ত করে।',
      desc_en: 'Powered by Google Gemini to analyze linguistic patterns, pressure tactics, and deceptive intent.'
    },
    {
      icon: <Camera className="h-6 w-6 text-cyan-400" />,
      title_bn: 'মাল্টিমোডাল স্ক্রিনশট রিডিং',
      title_en: 'Multimodal Screenshot Vision',
      desc_bn: 'টাইপ করার ঝামেলা ছাড়াই সরাসরি ইনবক্স বা চ্যাটের স্ক্রিনশট আপলোড করে তাৎক্ষণিক রিপোর্ট পাওয়া যায়।',
      desc_en: 'Upload inbox screenshots directly without tedious manual typing, capturing UI cues and text simultaneously.'
    },
    {
      icon: <Languages className="h-6 w-6 text-emerald-400" />,
      title_bn: 'বাংলা ও বাংলিশে প্রথম অগ্রাধিকার',
      title_en: 'Bangla & Banglish First',
      desc_bn: 'রোবটিক অনুবাদের বদলে খাঁটি ঘরোয়া বাংলায় এমনভাবে ব্যাখ্যা দেয় যাতে যেকোনো বয়সের সাধারণ মানুষ সহজে বুঝতে পারেন।',
      desc_en: 'Designed with native colloquial Bengali understanding, bypassing literal or awkward machine translations.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
      title_bn: 'সুনির্দিষ্ট প্রমাণের উদ্ধৃতি',
      title_en: 'Evidence-Backed Red Flags',
      desc_bn: 'কাল্পনিক কোনো পরিসংখ্যান নয়; মেসেজের ঠিক কোন শব্দ বা লিংকের কারণে ঝুঁকি সৃষ্টি হয়েছে তা সরাসরি তুলে ধরে।',
      desc_en: 'Cites exact quotes and observed text rather than displaying vague probabilistic guessing.'
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-amber-400" />,
      title_bn: 'বাস্তবসম্মত করণীয় তালিকা',
      title_en: 'Actionable Safety Checklist',
      desc_bn: 'কী করা উচিত এবং কী পরিহার করতে হবে তার স্পষ্ট নির্দেশিকা প্রদান করে আর্থিক ক্ষতি এড়াতে সাহায্য করে।',
      desc_en: 'Clear, prioritized defensive steps for the consumer to take immediately.'
    },
    {
      icon: <Lock className="h-6 w-6 text-rose-400" />,
      title_bn: 'প্রাইভেসি ও জিরো রিটেনশন পলিসি',
      title_en: 'Privacy & Zero Data Retention',
      desc_bn: 'আপনার কোনো ব্যক্তিগত মেসেজ বা স্ক্রিনশট সার্ভারে বা ডাটাবেজে সংরক্ষণ করা হয় না।',
      desc_en: 'Your sensitive communications are never stored in databases or logged permanently.'
    }
  ];

  return (
    <section id="features" className="relative scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('navFeatures')}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('featuresHeading')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            {t('featuresSubheading')}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-800 bg-[#12182F]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:bg-[#161F3D]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 mb-5">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? feat.title_bn : feat.title_en}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {language === 'bn' ? feat.desc_bn : feat.desc_en}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
