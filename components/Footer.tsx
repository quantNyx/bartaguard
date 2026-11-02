'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-[#090D1A] pt-12 pb-8 text-slate-400 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-10 md:grid-cols-12 pb-10 border-b border-slate-800/80">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-900/40">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white">
                BartaGuard <span className="text-violet-400">(বার্তাগার্ড)</span>
              </span>
            </Link>

            <p className="text-xs font-semibold text-violet-300">
              {language === 'bn' ? 'বোঝার আগে বিশ্বাস নয়।' : 'Understand Before You Trust.'}
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {language === 'bn'
                ? 'সাধারণ গ্রাহকদের ডিজিটাল প্রতারণা, ফিশিং ও ভুয়া অফারের ক্ষতি থেকে রক্ষা করতে নিবেদিত বাংলা-প্রথম এআই ডিজিটাল সেফটি প্ল্যাটফর্ম।'
                : 'A Bangla-first AI digital safety assistant designed to help consumers spot suspicious messages, phishing, and fake recruitment.'}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#scanner" className="hover:text-violet-400 transition-colors">
                  {t('navScanner')}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-violet-400 transition-colors">
                  {t('navHowItWorks')}
                </a>
              </li>
              <li>
                <a href="#scenarios" className="hover:text-violet-400 transition-colors">
                  {t('navScenarios')}
                </a>
              </li>
              <li>
                <a href="#scam-guide" className="hover:text-violet-400 transition-colors">
                  {t('navGuide')}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-violet-400 transition-colors">
                  {t('navPrivacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Official Buildathon Sticker & Attribution (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              {language === 'bn' ? 'বিল্ডাথন স্বীকৃতি' : 'Buildathon Recognition'}
            </h4>
            
            {/* Official Sticker */}
            <div className="relative h-14 w-60 overflow-hidden rounded-xl border border-slate-700 bg-slate-900/90 p-2 shadow-lg">
              <Image
                src="/images/aignite-buildathon-sticker.png"
                alt="Built For Ostad Presents YUNet AIgnite Buildathon 2026 - National AI Hackathon for B2C Solutions"
                fill
                sizes="240px"
                className="object-contain"
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              {t('builtFor')}
            </p>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-6 space-y-4">
          <p className="text-[11px] leading-relaxed text-slate-500">
            {t('footerDisclaimer')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-800/60">
            <div>
              &copy; 2026 BartaGuard (বার্তাগার্ড). {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <span>{language === 'bn' ? 'ডিজিটাল নিরাপত্তার জন্য নিবেদিত' : 'Built for consumer digital safety'}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
