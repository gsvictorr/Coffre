'use client';
import { ProductResponseType, ProductType } from "@/app/api/product/route";
import { CustomAlert, CustomAlertType } from "@/components/alerts/custom-alerts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ProductsContext } from "@/context/products-context";
import { frontendAPI } from "@/lib/api";
import { Loader2, Trash2 } from "lucide-react";
import { Suspense, useContext, useEffect, useState } from "react";

type DeleteButtonProps = {
    id: number;
}

export function DeleteButton({ id }: DeleteButtonProps) {

    const productsContext = useContext(ProductsContext);
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState<ProductType | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    async function removeProduct(id: number) {
        setLoading(true);
        try {
            const url = `/product/${id}`;
            await frontendAPI.delete(url);
            productsContext.refreshTable();
        } catch (error) {

        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    }

    useEffect(() => {
        if (dialogOpen) {
            getProduct(id);
        }
    }, [dialogOpen]);

    async function getProduct(id: number) {
        try {
            const url = `/product/${id}`;
            const result = await frontendAPI.get(url);
            const product = result.data as ProductType;

            if (product) {
                setProductData(product);
            }
        } catch (error) {

        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Suspense fallback={<LoadingSkeleton />} />
            <DialogTrigger>
                <Button variant={"ghost"} key={id} className="text-base bg-transparent shadow-none">
                    <Trash2 className="size-4 text-gray-500 group-hover:text-red-800" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Excluir produto?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {productData ? (
                        <p>Deseja realmente excluir o produto {productData.name}?</p>
                    ) : (
                        <Loader2 className="animate-spin h-5 w-5" />
                    )}
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"destructive"} className="text-white bg-red-800">Cancelar</Button>
                    </DialogClose>
                    <Button className="mb-2 hover:text-red-800" key={id} variant={"ghost"} disabled={loading} onClick={async () => await removeProduct(id)}>
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <h1>Excluir</h1>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
