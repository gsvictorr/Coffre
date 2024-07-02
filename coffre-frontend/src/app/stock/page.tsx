'use client';
import { ProductAddForm } from "@/components/products/product-add-form";
import { ProductTable } from "@/components/products/table-products";
import CurrentPage from "@/components/reusable/current-page";
import { AuthContext } from "@/context/auth-context";
import { ProductsContextProvider } from "@/context/products-context";
import { useContext } from "react";



export default function Stock() {

    const { user } = useContext(AuthContext);

    return (
        <>
            <ProductsContextProvider>
                <div>
                    <CurrentPage path={"/stock"} name={"Estoque"}></CurrentPage>
                    {user?.userRole !== 'USER' && <ProductAddForm />}
                    <ProductTable />
                </div>
            </ProductsContextProvider>
        </>
    );
}