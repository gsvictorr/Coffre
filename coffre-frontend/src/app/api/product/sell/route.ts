import { NextRequest } from "next/server";
import { ProductResponseType } from "../route";
import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";

type BackendProductErrorResponseType = {
    error: string;
  }

export async function POST(request: NextRequest){

    const authToken = request.cookies.get("coffre.token")?.value;

    var auth:  BackendProductErrorResponseType;

    if(!authToken){
        return new Response(JSON.stringify(new Error("Usuário não autorizado")));
    }
    const { id, amount } = await request.json();

    const data = JSON.stringify({ id, amount });

    var response: ProductResponseType;

    try {
        const result = await backendAPI.post("/product/sell", data, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        const { name } = result.data;
        response = { name };

    } catch (e) {
        const axiosError = e as AxiosError;

        const { error } = axiosError.response?.data as BackendProductErrorResponseType;

        if (error) {
            response = { error };
        }
        else {
            response = { error: axiosError.message };
        }
    }

    return new Response(JSON.stringify(response));

}