'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Globe, Menu, X, Sparkles, AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B1020]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-900/40 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
                BartaGuard
              </span>
              <span className="text-sm font-semibold text-violet-400">
                (বার্তাগার্ড)
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              {language === 'bn' ? 'বোঝার আগে বিশ্বাস নয়।' : 'Understand Before You Trust.'}
            </p>
          </div>
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          <a
            href="#scanner"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-violet-400"
          >
            {t('navScanner')}
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-violet-400"
          >
            {t('navHowItWorks')}
          </a>
          <a
            href="#scenarios"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-violet-400"
          >
            {t('navScenarios')}
          </a>
          <a
            href="#scam-guide"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-violet-400"
          >
            {t('navGuide')}
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-violet-400"
          >
            {t('navFeatures')}
          </a>
          <a
            href="#sim-sync"
            className="text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {t('navSimSync')}
          </a>
        </div>

        {/* Right Area: Buildathon Official Sticker + Language Switcher */}
        <div className="hidden items-center gap-4 md:flex">
          
          {/* Official AIgnite Buildathon 2026 Sticker */}
          <div
            className="group relative flex items-center rounded-xl border border-slate-700/60 bg-slate-900/60 p-1 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/40"
            title="Official project built for Ostad Presents YUNet AIgnite Buildathon 2026"
          >
            <div className="relative h-10 w-36 overflow-hidden rounded-lg sm:h-11 sm:w-44">
              <Image
                src="/images/aignite-buildathon-sticker.png"
                alt="Built For Ostad Presents YUNet AIgnite Buildathon 2026 - National AI Hackathon for B2C Solutions"
                fill
                priority
                sizes="(max-width: 768px) 140px, 176px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Bilingual Switcher Toggle */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-1 text-xs font-semibold">
            <button
              onClick={() => setLanguage('bn')}
              className={`rounded-lg px-2.5 py-1.5 transition-all ${
                language === 'bn'
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`rounded-lg px-2.5 py-1.5 transition-all ${
                language === 'en'
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Quick CTA to scanner */}
          <a
            href="#scanner"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-900/30 transition-all hover:from-violet-500 hover:to-indigo-500 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {language === 'bn' ? 'যাচাই করুন' : 'Scan Message'}
          </a>
        </div>

        {/* Mobile Hamburger & Language switcher */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-violet-300"
          >
            <Globe className="h-3.5 w-3.5" />
            {language === 'bn' ? 'English' : 'বাংলা'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#0E152C] px-4 pt-3 pb-6 lg:hidden">
          {/* Official Sticker on Mobile */}
          <div className="mb-4 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2">
            <div className="relative h-12 w-52 overflow-hidden">
              <Image
                src="/images/aignite-buildathon-sticker.png"
                alt="Built For Ostad Presents YUNet AIgnite Buildathon 2026"
                fill
                sizes="208px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#scanner"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {t('navScanner')}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {t('navHowItWorks')}
            </a>
            <a
              href="#scenarios"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {t('navScenarios')}
            </a>
            <a
              href="#scam-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {t('navGuide')}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {t('navFeatures')}
            </a>
            <a
              href="#sim-sync"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cyan-300 hover:bg-slate-800 flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {t('navSimSync')}
            </a>
            <a
              href="#scanner"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/30"
            >
              <Sparkles className="h-4 w-4" />
              {language === 'bn' ? 'মেসেজ যাচাই শুরু করুন' : 'Start Analyzing'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
