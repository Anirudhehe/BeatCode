import { optimizedSolution } from '../../../utils/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, language } = body;
    
    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      );
    }

    const optimizedCode = await optimizedSolution(code, language);
    return NextResponse.json({ result: optimizedCode });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize code' },
      { status: 500 }
    );
  }
}