import { NextRequest, NextResponse } from 'next/server';
import { analyzeTextWithGemini } from '@/lib/gemini';

// In-memory rate limiting map for basic abuse prevention (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a minute before analyzing more messages.',
          error_bn: 'অনুরোধের সীমা অতিক্রম করেছে। অনুগ্রহ করে ১ মিনিট পর আবার চেষ্টা করুন।'
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { text, language = 'bn' } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide message text to analyze.',
          error_bn: 'বিশ্লেষণ করার জন্য একটি বার্তা প্রদান করুন।'
        },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message text exceeds maximum length of 10,000 characters.',
          error_bn: 'বার্তাটি সর্বোচ্চ ১০,০০০ অক্ষরের বেশি হতে পারবে না।'
        },
        { status: 400 }
      );
    }

    const result = await analyzeTextWithGemini(text.trim(), language);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error in /api/analyze/text:', err?.message || err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to complete message analysis. Please try again.',
        error_bn: 'বার্তা বিশ্লেষণ সম্পন্ন করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।',
        details: process.env.NODE_ENV === 'development' ? err?.message : undefined
      },
      { status: 500 }
    );
  }
}
