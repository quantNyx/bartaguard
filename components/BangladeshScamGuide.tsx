'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, AlertCircle, Smartphone, Award, Truck, DollarSign } from 'lucide-react';

export default function BangladeshScamGuide() {
  const { language, t } = useLanguage();

  const guides = [
    {
      icon: <Smartphone className="h-5 w-5 text-rose-400" />,
      title_bn: 'বিকাশ / নগদ পিন ও ওটিপি হ্যাকিং',
      title_en: 'bKash / Nagad PIN & OTP Theft',
      pattern_bn: 'প্রতারক কল দিয়ে বা এসএমএস পাঠিয়ে বলে "আপনার অ্যাকাউন্ট ব্লক হয়েছে" অথবা "ভুল করে টাকা চলে গেছে"। এরপর ওটিপি বা পিন নম্বর জানতে চায়।',
      pattern_en: 'Scammer calls claiming account blocked or wrong transfer, then asks for OTP or PIN.',
      rule_bn: 'মনে রাখবেন: বিকাশ বা নগদ কখনোই গ্রাহকের পিন নম্বর জানতে চায় না।',
      rule_en: 'Rule: Official MFS providers never ask for your PIN under any circumstance.'
    },
    {
      icon: <DollarSign className="h-5 w-5 text-amber-400" />,
      title_bn: 'টেলিগ্রাম ও ইউটিউব লাইক টাস্ক স্ক্যাম',
      title_en: 'Telegram Task-Based Job Fraud',
      pattern_bn: 'সহজে ঘরে বসে পার্ট-টাইম কাজের বিজ্ঞাপন দিয়ে প্রথমে সামান্য লাভ দেয়, পরে বড় অঙ্কের "ভিআইপি টাস্ক ডিপোজিট" বা রেজিস্ট্রেশন ফি নিয়ে লাপাত্তা হয়।',
      pattern_en: 'Lures users with simple YouTube like tasks, pays a small initial bonus, then demands hefty deposits.',
      rule_bn: 'কখনোই চাকরির জন্য অগ্রিম কোনো টাকা বা সিকিউরিটি ডিপোজিট দেবেন না।',
      rule_en: 'Rule: Never pay upfront money or deposits to secure any job.'
    },
    {
      icon: <Truck className="h-5 w-5 text-indigo-400" />,
      title_bn: 'কুরিয়ার পার্সেল বকেয়া চার্জের ভুয়া এসএমএস',
      title_en: 'Courier Delivery Fake Fee Scam',
      pattern_bn: 'পার্সেল আটকে থাকার কথা বলে ২০-৬০ টাকা বকেয়া চার্জ পরিশোধের জন্য bit.ly বা অপরিচিত লিংক পাঠানো হয় যেখানে কার্ড বা বিকাশ পিন চাওয়া হয়।',
      pattern_en: 'Sends fake SMS claiming small pending parcel fee with an unverified link to capture card or MFS PINs.',
      rule_bn: 'কুরিয়ার চার্জের জন্য আসা অপরিচিত লিংকে ক্লিক করে কখনো পিন বা পাসওয়ার্ড দেবেন না।',
      rule_en: 'Rule: Never enter payment PINs on untrusted links received via SMS.'
    },
    {
      icon: <Award className="h-5 w-5 text-violet-400" />,
      title_bn: 'টেলিকম লটারি ও ধামাকা প্রাইজ স্ক্যাম',
      title_en: 'Lottery & Anniversary Prize Fraud',
      pattern_bn: 'গ্রামীনফোন, রবি বা সরকারি কোনো সংস্থার নাম ভাঙিয়ে ৫০,০০০ টাকা বা বাইক জেতার মিথ্যা দাবি করে পুরস্কার ছাড়ানোর ফি বাবদ টাকা চাওয়া হয়।',
      pattern_en: 'Claims you won a massive lottery or bike, asking for processing/tax fees to release the prize.',
      rule_bn: 'যে লটারিতে আপনি অংশ নেননি, সেখানে কখনোই আপনি বিজয়ী হতে পারেন না।',
      rule_en: 'Rule: You cannot win a contest or lottery you never participated in.'
    }
  ];

  return (
    <section id="scam-guide" className="relative scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-300 mb-3">
            <AlertCircle className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('navGuide')}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('guideHeading')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            {t('guideSubheading')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-800 bg-[#12182F]/80 p-6 backdrop-blur-xl transition-colors hover:border-slate-700"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-2.5">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? item.title_bn : item.title_en}
                </h3>
              </div>

              <div className="mt-3.5 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-slate-400 font-medium">
                    {language === 'bn' ? 'প্রতারণার ধরন:' : 'Tactic:'}{' '}
                  </strong>
                  {language === 'bn' ? item.pattern_bn : item.pattern_en}
                </p>
                <div className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-2.5 text-violet-300 font-medium">
                  {language === 'bn' ? item.rule_bn : item.rule_en}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
