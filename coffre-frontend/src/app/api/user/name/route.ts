import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export type NameResponseType = {
    name?: string;
};

type BackendErrorResponseType = {
    error: string;
}

export async function GET(request: NextRequest){
    const authToken = request.cookies.get("coffre.token")?.value;

    var response:  BackendErrorResponseType;
    if(!authToken){
        return new Response(JSON.stringify(new Error("Usuário não autorizado")));
    }

    try {
        const result = await backendAPI.get("/user/name", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const name = result.data as NameResponseType;
        return new Response(JSON.stringify(name));
        
    } catch (e) {
        
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }
        
        return new Response(JSON.stringify(response));
    }
}