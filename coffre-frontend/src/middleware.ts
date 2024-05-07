import { NextRequest, NextResponse } from "next/server";

type BackendValidateTokenResponseType = {
    token_valid: boolean;
}

type BackendValidateTokenRequestType = {
    token: string;
}

export default async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("coffre.token")?.value;

    if (authToken) {
        const isTokenValid = await validateToken(authToken);

        if (isTokenValid)
            return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));

}

export const config = {
    matcher: ['/dashboard', '/stock', '/notifications', '/users', '/settings']
}

async function validateToken(token: string) {

    var isValid = false;

    try {
        const response = await fetch("http://localhost:8080/api/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token } as BackendValidateTokenRequestType)
        });

        const jsonResponse = await response.json() as BackendValidateTokenResponseType;

        isValid = jsonResponse.token_valid;

    } catch (e) {
        isValid = false;
    }

    return isValid;

}