import { NextRequest } from "next/server";
import { BackendUserErrorResponseType, UserResponseType } from "../route";
import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {

    const authToken = request.cookies.get("coffre.token")?.value;

    var auth: BackendUserErrorResponseType;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }
    const { name, password, email, role } = await request.json();

    const data = JSON.stringify({ name, password, email, role });

    var response: UserResponseType;

    try {
        const result = await backendAPI.post("/user/register", data, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const { name } = result.data;
        response = { name };

    } catch (e) {
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendUserErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }
    }

    return new Response(JSON.stringify(response));

}