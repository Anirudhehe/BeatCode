import {hints} from '../../../utils/gemini';
import {NextResponse} from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const {code,language} = body;

        if(!code || !language){
            return NextResponse.json({error:'Code and language are required'},
            {status:400});
        }

        const Hints = await hints(code,language);
        return NextResponse.json({result:Hints});

    }catch(error){
        console.error('API route error:',error);
        return NextResponse.json(
            { error:'Failed to fetch hints'},
        {status:500}
    );
  }

}