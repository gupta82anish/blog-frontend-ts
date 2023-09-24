import { TBlogPostSchema, TNotFoundSchema } from '@/lib/types';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
export async function getPosts(page: number, limit: number): Promise<any> {


    try{
        const cookie = cookies().get('accessToken');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookie?.value}`
            },
            cache: 'no-store'
        })
        if(res.status !== 200){
            return NextResponse.json({success: false, response: []});
        } else{
            const data = await res.json();
            return NextResponse.json({success: true, response: data});
        }
    } catch(err){
        console.log(err)
        return NextResponse.json({serverError: true, response: []});
    }
};

export async function getPost(id: number): Promise<TBlogPostSchema | TNotFoundSchema> {
    const cookie = cookies().get('accessToken');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie?.value}`
        },
        cache: 'no-store'
    })

    const data = await res.json();
    return data;
}

export async function setTokenCookie(cookieName:string, token: string, httpOnly?: boolean): Promise<void> {
    const threeDay = 24 * 60 * 60 * 3
    cookies().set({
        name: cookieName,
        value: token,
        httpOnly: httpOnly || false,
        maxAge: threeDay,
    })
}

export async function checkSession() {
    const cookiesList = cookies()
    const hasCookie = cookiesList.has('loggedIn')
    return hasCookie
}