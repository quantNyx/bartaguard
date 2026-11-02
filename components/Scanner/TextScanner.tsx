'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AnalysisResult } from '@/types/analysis';
import { Sparkles, Trash2, Clipboard, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface TextScannerProps {
  initialText?: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

export default function TextScanner({
  initialText = '',
  onAnalysisComplete,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage
}: TextScannerProps) {
  const { language, t } = useLanguage();
  const [inputText, setInputText] = useState(initialText);
  const [loadingStep, setLoadingStep] = useState(0);

  // Dynamic step message while analyzing
  const loadingSteps_bn = [
    'বার্তা পর্যবেক্ষণ করা হচ্ছে...',
    'ফিশিং ও আর্থিক ঝুঁকি পর্যালোচনা চলছে...',
    'নিরাপত্তা অডিট রিপোর্ট প্রস্তুত হচ্ছে...'
  ];
  const loadingSteps_en = [
    'Scanning message tokens...',
    'Evaluating fraud indicators...',
    'Generating security report...'
  ];

  React.useEffect(() => {
    if (isLoading) {
      setLoadingStep(0);
      const interval = setInterval(() => {
        setLoadingStep((s) => (s + 1) % 3);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Sync initialText if updated from sample scenarios
  React.useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  const handleClear = () => {
    setInputText('');
    setErrorMessage(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setErrorMessage(null);
      }
    } catch {
      setErrorMessage(
        language === 'bn'
          ? 'ক্লিপবোর্ড থেকে লেখা পড়তে ব্রাউজারের অনুমতি প্রয়োজন।'
          : 'Clipboard permission denied. Please paste manually.'
      );
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText || inputText.trim().length === 0) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে বিশ্লেষণ করার জন্য একটি মেসেজ বা লিংক লিখুন।'
          : 'Please enter a message or link to analyze.'
      );
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText.trim(),
          language: language
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        onAnalysisComplete(json.data);
      } else {
        setErrorMessage(
          (language === 'bn' ? json.error_bn : json.error) ||
          (language === 'bn' ? 'বিশ্লেষণ সম্পন্ন করা যায়নি।' : 'Failed to analyze text.')
        );
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(
        language === 'bn'
          ? 'সার্ভারের সাথে সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
          : error?.message || 'Network connection failed. Please retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAnalyze} className="space-y-4">
      
      {/* Input container */}
      <div className="relative rounded-2xl border border-slate-800 bg-[#0E152C]/90 p-4 transition-all focus-within:border-violet-500/70 focus-within:shadow-xl focus-within:shadow-violet-950/40">
        
        {/* Top toolbar */}
        <div className="flex items-center justify-between pb-3 text-xs text-slate-400 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            <span className="font-medium text-slate-300">
              {language === 'bn' ? 'মেসেজ বা টেক্সট ইনপুট (বাংলা / English / Banglish)' : 'Message Input (Bangla / English / Banglish)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Clipboard className="h-3 w-3" />
              <span>{t('pasteBtn')}</span>
            </button>
            {inputText.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2.5 py-1 text-slate-400 hover:bg-rose-950/60 hover:text-rose-300 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                <span>{t('clearBtn')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          placeholder={t('textPlaceholder')}
          className="mt-3 w-full resize-y bg-transparent text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        {/* Bottom character counter & language hint */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
          <span>
            {language === 'bn'
              ? 'বিকাশ, নগদ, কুরিয়ার বা ফেসবুক মেসেজের পুরো টেক্সট পেস্ট করুন'
              : 'Paste the entire suspicious SMS, job offer, or courier link'}
          </span>
          <span className="font-mono text-slate-400">
            {inputText.length} {t('charCount')}
          </span>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || inputText.trim().length === 0}
          className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
              <span className="text-xs sm:text-sm font-medium text-cyan-100">
                {language === 'bn' ? loadingSteps_bn[loadingStep] : loadingSteps_en[loadingStep]}
              </span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>{t('analyzeBtn')}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

    </form>
  );
}
