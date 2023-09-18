import { blogPostSchema } from "@/lib/types";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
    // console.log(request)
    // const { id } = request.;
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
    // const data = await res.json();
    return NextResponse.json({});
}

export async function PATCH(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    const result: any = blogPostSchema.safeParse(body);
    console.log(result)
    console.log('Calling Create Post')
    // const { accessToken } = request.headers;
    const accessToken = parse(request.headers.get('cookie') || '').accessToken;
    console.log(accessToken)

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            title: result.data.title,
            description: result.data.description,
            content: result.data.content,
            })
    });
    return NextResponse.json({success: true});
}