'use client';
import { ProductsContext } from "@/context/products-context"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react"



export function ProductTable() {

  const productContext = useContext(ProductsContext);

  const products = productContext.products;

  return (
    <div className="max-auto py-10">
      <DataTable columns={columns} data={products} />
    </div>
  )
}