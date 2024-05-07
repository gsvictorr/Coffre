import { ProductAddForm } from "@/components/products/product-add-form";
import { ProductTable } from "@/components/products/table-products";
import CurrentPage from "@/components/reusable/current-page";
import { ProductsContextProvider } from "@/context/products-context";
import { Suspense } from "react";



export default function Stock() {
    return (
        <>
            <ProductsContextProvider>
                <div>
                    <CurrentPage path={"Estoque"}></CurrentPage>
                    <ProductAddForm/>
                    <ProductTable/>
                </div>
            </ProductsContextProvider>
        </>
    );
}