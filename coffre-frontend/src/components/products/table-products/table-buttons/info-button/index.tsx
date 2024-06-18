'use client';
import React, { Suspense, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { frontendAPI } from "@/lib/api";
import { Eye, Info, Loader2, Pencil } from "lucide-react";
import { z } from "zod";
import { CustomAlert, CustomAlertType } from "@/components/alerts/custom-alerts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { ProductsContext } from "@/context/products-context";
import { ProductResponseType, ProductType } from "@/app/api/product/route";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

type InfoButtonProps = {
    id: number;
}

const productAltSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).optional(),
    price: z.coerce.number().min(0.01).optional(),
    amount: z.coerce.number().min(0.01).optional()
});


type AlterProductType = z.infer<typeof productAltSchema>;

export function InfoButton({ id }: InfoButtonProps) {
    const [edit, setEdit] = useState(true);
    const [data, setData] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(<></>);
    const productsContext = useContext(ProductsContext);


    async function getProduct(id: number) {
        try {
            const url = `/product/${id}`;
            const result = await frontendAPI.get(url);
            const product = result.data as ProductType;

            if (product) {
                setData(product);
            }
        } catch (error) {
            <CustomAlert className="w-84"
                type={CustomAlertType.ERROR}
                title="Erro ao alterar produto."
                message="Erro ao localizar produto"
            >
            </CustomAlert>;
        }
    }

    function editButton() {
        setEdit(!edit);
    }

    const alterForm = useForm<AlterProductType>({
        resolver: zodResolver(productAltSchema)
    });

    async function clickAlterProduct({ id, name, price, amount }: AlterProductType) {
        setLoading(true);

        const requestData = JSON.stringify({
            id: id || (data ? data.id : ''),
            name: name || (data ? data.name : ''),
            price: price || (data ? data.price : ''),
            amount: amount || (data ? data.amount : '')
        });


        try {
            const result = await frontendAPI.put("/product", requestData);

            const { name, error } = result.data as ProductResponseType;

            if (name) {
                const message = <CustomAlert className="mt-4 w-full" type={CustomAlertType.SUCCESS}
                    title="Produto alterado!"
                    message={`O produto: ${name} foi alterado com sucesso.`}>
                </CustomAlert>;
                setMessage(message);
                productsContext.refreshTable();


            } else {
                const message = <CustomAlert className="mt-4 w-full"
                    type={CustomAlertType.ERROR}
                    title="Erro ao alterar produto."
                    message={error || "Erro desconhecido."}
                >
                </CustomAlert>;
                setMessage(message);
            }

        } catch (e) {
            const message = <CustomAlert className="mt-4 w-full"
                type={CustomAlertType.ERROR}
                title="Erro ao alterar produto."
                message="API fora do ar, tente novamente mais tarde!"
            />;
            setMessage(message);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(<></>), 3500); // 3,5 segundos
            editButton();
        }

    };
    return (
        <Dialog>
            <Suspense fallback={<LoadingSkeleton />} />
            <DialogTrigger>
                <Button variant={"ghost"} key={id} onClick={async () => {
                    await getProduct(id);
                }} className="text-base bg-transparent shadow-none">
                    <Eye className="size-4 text-black dark:text-white"></Eye>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {message}
                <DialogHeader>
                    <DialogTitle>Informações do produto</DialogTitle>
                    <DialogDescription>Informações sobre o produto</DialogDescription>
                    <Button type="button" variant={"outline"} onClick={editButton} className="w-24"><Pencil className="w-3 h-3 mr-1"></Pencil>Editar</Button>
                </DialogHeader>
                <Form {...alterForm}  >
                    <form onSubmit={alterForm.handleSubmit(clickAlterProduct)} className="grid gap-4">


                        <FormField
                            control={alterForm.control}
                            name="id"
                            render={({ field }) => {
                                return (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormItem>
                                            <FormControl>
                                                <p id="id" {...field} className="col-span-3 font-semibold italic text-xs text-gray-600">{data ? 'ID: ' + data.id : 'Procurando ID...'}</p>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )
                            }}
                        />


                        <FormField
                            control={alterForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormItem>
                                            <Label htmlFor="name" className="text-right">NOME:</Label>
                                            <FormControl>
                                                <Input id="name" disabled={edit} defaultValue={data ? data.name : ''} {...field} className="col-span-3 w-80" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )
                            }}
                        />

                        <FormField
                            control={alterForm.control}
                            name="price"
                            render={({ field }) => {
                                return (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormItem>
                                            <Label htmlFor="price" className="text-right">PREÇO (R$):</Label>
                                            <FormControl>
                                                <Input id="price" disabled={edit} type="number" defaultValue={data ? data.price : ''} {...field} className="col-span-3 w-80" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )
                            }}
                        />

                        <FormField
                            control={alterForm.control}
                            name="amount"
                            render={({ field }) => {
                                return (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormItem>
                                            <Label htmlFor="amount" className="text-right">QUANTIDADE:</Label>
                                            <FormControl>
                                                <Input id="amount" disabled={edit} type="number" defaultValue={data ? data.amount : ''} {...field} className="col-span-3 w-80" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )
                            }}
                        />

                        <DialogFooter>
                            {!edit && (
                                <Button type="submit" className="bg-principal text-white mt-2" disabled={loading}>{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Salvar"}</Button>
                            )}
                            <DialogClose asChild>
                                <Button type="button" variant={"destructive"} className="text-white bg-red-800" onClick={() => setEdit(true)}>Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 