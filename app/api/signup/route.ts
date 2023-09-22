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
    const parsedResponse:any  = signupResponseSchema.safeParse(resData);
    let zodResponseErrors = {};
    if(!parsedResponse.success){
        return NextResponse.json({failure: true});
    } else {
        setTokenCookie('accessToken', parsedResponse.data.accessToken, true).then(() => {
        });
        setTokenCookie('loggedIn', 'true').then(() => {
        });
    }
    return NextResponse.json({response: {id:parsedResponse.data.id,
        name:parsedResponse.data.name,
        email:parsedResponse.data.email}});
}