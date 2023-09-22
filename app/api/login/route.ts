import { setTokenCookie } from "@/app/_services/api";
import { loginResponseSchema, loginSchema } from "@/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse>{
    const body:unknown = await request.json();
    
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
    
    const parsedResponse: any = loginResponseSchema.safeParse(resData);
    
    let zodResponseErrors = {};
    if(!parsedResponse.success){
        
        
        return NextResponse.json({failure: true});
    } else {
        
        setTokenCookie('accessToken', parsedResponse.data.accessToken, true).then(() => {
            
        });
        setTokenCookie('loggedIn', 'true').then(() => {
            
        });
    }
    
    return NextResponse.json({response: parsedResponse.data?.user});
}

export async function DELETE(request: Request): Promise<NextResponse>{
    cookies().delete('loggedIn');
    cookies().delete('accessToken');
    return NextResponse.json({response: 'ok'});
}