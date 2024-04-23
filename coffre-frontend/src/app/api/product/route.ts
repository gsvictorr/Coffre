import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";


export type ProductType = {
    id: number;
    name: string;
    price: number;
    amount: number;
}

export type ProductsType = {
    products: ProductType[];
}

export type BackendProductErrorResponseType = {
    error: string;
}

export type ProductResponseType = {
    id?: number;
    name?: string;
    price?: number;
    amount?: number;
    error?: string;
}


export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("coffre.token")?.value;
    var response: BackendProductErrorResponseType;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }

    try {
        const result = await backendAPI.get("/product", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const products = result.data as ProductsType;
        return new Response(JSON.stringify(products));

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


export async function POST(request: NextRequest) {

    const authToken = request.cookies.get("coffre.token")?.value;

    var auth: BackendProductErrorResponseType;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }
    const { name, price, amount } = await request.json();

    const data = JSON.stringify({ name, price, amount });

    var response: ProductResponseType;

    try {
        const result = await backendAPI.post("/product", data, {
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


export async function PUT(request: NextRequest) {
    const authToken = request.cookies.get("coffre.token")?.value;

    var auth: BackendProductErrorResponseType;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado.")));
    }
    const { id, name, price, amount } = await request.json();

    const data = JSON.stringify({ id, name, price, amount });

    var response: ProductResponseType;

    try {
        const result = await backendAPI.put("/product", data, {
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


