'use client';

import { ProductType, ProductsType } from "@/app/api/product/route";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import React, { createContext } from "react";

type ProductsContextType = {
    products: ProductType[];
    refreshTable: () => void;
}

async function getData(): Promise<ProductType[]> {

    var data: ProductType[] = [];
  
    try {
      const result = await frontendAPI.get("/product");
      const {products} = result.data as ProductsType;
  
      if(products){
        data = products;
      }
      
    } catch (error) {
      data= [];
      
    }
    return data;
    
  }


export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({children}: {children: React.ReactNode}){

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getData().then((response) => {
        setProducts(response);
        setLoading(false);
      });
    }, []);


    function refreshTable(){
        getData().then((response) => {
            setProducts(response);
          });
    }

    return (
        <ProductsContext.Provider value={{products, refreshTable}}>
                {!loading ? children : <LoadingSkeleton/>}
        </ProductsContext.Provider>
    )
}