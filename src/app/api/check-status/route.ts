import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const start = Date.now();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      // Avoid following redirects to get the exact status if requested, but usually people want the final status.
      // For a status checker, we might want to follow or not. Let's follow by default.
      redirect: 'follow',
    });
    const end = Date.now();
    const text = await response.text();

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Simple meta tag extraction
    const meta: Record<string, string> = {};
    const metaRegex = /<meta\s+[^>]*?property=["'](og:[^"']+)["'][^>]*?content=["']([^"']*)["']/gi;
    let match;
    while ((match = metaRegex.exec(text)) !== null) {
      meta[match[1]] = match[2];
    }

    // fallback for name=
    const nameRegex = /<meta\s+[^>]*?name=["'](og:[^"']+|description|twitter:[^"']+)["'][^>]*?content=["']([^"']*)["']/gi;
    while ((match = nameRegex.exec(text)) !== null) {
      meta[match[1]] = match[2];
    }
    
    // Title extraction
    const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      responseTime: end - start,
      headers,
      meta,
      title
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch the URL' }, { status: 500 });
  }
}
