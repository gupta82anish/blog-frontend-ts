import { blogPostSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { parse } from "cookie";
export async function POST(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    const result: any = blogPostSchema.safeParse(body);

    const accessToken = parse(request.headers.get('cookie') || '').accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            title: result.data.title,
            description: result.data.description,
            content: result.data.content,
             author: result.data.id
            })
            ,
            cache: 'no-store'
    });

    const responseData = await response.json();

    return NextResponse.json({response: responseData});
}