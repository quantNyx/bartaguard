'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AnalysisResult, RiskLevel, ScamCategory, ConfidenceLevel } from '@/types/analysis';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Printer,
  ChevronDown,
  Info,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AnalysisDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function AnalysisDashboard({ result, onReset }: AnalysisDashboardProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Helper for Risk Level Styling
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'high':
        return {
          label: language === 'bn' ? 'উচ্চ ঝুঁকি (HIGH RISK)' : 'HIGH RISK / DANGEROUS',
          desc: language === 'bn' ? 'প্রতারণার সুনির্দিষ্ট আলামত বিদ্যমান' : 'Definite indicators of fraud or deception',
          bg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
          dot: 'bg-rose-500',
          glow: 'glow-red',
          icon: <ShieldAlert className="h-6 w-6 text-rose-400" />
        };
      case 'medium':
        return {
          label: language === 'bn' ? 'সতর্কতা প্রয়োজন (MEDIUM RISK)' : 'MEDIUM RISK / CAUTION',
          desc: language === 'bn' ? 'সন্দেহজনক উপাদান বা লিঙ্ক রয়েছে' : 'Contains suspicious elements or urgency',
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-500',
          glow: 'shadow-amber-950/40',
          icon: <AlertTriangle className="h-6 w-6 text-amber-400" />
        };
      case 'low':
        return {
          label: language === 'bn' ? 'নিরাপদ / কম ঝুঁকি (LOW RISK)' : 'LOW RISK / LIKELY SAFE',
          desc: language === 'bn' ? 'কোনো ক্ষতিকর উপাদান শনাক্ত হয়নি' : 'No malicious indicators observed',
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
          dot: 'bg-emerald-500',
          glow: 'glow-emerald',
          icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />
        };
      case 'inconclusive':
      default:
        return {
          label: language === 'bn' ? 'অনিশ্চিত (INCONCLUSIVE)' : 'INCONCLUSIVE',
          desc: language === 'bn' ? 'পর্যাপ্ত প্রমাণের অভাব' : 'Insufficient data to evaluate',
          bg: 'bg-slate-500/15 border-slate-500/40 text-slate-300',
          dot: 'bg-slate-400',
          glow: '',
          icon: <HelpCircle className="h-6 w-6 text-slate-400" />
        };
    }
  };

  // Helper for Category Labels
  const getCategoryLabel = (cat: ScamCategory) => {
    const key = `cat_${cat}`;
    return t(key) || cat;
  };

  // Helper for Confidence
  const getConfidenceBadge = (conf: ConfidenceLevel) => {
    switch (conf) {
      case 'high':
        return {
          label: language === 'bn' ? 'উচ্চ নিশ্চয়তা (High)' : 'High Confidence',
          color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60'
        };
      case 'medium':
        return {
          label: language === 'bn' ? 'মধ্যম নিশ্চয়তা (Medium)' : 'Medium Confidence',
          color: 'text-amber-400 bg-amber-950/40 border-amber-800/60'
        };
      case 'low':
      default:
        return {
          label: language === 'bn' ? 'সীমিত নিশ্চয়তা (Low)' : 'Low Confidence',
          color: 'text-slate-400 bg-slate-900/60 border-slate-800'
        };
    }
  };

  const riskInfo = getRiskBadge(result.risk_level);
  const confInfo = getConfidenceBadge(result.confidence);

  // Copy report to clipboard
  const handleCopyReport = () => {
    const reportText = `🛡️ [BartaGuard AI Security Report]
━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 ${language === 'bn' ? 'ঝুঁকির মাত্রা:' : 'Risk Level:'} ${riskInfo.label}
📂 ${language === 'bn' ? 'ক্যাটাগরি:' : 'Category:'} ${getCategoryLabel(result.category)}
📊 ${language === 'bn' ? 'কনফিডেন্স:' : 'Confidence:'} ${confInfo.label}

📝 ${language === 'bn' ? 'সারসংক্ষেপ:' : 'Summary:'}
${language === 'bn' && result.summary_bn ? result.summary_bn : result.summary}

⚠️ ${language === 'bn' ? 'শনাক্তকৃত রেড ফ্ল্যাগসমূহ:' : 'Detected Red Flags:'}
${result.red_flags.map((rf, idx) => `${idx + 1}. ${rf.indicator}: ${rf.evidence} - ${rf.explanation}`).join('\n')}

💡 ${language === 'bn' ? 'পরামর্শ ও করণীয়:' : 'Safe Actions:'}
${(language === 'bn' && result.recommended_actions_bn ? result.recommended_actions_bn : result.recommended_actions).map(a => `• ${a}`).join('\n')}

💬 ${language === 'bn' ? 'সহজ বাংলায় পরামর্শ:' : 'Plain Bangla Advice:'}
${result.bangla_explanation}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Verified via BartaGuard (বার্তাগার্ড) | বোঝার আগে বিশ্বাস নয়।
Built for Ostad AIgnite Buildathon 2026`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="results-dashboard" className="scroll-mt-24 mt-10 space-y-6">
      
      {/* Top Banner Card: Risk Level, Category, Confidence */}
      <div className={`relative overflow-hidden rounded-3xl border ${riskInfo.bg} p-6 sm:p-8 backdrop-blur-xl ${riskInfo.glow}`}>
        
        {/* Top meta tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${riskInfo.dot} animate-pulse`} />
            <span className="text-xs font-mono uppercase tracking-wider text-white/90">
              {t('resultTitle')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`rounded-lg border px-2.5 py-1 ${confInfo.color}`}>
              {confInfo.label}
            </span>
            <span className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-slate-300">
              {result.language_detected || 'Bangla/English'}
            </span>
          </div>
        </div>

        {/* Main Risk Headline */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-black/30 p-3.5 border border-white/10 shrink-0">
              {riskInfo.icon}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t('riskLevel')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {riskInfo.label}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                {riskInfo.desc}
              </p>
            </div>
          </div>

          {/* Category Chip */}
          <div className="rounded-2xl border border-white/15 bg-black/30 p-4 min-w-[220px]">
            <div className="text-xs font-semibold text-white/70">
              {t('scamCategory')}
            </div>
            <div className="mt-1 text-base font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>{getCategoryLabel(result.category)}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t('summaryHeading')}</span>
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium">
            {language === 'bn' && result.summary_bn ? result.summary_bn : result.summary}
          </p>
        </div>

      </div>

      {/* Grid: Red Flags & Plain Bangla Explanation */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Column (7 cols): Detected Red Flags */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-[#12182F]/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">
                  {t('redFlagsHeading')}
                </h3>
              </div>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-rose-300 border border-rose-500/20">
                {result.red_flags.length} {language === 'bn' ? 'টি আলামত' : 'Indicators'}
              </span>
            </div>

            <div className="mt-4 space-y-3.5">
              {result.red_flags.map((flag, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-[11px] font-bold text-rose-400 border border-rose-500/30">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-100">
                        {language === 'bn' && flag.indicator_bn ? flag.indicator_bn : flag.indicator}
                      </h4>

                      {/* Evidence quote */}
                      <div className="mt-2 rounded-xl border border-slate-800 bg-[#0E152C] p-2.5 text-xs font-mono text-slate-300">
                        <span className="text-[11px] text-cyan-400 font-sans font-semibold block mb-0.5">
                          {t('evidenceLabel')}
                        </span>
                        &ldquo;{language === 'bn' && flag.evidence_bn ? flag.evidence_bn : flag.evidence}&rdquo;
                      </div>

                      {/* Why suspicious */}
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        <strong className="text-slate-300 font-semibold">{t('explanationLabel')} </strong>
                        {language === 'bn' && flag.explanation_bn ? flag.explanation_bn : flag.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Limitations & Transparency */}
          <div className="rounded-3xl border border-slate-800/80 bg-[#12182F]/70 p-5 text-xs text-slate-400">
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-cyan-400" />
              <span>{t('limitationsHeading')}</span>
            </h4>
            <ul className="space-y-1.5 pl-5 list-disc text-slate-400">
              {(language === 'bn' && result.limitations_bn ? result.limitations_bn : result.limitations).map((lim, i) => (
                <li key={i}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (5 cols): Safe Actions & Plain Bangla Advice */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Plain Bangla Advice Card (সহজ ভাষায় পরামর্শ) */}
          <div className="rounded-3xl border border-violet-500/40 bg-gradient-to-br from-violet-950/40 to-[#12182F] p-5 sm:p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-violet-800/40 text-violet-300">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h3 className="text-sm font-bold">
                {t('banglaExplanationHeading')}
              </h3>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-200">
              {result.bangla_explanation}
            </p>
          </div>

          {/* Recommended Actions Checklist */}
          <div className="rounded-3xl border border-slate-800 bg-[#12182F]/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                {t('actionsHeading')}
              </h3>
            </div>

            <ul className="mt-4 space-y-3">
              {(language === 'bn' && result.recommended_actions_bn ? result.recommended_actions_bn : result.recommended_actions).map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Action Toolbar: Copy, Print, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#12182F]/80 p-4 backdrop-blur-md no-print">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5 text-violet-400" />
          <span>
            {language === 'bn' ? 'বিশ্লেষণের সময়:' : 'Analyzed at:'}{' '}
            {result.analyzed_at ? new Date(result.analyzed_at).toLocaleTimeString() : 'Just now'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy Report */}
          <button
            type="button"
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t('copiedBtn')}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-300" />
                <span>{t('copyReportBtn')}</span>
              </>
            )}
          </button>

          {/* Print / Save */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
          >
            <Printer className="h-3.5 w-3.5 text-slate-300" />
            <span>{t('printBtn')}</span>
          </button>

          {/* Reset / New Scan */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-900/30 hover:bg-violet-500 transition-all active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t('resetBtn')}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
