import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'
export async function getPosts(page: number, limit: number): Promise<[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=10&$skip=${(page - 1)*10}`);
    const data = await res.json();
    return data;
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

export async function checkSession(): Promise<boolean>{
    // const loggedIn = cookies().get('loggedIn')
    // console.log(loggedIn?.value)
    // if (loggedIn === undefined){
    //     return false
    // } else if (loggedIn.value === 'true'){
    //     return true
    // }
    // return loggedIn

    const cookiesList = cookies()
    const hasCookie = cookiesList.has('loggedIn')
    return hasCookie

}