'use client';

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ProductResponseType } from "@/app/api/product/route";
import { CustomAlert, CustomAlertType } from "@/components/alerts/custom-alerts";
import { ProductsContext } from "@/context/products-context";
import { frontendAPI } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const productInsertSchema = z.object({
    name: z.string().min(3, { message: "Insira um nome com no mínimo 3 caracteres." }),
    price: z.coerce.number().min(0.01, { message: "Insira um valor válido." }),
    amount: z.coerce.number().min(0.01, { message: "Insira uma quantidade válida." })

});

type InsertProductType = z.infer<typeof productInsertSchema>;

export function ProductAddForm() {


    const [loading, setLoading] = useState(false);

    const productsContext = useContext(ProductsContext);

    const [message, setMessage] = useState(<></>);




    const insertForm = useForm<InsertProductType>({
        resolver: zodResolver(productInsertSchema),
        defaultValues: {
            name: "",
            price: 1,
            amount: 1
        }
    });

    async function clickAddProduct({ name, price, amount }: InsertProductType) {
        setLoading(true);
        const data = JSON.stringify({
            name, price, amount
        });

        try {
            const result = await frontendAPI.post("/product", data);

            const { name, error } = result.data as ProductResponseType;

            if (name) {
                const message = <CustomAlert className="w-84 mr-4" type={CustomAlertType.SUCCESS}
                    title="Produto adicionado!"
                    message={`O produto ${name} foi adicionado com sucesso.`}>
                </CustomAlert>;

                setMessage(message);
                productsContext.refreshTable();

            } else {
                const message = <CustomAlert className="w-84 mr-4"
                    type={CustomAlertType.ERROR}
                    title="Erro ao adicionar produto."
                    message={error || "Erro desconhecido."}
                >
                </CustomAlert>;
                setMessage(message);
            }

        } catch (e) {

            const message = <CustomAlert className="w-84 mr-4"
                type={CustomAlertType.ERROR}
                title="Erro ao adicionar produto."
                message="API fora do ar, tente novamente mais tarde!"
            />;
            setMessage(message);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(<></>), 3500); // 3,5 segundos
        }

    };

    return (
            <div className="flex justify-end">
                {message}
                <Dialog>
                    <DialogTrigger>
                        <Button className="bg-principal text-white rounded-full shadow-md">
                            <PlusCircle className="w-4 h-4 mr-1"></PlusCircle>
                            Novo produto</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Cadastrar novo produto</DialogTitle>
                            <DialogDescription>Adicionar um novo produto no estoque</DialogDescription>
                        </DialogHeader>
                        <Form {...insertForm}  >
                            <form onSubmit={insertForm.handleSubmit(clickAddProduct)} className="grid gap-4">
                                <FormField
                                    control={insertForm.control}
                                    name="name"
                                    render={({ field }) => {
                                        return (
                                            <div className="grid items-center">
                                                <FormItem>
                                                    <Label htmlFor="name">Nome</Label>
                                                    <FormControl>
                                                        <Input id="name" className="w-80" {...field}></Input>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )
                                    }}
                                />

                                <FormField
                                    control={insertForm.control}
                                    name="price"
                                    render={({ field }) => {
                                        return (
                                            <div className="grid items-center">
                                                <FormItem>
                                                    <Label htmlFor="price">Preço (R$)</Label>
                                                    <FormControl>
                                                        <Input type="number" id="price" className="w-24" {...field}></Input>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )
                                    }}
                                />

                                <FormField
                                    control={insertForm.control}
                                    name="amount"
                                    render={({ field }) => {
                                        return (
                                            <div className="grid items-center">

                                                <FormItem>
                                                    <Label htmlFor="amount">Quantidade</Label>
                                                    <FormControl>
                                                        <Input type="number" id="amount" className="w-24" {...field}></Input>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )
                                    }}
                                />

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant={"outline"}>Cancelar</Button>
                                    </DialogClose>
                                    <DialogClose>
                                        <Button type="submit" className="bg-principal text-white w-full mb-2" disabled={loading}>{loading ? <Loader2 className="animate-spin h-5 w-5 " /> : "Cadastrar"}</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
    )
}
