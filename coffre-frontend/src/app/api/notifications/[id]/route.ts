import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type DeleteNotificationType = {
    params: {
        id: number
    }
};

type BackendErrorResponseType = {
    error: string;
  };

export async function DELETE(request: NextRequest, {params} : DeleteNotificationType){


    const authToken = request.cookies.get("coffre.token")?.value;

    var response:  BackendErrorResponseType;
    if(!authToken){
        return new Response(JSON.stringify(new Error("Usuário não autorizado")));
    }

    try {
        const url = `/notifications/${params.id}`;
        const result = await backendAPI.delete(url, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        return new Response("");
        
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