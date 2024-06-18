'use client';
import { ProductAddForm } from "@/components/products/product-add-form";
import { ProductTable } from "@/components/products/table-products";
import CurrentPage from "@/components/reusable/current-page";
import { ProductsContextProvider } from "@/context/products-context";



export default function Stock() {
    return (
        <>
            <ProductsContextProvider>
                <div>
                    <CurrentPage path={"/stock"} name={"Estoque"}></CurrentPage>
                    <ProductAddForm />
                    <ProductTable />
                </div>
            </ProductsContextProvider>
        </>
    );
}