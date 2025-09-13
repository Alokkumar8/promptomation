import { NextResponse } from 'next/server';

export async function GET() {
  // The user request specified example.com
  return NextResponse.json({ live_view_url: "https://example.com" });
}
