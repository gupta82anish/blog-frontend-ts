import { blogPostSchema } from "@/lib/types";
import { parse } from "cookie";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse>{
    // console.log('GET')
    return NextResponse.json({success: true});
}

export async function PATCH(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    console.log(body)
    const result: any = blogPostSchema.safeParse(body);
    console.log(result)
    console.log('Calling Create Post')
    // const { accessToken } = request.headers;
    const accessToken = parse(request.headers.get('cookie') || '').accessToken;
    console.log(request.headers)
    const postId = request.headers.get('post-id');
    console.log('POST ID',postId)
    console.log(accessToken)

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            title: result.data.title,
            description: result.data.description,
            content: result.data.content,
            }),
        cache: 'no-store'
    });
    revalidatePath(`/posts/${postId}/edit`)
    return NextResponse.json({success: true});
}

export async function DELETE(request: Request): Promise<NextResponse>{
    console.log('DELETE')
    // const body:unknown = await request.json();
    // console.log(body)
    const accessToken = parse(request.headers.get('cookie') || '').accessToken;
    console.log(request.headers)
    const postId = request.headers.get('post-id');
    console.log('POST ID',postId)
    console.log(accessToken)
    // TODO: Handle Failure
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store'
    });
    revalidatePath(`/posts`)
    return NextResponse.json({success: true});
}