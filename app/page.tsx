'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScannerContainer from '@/components/Scanner/ScannerContainer';
import AnalysisDashboard from '@/components/Dashboard/AnalysisDashboard';
import SampleScenarios from '@/components/SampleScenarios';
import HowItWorks from '@/components/HowItWorks';
import BangladeshScamGuide from '@/components/BangladeshScamGuide';
import Features from '@/components/Features';
import PrivacyManifesto from '@/components/PrivacyManifesto';
import Footer from '@/components/Footer';
import { AnalysisResult } from '@/types/analysis';
import confetti from 'canvas-confetti';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [presetText, setPresetText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);

    // If safe / low risk, trigger celebratory subtle confetti
    if (result.risk_level === 'low') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#8B5CF6']
        });
      } catch {
        // Ignore if confetti not supported
      }
    }

    // Scroll smoothly down to the dashboard
    setTimeout(() => {
      const el = document.getElementById('results-dashboard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleSelectScenario = (text: string) => {
    setPresetText(text);
    setActiveTab('text');
    setAnalysisResult(null);

    // Scroll to scanner
    const el = document.getElementById('scanner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setPresetText('');
    const el = document.getElementById('scanner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0B1020]">
      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Scanner Container */}
        <ScannerContainer
          onAnalysisComplete={handleAnalysisComplete}
          presetText={presetText}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Results Dashboard (renders when analysis result is present) */}
        {analysisResult && (
          <div ref={resultsRef} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
            <AnalysisDashboard result={analysisResult} onReset={handleReset} />
          </div>
        )}

        {/* Interactive Sample Scenarios */}
        <SampleScenarios onSelectScenario={handleSelectScenario} />

        {/* 4-Step How It Works */}
        <HowItWorks />

        {/* Bangladesh Scam Education Guide */}
        <BangladeshScamGuide />

        {/* Features Grid */}
        <Features />

        {/* Privacy & Security Manifesto */}
        <PrivacyManifesto />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
