import { ProductTable } from "@/components/products/table-products";
import CurrentPage from "@/components/reusable/current-page";
import { ProductsContextProvider } from "@/context/products-context";


export default function Stock() {
    return (
        <>
            <ProductsContextProvider>
                <div>
                    <CurrentPage path={"stock"}></CurrentPage>
                    <ProductTable></ProductTable>
                </div>
            </ProductsContextProvider>
        </>
    );
}