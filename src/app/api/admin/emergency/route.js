import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function verifyAuth(request) {
  const secret = process.env.ADMIN_PASSWORD || 'FlowActivAdmin2026!';
  const expectedToken = crypto.createHash('sha256').update(`admin_session_${secret}`).digest('hex');

  const cookieToken = request.cookies.get('flowactiv_admin_token')?.value;
  const headerToken = request.headers.get('x-admin-token');

  return (cookieToken === expectedToken || headerToken === expectedToken);
}

export async function POST(request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, confirmation } = body;
    const flagPath = path.join(process.cwd(), 'offline.flag');

    if (action === 'shutdown') {
      if (confirmation !== 'SHUTDOWN') {
        return NextResponse.json(
          { error: 'Invalid confirmation text. Must type "SHUTDOWN" exactly.' },
          { status: 400 }
        );
      }

      // Write persistent flag file
      const content = JSON.stringify({
        status: 'OFFLINE',
        timestamp: new Date().toISOString(),
        triggeredBy: 'ADMIN_EMERGENCY'
      }, null, 2);

      fs.writeFileSync(flagPath, content, 'utf8');

      return NextResponse.json({
        success: true,
        isOffline: true,
        message: 'EMERGENCY OFFLINE mode activated. Server returning 503 to public requests.'
      });
    } else if (action === 'recover') {
      if (confirmation !== 'RECOVER') {
        return NextResponse.json(
          { error: 'Invalid confirmation text. Must type "RECOVER" exactly.' },
          { status: 400 }
        );
      }

      // Remove persistent flag file if present
      if (fs.existsSync(flagPath)) {
        fs.unlinkSync(flagPath);
      }

      return NextResponse.json({
        success: true,
        isOffline: false,
        message: 'System RECOVERED. FlowActiv public website is now ONLINE.'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action specified. Supported actions: shutdown, recover.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Emergency handler error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing emergency state change.' },
      { status: 500 }
    );
  }
}
