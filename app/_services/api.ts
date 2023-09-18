import { TBlogPostSchema } from '@/lib/types';
import { cookies } from 'next/headers'
export async function getPosts(page: number, limit: number): Promise<[]> {

    const cookie = cookies().get('accessToken');
    console.log(cookie?.value)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?$limit=10&$skip=${(page - 1)*10}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie?.value}`
        }
    })
    const data = await res.json();
    return data?.data;
};

export async function getAllPostsIds(): Promise<[]>{
    const cookie = cookies().get('accessToken');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?$select[]=id`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie?.value}`
        }
    })
    const data = await res.json();
    console.log(data)
    return data?.data.map((item: { id: number}) => {
        return{id: item.id.toString()}
    })
}

export async function getPost(id: number): Promise<TBlogPostSchema> {
    const cookie = cookies().get('accessToken');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie?.value}`
        }
    })

    return res.json();
}

export async function setTokenCookie(cookieName:string, token: string, httpOnly?: boolean): Promise<void> {
    const oneDay = 24 * 60 * 60
    cookies().set({
        name: cookieName,
        value: token,
        httpOnly: httpOnly || false,
        maxAge: oneDay,
    })
}

export async function checkSession() {
    const cookiesList = cookies()
    const hasCookie = cookiesList.has('loggedIn')
    return hasCookie
}