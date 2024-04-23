import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";



export type NotificationType = {
    id: number;
    tittle: string;
    description: string;
    date: string;
  }
  
  export type NotificationsType = {
    notifications: NotificationType[];
  }

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
        const result = await backendAPI.get("/notifications", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const notifications = result.data as NotificationsType;
        return new Response(JSON.stringify(notifications));
        
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