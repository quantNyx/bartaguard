'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Brand
    brandName: 'BartaGuard (বার্তাগার্ড)',
    brandTagline: 'বোঝার আগে বিশ্বাস নয়।',
    brandSubtagline: 'কৃত্রিম বুদ্ধিমত্তার মাধ্যমে প্রতারণামূলক মেসেজ, ভুয়া চাকরি ও ফিশিং শনাক্তকারী সহকারী।',

    // Nav
    navHome: 'হোম',
    navScanner: 'স্ক্যানার',
    navHowItWorks: 'কিভাবে কাজ করে',
    navScenarios: 'নমুনা পরীক্ষা',
    navGuide: 'স্ক্যাম গাইড',
    navFeatures: 'বৈশিষ্ট্য',
    navPrivacy: 'প্রাইভেসি',
    buildathonBadge: 'অফিসিয়াল এআইগনাইট বিল্ডাথন ২০২৬ প্রকল্প',

    // Hero
    heroBadge: 'বাংলাদেশ ও বৈশ্বিক ডিজিটাল নিরাপত্তা প্ল্যাটফর্ম',
    heroHeading: 'বোঝার আগে বিশ্বাস নয়।',
    heroSubheading: 'সন্দেহজনক মেসেজের ফাঁদে পা দিয়ে বড় আর্থিক ক্ষতি হওয়ার আগেই জেনে নিন আসল সত্য। এআই প্রযুক্তির সাহায্যে প্রতারণার আলামত ও ঝুঁকি যাচাই করে নিজেকে নিরাপদ রাখুন।',
    heroAnalyzeBtn: 'মেসেজ বিশ্লেষণ করুন',
    heroHowItWorksBtn: 'কিভাবে কাজ করে দেখুন',
    heroStat1: '১০০% প্রাইভেট',
    heroStat1Desc: 'মেসেজ সংরক্ষণ করা হয় না',
    heroStat2: 'বাংলা ও বাংলিশ',
    heroStat2Desc: 'স্থানীয় ভাষার পূর্ণ বিশ্লেষণ',
    heroStat3: 'মাল্টিমোডাল ভিশন',
    heroStat3Desc: 'স্ক্রিনশট সরাসরি বিশ্লেষণ',

    // Scanner
    scannerTitle: 'এআই ডিজিটাল সেফটি স্ক্যানার',
    scannerSubtitle: 'যেকোনো এসএমএস, মেসেঞ্জার, হোয়াটসঅ্যাপ চ্যাট বা স্ক্রিনশট সাবমিট করুন।',
    tabText: 'মেসেজ বিশ্লেষণ',
    tabImage: 'স্ক্রিনশট বিশ্লেষণ',
    textPlaceholder: 'এখানে আপনার সন্দেহজনক মেসেজটি পেস্ট করুন... (যেমন: বিকাশ অ্যাকাউন্ট ব্লক হওয়ার এসএমএস, পার্ট-টাইম চাকরির লোভনীয় অফার বা কুরিয়ার পার্সেল ছাড়ানোর লিংক)',
    charCount: 'অক্ষর',
    clearBtn: 'মুছে ফেলুন',
    pasteBtn: 'ক্লিপবোর্ড থেকে পেস্ট',
    analyzeBtn: 'যাচাই করুন',
    analyzingBtn: 'বিশ্লেষণ চলছে...',

    // Image Upload
    dropTitle: 'স্ক্রিনশট টেনে এনে এখানে ছাড়ুন',
    dropSubtitle: 'অথবা ফাইল সিলেক্ট করতে ক্লিক করুন',
    dropFormats: 'PNG, JPG, WebP অথবা GIF (সর্বোচ্চ ১০ মেগাবাইট)',
    removeImage: 'ছবি পরিবর্তন করুন',

    // Results Dashboard
    resultTitle: 'এআই নিরাপত্তা অডিট রিপোর্ট',
    riskLevel: 'ঝুঁকির মাত্রা',
    scamCategory: 'প্রতারণার ধরন',
    confidenceScore: 'মডেলের প্রত্যয়',
    detectedLang: 'চিহ্নিত ভাষা',
    summaryHeading: 'মূল মূল্যায়ন',
    redFlagsHeading: 'শনাক্তকৃত ঝুঁকির আলামতসমূহ',
    evidenceLabel: 'বার্তায় প্রাপ্ত প্রমাণ:',
    explanationLabel: 'ঝুঁকির ব্যাখ্যা:',
    actionsHeading: 'আপনার করণীয় নিরাপদ পদক্ষেপ',
    banglaExplanationHeading: 'সহজ ভাষায় পরামর্শ ও দিকনির্দেশনা',
    limitationsHeading: 'বিশ্লেষণের সীমাবদ্ধতা ও স্বচ্ছতা',
    copyReportBtn: 'সম্পূর্ণ রিপোর্ট কপি করুন',
    copiedBtn: 'কপি করা হয়েছে!',
    printBtn: 'প্রিন্ট / সেভ',
    resetBtn: 'নতুন মেসেজ যাচাই করুন',

    // Risk Levels
    risk_low: 'নিরাপদ / কম ঝুঁকি',
    risk_medium: 'সতর্কতা প্রয়োজন / মধ্যম ঝুঁকি',
    risk_high: 'মারাত্মক ঝুঁকিপূর্ণ / উচ্চ ঝুঁকি',
    risk_inconclusive: 'অনিশ্চিত',

    // Categories
    cat_phishing: 'ফিশিং আক্রমণ (Phishing)',
    cat_financial_impersonation: 'আর্থিক প্রতিষ্ঠান অনুকরণ (MFS Impersonation)',
    cat_fake_recruitment: 'ভুয়া চাকরি ও টাস্ক স্ক্যাম (Fake Recruitment)',
    cat_delivery_scam: 'পার্সেল ডেলিভারি জালিয়াতি (Delivery Scam)',
    cat_shopping_fraud: 'অনলাইন কেনাকাটা প্রতারণা (Shopping Fraud)',
    cat_suspicious_payment_request: 'সন্দেহজনক অর্থ দাবি (Suspicious Payment)',
    cat_other: 'সাধারণ লেনদেন / অন্যান্য',
    cat_unknown: 'অপরিচিত বিষয়শ্রেণী',

    // Confidence
    conf_high: 'উচ্চ নিশ্চয়তা',
    conf_medium: 'মধ্যম নিশ্চয়তা',
    conf_low: 'প্রাথমিক ধারণা',

    // Sample Scenarios
    scenariosHeading: 'বাস্তবধর্মী নমুনা পরীক্ষা',
    scenariosSubheading: 'নিচের যেকোনো একটি পরিস্থিতিতে ক্লিক করে সরাসরি স্ক্যানারে লাইভ এআই টেস্ট করুন:',
    testScenarioBtn: 'এই মেসেজটি পরীক্ষা করুন',

    // How It Works
    howItWorksHeading: 'বার্তাগার্ড কিভাবে কাজ করে?',
    howItWorksSubheading: 'মাত্র ৪টি ধাপে জটিল প্রযুক্তিকে সাধারণ ব্যবহারকারীর জন্য সহজ করে তোলা হয়েছে:',
    step1Title: '১. বার্তা বা ছবি দিন',
    step1Desc: 'সন্দেহজনক এসএমএস, চ্যাট বা স্ক্রিনশট স্ক্যানারে ইনপুট করুন।',
    step2Title: '২. ডিপ এআই অ্যানালাইসিস',
    step2Desc: 'গুগল জেমিনাই এর মাল্টিমোডাল মডেল ভাষা, লিংক ও চাপ সৃষ্টির কৌশল বিশ্লেষণ করে।',
    step3Title: '৩. প্রমাণসহ লাল পতাকা',
    step3Desc: 'কোন নির্দিষ্ট কারণে মেসেজটি ঝুঁকিপূর্ণ তার সুনির্দিষ্ট প্রমাণ উদ্ধৃত করে দেখানো হয়।',
    step4Title: '৪. সহজ পরামর্শ ও পদক্ষেপ',
    step4Desc: 'সহজ বাংলায় মা-বাবা ও সাধারণ মানুষের বোধগম্য ভাষায় করণীয় জানিয়ে দেওয়া হয়।',

    // Bangladesh Scams Guide
    guideHeading: 'বাংলাদেশে বহুল প্রচলিত ডিজিটাল প্রতারণা',
    guideSubheading: 'সচেতনতাই আপনার আর্থিক ও ব্যক্তিগত তথ্যের সেরা প্রতিরক্ষা:',

    // Features
    featuresHeading: 'কেন বার্তাগার্ড অনন্য?',
    featuresSubheading: 'কেবল প্রযুক্তি নয়, প্রান্তিক মানুষের নিরাপত্তা নিশ্চিত করার প্রত্যয়:',

    // Privacy
    privacyHeading: 'প্রাইভেসি ও নৈতিক এআই অঙ্গীকার',
    privacySubheading: 'আপনার গোপনীয়তা আমাদের সর্বোচ্চ অগ্রাধিকার।',
    privacyP1: 'বার্তাগার্ড আপনার সাবমিট করা মেসেজ বা আপলোডকৃত স্ক্রিনশট ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করে না।',
    privacyP2: 'বিশ্লেষণ সম্পন্ন হওয়ার পরপরই মেমোরি থেকে ডাটা মুছে ফেলা হয়। ব্যক্তিগত তথ্যের গোপনীয়তা শতভাগ সুরক্ষিত।',

    // Footer
    footerDisclaimer: 'দাবিত্যাগ: বার্তাগার্ড একটি সহায়ক কৃত্রিম বুদ্ধিমত্তা টুল। এটি ব্যবহারকারীদের সতর্ক করতে সম্ভাব্য ঝুঁকি তুলে ধরে। কোনো আইনি বা নিশ্চিত আর্থিক প্রমাণের জন্য সংশ্লিষ্ট প্রতিষ্ঠানের অফিশিয়াল নম্বরে যোগাযোগ করুন।',
    builtFor: 'তৈরি করা হয়েছে Ostad Presents YUNet AIgnite Buildathon 2026 এর জন্য।'
  },
  en: {
    // Brand
    brandName: 'BartaGuard (বার্তাগার্ড)',
    brandTagline: 'Understand Before You Trust.',
    brandSubtagline: 'AI-powered consumer digital safety assistant for suspicious messages, phishing, and scam detection.',

    // Nav
    navHome: 'Home',
    navScanner: 'Scanner',
    navHowItWorks: 'How It Works',
    navScenarios: 'Sample Tests',
    navGuide: 'Scam Guide',
    navFeatures: 'Features',
    navPrivacy: 'Privacy',
    buildathonBadge: 'Official AIgnite Buildathon 2026 Project',

    // Hero
    heroBadge: 'Consumer Digital Safety Platform',
    heroHeading: 'Not Every Message Deserves Your Trust.',
    heroSubheading: 'Understand suspicious messages before they become expensive mistakes. Analyze messages, detect warning signs and stay safer with AI.',
    heroAnalyzeBtn: 'Analyze a Message',
    heroHowItWorksBtn: 'Explore How It Works',
    heroStat1: '100% Private',
    heroStat1Desc: 'Zero message retention',
    heroStat2: 'Bangla & Banglish',
    heroStat2Desc: 'Native localized understanding',
    heroStat3: 'Multimodal Vision',
    heroStat3Desc: 'Analyze screenshots directly',

    // Scanner
    scannerTitle: 'AI Digital Safety Scanner',
    scannerSubtitle: 'Paste any SMS, Messenger, WhatsApp chat, or upload a screenshot to inspect threats.',
    tabText: 'Text Analysis',
    tabImage: 'Screenshot Analysis',
    textPlaceholder: 'Paste suspicious message here... (e.g. bKash account suspended notification, fake recruitment deposit offer, or courier release link)',
    charCount: 'characters',
    clearBtn: 'Clear',
    pasteBtn: 'Paste from Clipboard',
    analyzeBtn: 'Analyze Message',
    analyzingBtn: 'Analyzing with AI...',

    // Image Upload
    dropTitle: 'Drag & drop your screenshot here',
    dropSubtitle: 'or click to browse from device',
    dropFormats: 'PNG, JPG, WebP, or GIF (Up to 10MB)',
    removeImage: 'Change Screenshot',

    // Results Dashboard
    resultTitle: 'AI Security Audit Report',
    riskLevel: 'Risk Level',
    scamCategory: 'Scam Category',
    confidenceScore: 'Model Confidence',
    detectedLang: 'Detected Language',
    summaryHeading: 'Executive Assessment',
    redFlagsHeading: 'Detected Red Flags',
    evidenceLabel: 'Evidence Found:',
    explanationLabel: 'Why it is suspicious:',
    actionsHeading: 'Recommended Safe Actions',
    banglaExplanationHeading: 'Plain Bangla Advice (সহজ ভাষায় পরামর্শ)',
    limitationsHeading: 'Analysis Limitations & Transparency',
    copyReportBtn: 'Copy Full Report',
    copiedBtn: 'Copied to Clipboard!',
    printBtn: 'Print / Save',
    resetBtn: 'Analyze Another Message',

    // Risk Levels
    risk_low: 'Low Risk / Likely Safe',
    risk_medium: 'Caution Advised / Medium Risk',
    risk_high: 'High Risk / Likely Scam',
    risk_inconclusive: 'Inconclusive',

    // Categories
    cat_phishing: 'Phishing',
    cat_financial_impersonation: 'Financial Impersonation',
    cat_fake_recruitment: 'Fake Recruitment',
    cat_delivery_scam: 'Delivery Scam',
    cat_shopping_fraud: 'Shopping Fraud',
    cat_suspicious_payment_request: 'Suspicious Payment Request',
    cat_other: 'Standard Transaction / Other',
    cat_unknown: 'Unknown Category',

    // Confidence
    conf_high: 'High Confidence',
    conf_medium: 'Medium Confidence',
    conf_low: 'Low Confidence',

    // Sample Scenarios
    scenariosHeading: 'Interactive Sample Scenarios',
    scenariosSubheading: 'Click any realistic scenario below to immediately load and test it live with AI:',
    testScenarioBtn: 'Test This Scenario',

    // How It Works
    howItWorksHeading: 'How BartaGuard Works',
    howItWorksSubheading: 'A four-step verification architecture designed for everyday digital consumers:',
    step1Title: '1. Submit Content',
    step1Desc: 'Paste any text, SMS, social chat, or upload a direct mobile screenshot.',
    step2Title: '2. Multimodal AI Analysis',
    step2Desc: 'Google Gemini inspects linguistic markers, urgency signals, and domain patterns.',
    step3Title: '3. Evidence-Backed Red Flags',
    step3Desc: 'Each suspicious indicator is tied to direct quotes and observed facts.',
    step4Title: '4. Actionable Safe Steps',
    step4Desc: 'Receive practical, jargon-free recommendations in both Bangla and English.',

    // Bangladesh Scams Guide
    guideHeading: 'Common Digital Scams in Bangladesh',
    guideSubheading: 'Awareness is your first line of defense against financial cybercrime:',

    // Features
    featuresHeading: 'Engineered for Digital Safety',
    featuresSubheading: 'Built with purpose to protect ordinary citizens from modern digital deception:',

    // Privacy
    privacyHeading: 'Privacy & Security Manifesto',
    privacySubheading: 'Zero retention. Your conversations belong only to you.',
    privacyP1: 'BartaGuard does not save or log your submitted messages or screenshots to any persistent database.',
    privacyP2: 'Data is processed ephemerally in server memory and discarded immediately after generation.',

    // Footer
    footerDisclaimer: 'Disclaimer: BartaGuard is an assistive AI tool. It evaluates risk patterns to assist consumers. For official verification of financial accounts, contact your service provider directly.',
    builtFor: 'Built for Ostad Presents YUNet AIgnite Buildathon 2026.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Bangla ('bn') as explicitly mandated
  const [language, setLanguageState] = useState<Language>('bn');

  useEffect(() => {
    const saved = localStorage.getItem('bartaguard_lang') as Language;
    if (saved === 'bn' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bartaguard_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'bn' ? 'en' : 'bn';
    setLanguage(next);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
