import { blogPostSchema } from "@/lib/types";
import { parse } from "cookie";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse>{

    return NextResponse.json({success: true});
}

export async function PATCH(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    const result: any = blogPostSchema.safeParse(body);
    // const { accessToken } = request.headers;
    const accessToken = parse(request.headers.get('cookie') || '').accessToken;
    const postId = request.headers.get('post-id');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
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
    if(response.status !== 200){
        return NextResponse.json({success: false});
    } else {
        revalidatePath(`/posts/${postId}/edit`)
        return NextResponse.json({success: true});
    }
}

export async function DELETE(request: Request): Promise<NextResponse>{

    const accessToken = parse(request.headers.get('cookie') || '').accessToken;
    const postId = request.headers.get('post-id');
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