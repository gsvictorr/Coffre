'use client';
import { ProductsContext } from "@/context/products-context"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export function ProductTable() {

  const productContext = useContext(ProductsContext);

  const products = productContext.products;

  return (
    <div className="py-10">
      {products.length === 0 ? (
        <LoadingSkeleton/>
      ) : (
        <DataTable columns={columns} data={products}/>   
      )}
    </div>
  )
}