import { compareSolutions } from '../../../utils/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { originalCode, optimizedCode, language } = body;
    
    if (!originalCode || !optimizedCode || !language) {
      return NextResponse.json(
        { error: 'Original code, optimized code, and language are required' },
        { status: 400 }
      );
    }

    const comparison = await compareSolutions(originalCode, language, optimizedCode);
    return NextResponse.json({ result: comparison });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to compare solutions' },
      { status: 500 }
    );
  }
}