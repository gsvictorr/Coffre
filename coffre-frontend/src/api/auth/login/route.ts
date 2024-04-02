import { backendAPI } from "@/lib/api";
import { NextRequest } from "next/server";
import { AxiosError } from "axios";

export type LoginResponseType = {
    token?: string;
    error?: string;
};

type BackendLoginErrorResponseType = {
    error: string;
}

export async function POST(request: NextRequest) {

    const { email, password } = await request.json();

    const data = JSON.stringify({ email, password });

    var response: LoginResponseType;

    try {

        const result = await backendAPI.post("/auth/login", data);
        const { token } = result.data;
        response = { token };

    } catch (e) {
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendLoginErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }
    }

    return new Response(JSON.stringify(response));
}