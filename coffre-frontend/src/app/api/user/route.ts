import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";


export type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
}

export type UsersType = {
    users: UserType[];
}

export type BackendUserErrorResponseType = {
    error: string;
}

export type UserResponseType = {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    error?: string;
}


export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("coffre.token")?.value;
    var response: BackendUserErrorResponseType;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }

    try {
        const result = await backendAPI.get("/user", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const users = result.data as UsersType;
        return new Response(JSON.stringify(users));

    } catch (e) {
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendUserErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }

        return new Response(JSON.stringify(response));
    }

}