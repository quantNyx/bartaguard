'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { AnalysisResult } from '@/types/analysis';
import { UploadCloud, Image as ImageIcon, Trash2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface ImageScannerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

export default function ImageScanner({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage
}: ImageScannerProps) {
  const { language, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [fileMeta, setFileMeta] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps_bn = [
    'স্ক্রিনশটের লেখা ও ভিজ্যুয়াল ডেটা পড়া হচ্ছে...',
    'ফিশিং ও ভুয়া লোগো/ব্র্যান্ডিং যাচাই চলছে...',
    'নিরাপত্তা অডিট রিপোর্ট প্রস্তুত হচ্ছে...'
  ];
  const loadingSteps_en = [
    'Reading screenshot OCR & UI cues...',
    'Checking deceptive branding & links...',
    'Finalizing safety report...'
  ];

  useEffect(() => {
    if (isLoading) {
      setLoadingStep(0);
      const timer = setInterval(() => {
        setLoadingStep((s) => (s + 1) % 3);
      }, 700);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  // Process chosen file
  const processFile = useCallback((file: File) => {
    setErrorMessage(null);

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        language === 'bn'
          ? 'শুধুমাত্র PNG, JPG, WebP বা GIF ফরম্যাটের ছবি আপলোড করুন।'
          : 'Please upload a PNG, JPG, WebP, or GIF image.'
      );
      return;
    }

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        language === 'bn'
          ? 'ছবির আকার ১০ মেগাবাইটের বেশি হতে পারবে না।'
          : 'Image size cannot exceed 10MB.'
      );
      return;
    }

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    setFileMeta({ name: file.name, size: sizeFormatted });
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [language, setErrorMessage]);

  // Support Ctrl+V paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.items) {
        for (const item of Array.from(e.clipboardData.items)) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              processFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    setFileMeta(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!imagePreview) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে প্রথমে একটি স্ক্রিনশট আপলোড করুন।'
          : 'Please upload a screenshot first.'
      );
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/analyze/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreview,
          mimeType: mimeType,
          language: language
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        onAnalysisComplete(json.data);
      } else {
        setErrorMessage(
          (language === 'bn' ? json.error_bn : json.error) ||
          (language === 'bn' ? 'স্ক্রিনশট বিশ্লেষণ সম্পন্ন করা যায়নি।' : 'Failed to analyze screenshot.')
        );
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(
        language === 'bn'
          ? 'সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।'
          : error?.message || 'Network connection failed.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAnalyze} className="space-y-4">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Upload Drop Zone or Image Preview */}
      {!imagePreview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/20 scale-[1.01]'
              : 'border-slate-800 bg-[#0E152C]/70 hover:border-violet-500/60 hover:bg-[#121B38]'
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 text-violet-400 mb-4 border border-violet-500/20">
            <UploadCloud className="h-8 w-8" />
          </div>

          <h3 className="text-base font-semibold text-slate-100">
            {t('dropTitle')}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {t('dropSubtitle')}
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-400">
            <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('dropFormats')}</span>
          </div>

          <p className="mt-2 text-[11px] text-violet-400/80">
            {language === 'bn' ? 'টিপস: কিবোর্ড থেকে Ctrl + V চেপে সরাসরি স্ক্রিনশট পেস্ট করতে পারেন' : 'Tip: Press Ctrl + V anywhere to paste directly from clipboard'}
          </p>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="rounded-2xl border border-slate-800 bg-[#0E152C] p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ImageIcon className="h-4 w-4 text-violet-400" />
              <span className="font-semibold truncate max-w-xs">{fileMeta?.name || 'Screenshot'}</span>
              <span className="text-slate-500 font-mono">({fileMeta?.size})</span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t('removeImage')}</span>
            </button>
          </div>

          {/* Screenshot Display */}
          <div className="relative mt-3 flex justify-center overflow-hidden rounded-xl bg-slate-950/60 p-2 max-h-80 border border-slate-800/80">
            <div className="relative h-64 w-full">
              <Image
                src={imagePreview}
                alt="Uploaded Screenshot Preview"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

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
          disabled={isLoading || !imagePreview}
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
