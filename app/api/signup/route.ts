import { setTokenCookie } from "@/app/_services/api";
import { signUpSchema, signupResponseSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    const result = signUpSchema.safeParse(body);

    let zodErrors = {};
    // Can also use .flatten() to get all errors
    if(!result.success){
        result.error.issues.forEach((issue) => {
            zodErrors = {...zodErrors, [issue.path[0]]: issue.message};
        });
        return NextResponse.json(
            Object.keys(zodErrors).length > 0
            ? {errors: zodErrors}
            : {success: true}
        );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        })
    });

    const resData: unknown = await res.json();
    console.log('Signup Response')
    console.log(resData)
    const parsedResponse:any  = signupResponseSchema.safeParse(resData);
    // console.log(parsedResponse.error)
    let zodResponseErrors = {};
    if(!parsedResponse.success){
        console.log('Unsuccessful Signup')
        // console.log(parsedResponse.error.flatten())
        return NextResponse.json({failure: true});
    } else {
        console.log('Successful Signup')
        setTokenCookie('accessToken', parsedResponse.data.accessToken, true).then(() => {
            console.log('Cookie Set')
        });
        setTokenCookie('loggedIn', 'true').then(() => {
            console.log('User session valid Cookie Set')
        });
    }
    return NextResponse.json({response: {id:parsedResponse.data.id,
        name:parsedResponse.data.name,
        email:parsedResponse.data.email}});
}