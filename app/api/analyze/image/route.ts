import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithGemini } from '@/lib/gemini';

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_IMAGE_REQUESTS = 15; // 15 screenshot uploads per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= MAX_IMAGE_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit reached for screenshot analysis. Please wait a minute.',
          error_bn: 'স্ক্রিনশট বিশ্লেষণের সীমা অতিক্রম করেছে। ১ মিনিট পর চেষ্টা করুন।'
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { image, mimeType = 'image/png', language = 'bn' } = body;

    if (!image || typeof image !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Please upload a valid image screenshot to analyze.',
          error_bn: 'বিশ্লেষণ করার জন্য একটি বৈধ স্ক্রিনশট আপলোড করুন।'
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported image format. Allowed formats: PNG, JPG, WebP, GIF.',
          error_bn: 'অসমর্থিত ছবি ফরম্যাট। শুধুমাত্র PNG, JPG, WebP ও GIF ফরম্যাট সমর্থিত।'
        },
        { status: 400 }
      );
    }

    // Estimate base64 byte size
    const estimatedBytes = (image.length * 3) / 4;
    if (estimatedBytes > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'File size exceeds 10MB limit. Please upload a smaller image.',
          error_bn: 'ফাইলের আকার ১০ মেগাবাইটের বেশি। অনুগ্রহ করে ছোট ছবি নির্বাচন করুন।'
        },
        { status: 400 }
      );
    }

    const result = await analyzeImageWithGemini(image, mimeType, language);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error in /api/analyze/image:', err?.message || err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to complete screenshot analysis. Please try again.',
        error_bn: 'স্ক্রিনশট বিশ্লেষণ সম্পন্ন করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।',
        details: process.env.NODE_ENV === 'development' ? err?.message : undefined
      },
      { status: 500 }
    );
  }
}
