'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AnalysisResult } from '@/types/analysis';
import TextScanner from './TextScanner';
import ImageScanner from './ImageScanner';
import { MessageSquareText, Image as ImageIcon, ShieldAlert } from 'lucide-react';

interface ScannerContainerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  presetText?: string;
  activeTab: 'text' | 'image';
  setActiveTab: (tab: 'text' | 'image') => void;
}

export default function ScannerContainer({
  onAnalysisComplete,
  presetText,
  activeTab,
  setActiveTab
}: ScannerContainerProps) {
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <section id="scanner" className="relative scroll-mt-20 py-8 lg:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-300 mb-3">
            <ShieldAlert className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('scannerTitle')}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {language === 'bn' ? 'সন্দেহজনক বার্তা বা স্ক্রিনশট যাচাই করুন' : 'Inspect Suspicious Messages & Screenshots'}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            {t('scannerSubtitle')}
          </p>
        </div>

        {/* Main Card */}
        <div className="relative rounded-3xl border border-slate-800 bg-[#12182F]/90 p-5 sm:p-7 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
          
          {/* Ambient Card Glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-600/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-600/15 blur-2xl" />

          {/* Mode Tabs */}
          <div className="flex rounded-2xl border border-slate-800 bg-slate-950/80 p-1.5 mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('text');
                setErrorMessage(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquareText className="h-4 w-4" />
              <span>{t('tabText')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('image');
                setErrorMessage(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'image'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>{t('tabImage')}</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'text' ? (
            <TextScanner
              initialText={presetText}
              onAnalysisComplete={onAnalysisComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <ImageScanner
              onAnalysisComplete={onAnalysisComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}

        </div>

      </div>
    </section>
  );
}
