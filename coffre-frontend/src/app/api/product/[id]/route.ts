import { NextRequest } from "next/server";
import { BackendProductErrorResponseType, ProductType } from "../route";
import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";

type GetProductType = {
    params: {
        id: number;
    }
}

export async function GET(request: NextRequest, {params} : GetProductType){


    const authToken = request.cookies.get("coffre.token")?.value;

    var response:  BackendProductErrorResponseType;
    if(!authToken){
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }

    try {
        const url = `/product/${params.id}`;
        const result = await backendAPI.get(url, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const product = result.data as ProductType;
        return new Response(JSON.stringify(product));
        
    } catch (e) {
        
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendProductErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }
        
        return new Response(JSON.stringify(response));
    }
}