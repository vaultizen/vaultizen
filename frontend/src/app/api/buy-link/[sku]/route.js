import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { sku } = params;

  // Build the absolute path to the buy-link.txt file
  const filePath = path.join(process.cwd(), 'private', 'products', sku, 'buy-link.txt');

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8').trim();

    // Validate the URL
    try {
      new URL(content);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    return NextResponse.json({ buyLink: content });
  } catch (error) {
    console.error('[buy-link] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}