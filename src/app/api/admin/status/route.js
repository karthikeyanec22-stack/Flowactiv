import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const flagPath = path.join(process.cwd(), 'offline.flag');
    const isOffline = fs.existsSync(flagPath);

    let statInfo = null;
    if (isOffline) {
      try {
        const stats = fs.statSync(flagPath);
        statInfo = stats.mtime;
      } catch (e) {}
    }

    return NextResponse.json({
      isOffline,
      lastUpdated: statInfo ? statInfo.toISOString() : new Date().toISOString(),
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve server status' },
      { status: 500 }
    );
  }
}
