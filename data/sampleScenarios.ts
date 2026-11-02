export interface SampleScenario {
  id: string;
  title_bn: string;
  title_en: string;
  category_bn: string;
  category_en: string;
  tag_bn: string;
  tag_en: string;
  risk_expected: 'high' | 'medium' | 'low';
  text: string;
  description_bn: string;
  description_en: string;
}

export const sampleScenarios: SampleScenario[] = [
  {
    id: 'financial-impersonation',
    title_bn: 'সন্দেহজনক বিকাশ অ্যাকাউন্ট ব্লক নোটিফিকেশন',
    title_en: 'Suspicious Financial Service Alert (bKash)',
    category_bn: 'আর্থিক প্রতিষ্ঠান অনুকরণ',
    category_en: 'Financial Impersonation',
    tag_bn: 'উচ্চ ঝুঁকি (Scam)',
    tag_en: 'High Risk (Scam)',
    risk_expected: 'high',
    text: 'bKash: আপনার একাউন্টটি সাময়িকভাবে স্থগিত করা হয়েছে। পরবর্তী ২৪ ঘণ্টার মধ্যে একাউন্ট সক্রিয় না করলে স্থায়ীভাবে বন্ধ হবে। এখনই পিন ও একাউন্ট ভেরিফাই করতে লিংকে প্রবেশ করুন: http://bkash-verify-acc24.net/login',
    description_bn: 'জরুরি অ্যাকাউন্ট বন্ধের হুমকি ও ভুয়া লিংকে পিন চাওয়ার ক্লাসিক ফিশিং ফাঁদ।',
    description_en: 'Urgent account suspension threat pushing the victim to a fake verification link.'
  },
  {
    id: 'fake-recruitment',
    title_bn: 'ঘরে বসে আয়ের ভুয়া চাকরির বিজ্ঞপ্তি',
    title_en: 'Fake Recruitment & Part-time Job Offer',
    category_bn: 'ভুয়া চাকরি ও টাস্ক স্ক্যাম',
    category_en: 'Fake Recruitment',
    tag_bn: 'উচ্চ ঝুঁকি (Scam)',
    tag_en: 'High Risk (Scam)',
    risk_expected: 'high',
    text: 'জরুরি নিয়োগ বিজ্ঞপ্তি! কোনো অভিজ্ঞতা ছাড়াই মোবাইল দিয়ে ঘরে বসে ইউটিউব ও টিকটক ভিডিও লাইক দিয়ে প্রতিদিন ৮০০ থেকে ২৫০০ টাকা আয় করুন। কাজে যোগ দিতে আপনার আইডি কার্ড ও ৫০০ টাকা রেজিস্ট্রেশন ফি সেন্ড মানি করুন এই বিকাশ নম্বরে: 01829471920 (পার্সোনাল)। রেফার কোড: TASK2026',
    description_bn: 'সহজে আয়ের প্রলোভন দেখিয়ে যোগদানের জন্য রেজিস্ট্রেশন ফি হাতিয়ে নেওয়ার স্ক্যাম।',
    description_en: 'Promises easy daily income from simple tasks while requiring an upfront registration fee.'
  },
  {
    id: 'delivery-scam',
    title_bn: 'সন্দেহজনক কুরিয়ার পার্সেল ডেলিভারি এসএমএস',
    title_en: 'Suspicious Courier Delivery Notification',
    category_bn: 'পার্সেল ডেলিভারি জালিয়াতি',
    category_en: 'Delivery Scam',
    tag_bn: 'উচ্চ ঝুঁকি (Scam)',
    tag_en: 'High Risk (Scam)',
    risk_expected: 'high',
    text: 'Steadfast Courier: আপনার পার্সেল #SF-90281 ডেলিভারি সেন্টারে আটকে রয়েছে। ডেলিভারি চার্জ বাবদ ৬০ টাকা বকেয়া থাকায় পাঠানো সম্ভব হচ্ছে না। আজকের মধ্যে ডেলিভারি পেতে এই লিংকে গিয়ে চার্জ পরিশোধ করুন: https://bit.ly/steadfast-express-pay',
    description_bn: 'মিথ্যা বকেয়া চার্জের বাহানায় শর্ট লিংকের মাধ্যমে কার্ড বা এমএফএস পিন চুরির অপচেষ্টা।',
    description_en: 'Claims an undelivered parcel has a pending small fee to lure user into entering payment credentials on a short link.'
  },
  {
    id: 'shopping-fraud',
    title_bn: 'অবাস্তব মূল্যে আইফোন ধামাকা অফার',
    title_en: 'Misleading Online Shopping Flash Sale',
    category_bn: 'অনলাইন শপিং প্রতারণা',
    category_en: 'Shopping Fraud',
    tag_bn: 'উচ্চ ঝুঁকি (Scam)',
    tag_en: 'High Risk (Scam)',
    risk_expected: 'high',
    text: 'মেগা ধামাকা ফ্ল্যাশ সেল! iPhone 16 Pro Max মাত্র ৪৯৯৯ টাকায়! স্টক সীমিত, অফারটি মাত্র আগামী ৩০ মিনিটের জন্য প্রযোজ্য। দ্রুত স্টক বুক করতে অগ্রিম ১০০০ টাকা দিয়ে অর্ডার কনফার্ম করুন: https://daraz-flashdeal-promo24.com/iphone',
    description_bn: 'অবাস্তব মূল্যের লোভ দেখিয়ে অগ্রিম টাকা নিয়ে লাপাত্তা হয়ে যাওয়া চক্রের বিজ্ঞাপন।',
    description_en: 'Ridiculous discount bait creating false urgency to steal advance payments.'
  },
  {
    id: 'legitimate-notification',
    title_bn: 'বৈধ ডেলিভারি রাইডার ও ওটিপি নিশ্চিতকরণ',
    title_en: 'Legitimate Courier Delivery Notification',
    category_bn: 'স্বাভাবিক লেনদেন',
    category_en: 'Standard Transaction',
    tag_bn: 'নিরাপদ (Safe)',
    tag_en: 'Likely Safe',
    risk_expected: 'low',
    text: 'RedX: আপনার পার্সেল #RDX-892147 আজ ডেলিভারির জন্য রাইডার হাসান (01812345678) এর কাছে হস্তান্তর করা হয়েছে। পার্সেলটি সশরীরে বুঝে পাওয়ার পরই ডেলিভারি ওটিপি 4829 রাইডারকে প্রদান করুন। কোনো ধরনের অগ্রিম পেমেন্ট করবেন না।',
    description_bn: 'সঠিক নিয়মমাফিক প্রেরিত নোটিফিকেশন যেখানে কোনো বাহ্যিক সন্দেহজনক লিংক নেই এবং ওটিপি কেবল পার্সেল পাওয়ার পর দিতে বলা হয়েছে।',
    description_en: 'Authentic notification with no suspicious links that instructs user to only share OTP upon receiving physical package.'
  }
];
