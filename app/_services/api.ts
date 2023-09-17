import { cookies } from 'next/headers'
export async function getPosts(page: number, limit: number): Promise<[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=10&$skip=${(page - 1)*10}`);
    const data = await res.json();
    return data;
}

export async function setTokenCookie(token: string): Promise<void> {
    cookies().set('token', token)
}