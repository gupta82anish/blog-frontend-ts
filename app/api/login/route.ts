import { setTokenCookie } from "@/app/_services/api";
import { loginResponseSchema, loginSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body:unknown = await request.json();
    console.log(body);
    const result = loginSchema.safeParse(body);

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

   console.log(result.data)
    // TODO: Change the post request to the correct endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            strategy: 'local',
            email: result.data.email,
            password: result.data.password,
        })
    });
    const resData: unknown = await res.json();
    console.log(resData)
    const parsedResponse = loginResponseSchema.safeParse(resData);
    console.log(parsedResponse)
    let zorResponseErrors = {};
    if(!parsedResponse.success){
        console.log('Unsuccessful Login')
        console.log(parsedResponse.error.flatten())
    } else {
        console.log('Successful Login')
        setTokenCookie(parsedResponse.data.accessToken).then(() => {
            console.log('Cookie Set')
        });
    }
    
    return NextResponse.json({success: true});
} 