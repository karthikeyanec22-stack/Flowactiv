import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Simple token generator based on ADMIN_PASSWORD secret
export function getAdminToken() {
  const secret = process.env.ADMIN_PASSWORD || 'FlowActivAdmin2026!';
  return crypto.createHash('sha256').update(`admin_session_${secret}`).digest('hex');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    const expectedPassword = process.env.ADMIN_PASSWORD || 'FlowActivAdmin2026!';

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const token = getAdminToken();

    const response = NextResponse.json({
      success: true,
      token,
      message: 'Authenticated successfully'
    });

    // Set cookie for browser sessions
    response.cookies.set('flowactiv_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
