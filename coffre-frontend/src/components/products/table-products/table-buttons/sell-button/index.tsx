'use client';

import { z } from "zod";
import { CustomAlert, CustomAlertType } from "@/components/alerts/custom-alerts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsContext } from "@/context/products-context";
import { frontendAPI } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductResponseType } from "@/app/api/product/route";

type SellButtonProps = {
    id: number;
}

const sellSchema = z.object({
    id: z.number().optional(),
    amount: z.coerce.number().min(0.01, { message: "Insira uma quantidade válida." }),
});

type sellProductType = z.infer<typeof sellSchema>;

export function SellButton({ id }: SellButtonProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [productId, setProductId] = useState(id); 
    const productsContext = useContext(ProductsContext);

    const sellForm = useForm<sellProductType>({
        resolver: zodResolver(sellSchema)
    });

    async function clickSellProduct({ amount }: sellProductType) {
        setLoading(true);

        const data = JSON.stringify({
            id: productId, 
            amount
        });

        try {
            const result = await frontendAPI.post("/product/sell", data);
            console.log(data);
            const { name, error } = result.data as ProductResponseType;

            if (name) {
                const message = <CustomAlert className="mt-4 w-full" type={CustomAlertType.SUCCESS}
                    title="Venda realizada!"
                    message={`O produto: ${name} foi vendido com sucesso.`}>
                </CustomAlert>;
                setMessage(message);
                productsContext.refreshTable();
                console.log()
            } else {
                const message = <CustomAlert className="mt-4 w-full"
                    type={CustomAlertType.ERROR}
                    title="Erro ao realizar venda!"
                    message={error || "Erro desconhecido."}
                >
                </CustomAlert>;
                setMessage(message);
            }

        } catch (e) {
            const message = <CustomAlert className="mt-4 w-full"
                type={CustomAlertType.ERROR}
                title="Erro ao realizar venda!"
                message="API fora do ar, tente novamente mais tarde!"
            />;
            setMessage(message);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(<></>), 3500);
        }

    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"ghost"} className="text-base bg-transparent shadow-none" key={id}>
                    <CircleDollarSign className="size-4 text-principal"></CircleDollarSign>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {message}
                <DialogHeader>
                    <DialogTitle>Realizar venda</DialogTitle>
                    <DialogDescription>Você está prestes a realizar uma venda!</DialogDescription>
                </DialogHeader>


                <Form {...sellForm}  >
                    <form onSubmit={sellForm.handleSubmit(clickSellProduct)} className="grid gap-4">
                    <Label htmlFor="id">ID:</Label>
                        <Input disabled id="id" value={id} className="w-24"/> 

                        <FormField
                            control={sellForm.control}
                            name="amount"
                            render={({ field }) => {
                                return (
                                    <div className="items-center gap-4">
                                        <FormItem>
                                            <Label htmlFor="amount" className="text-right">QUANTIDADE:</Label>
                                            <FormControl>
                                                <Input type="number" id="amount"  {...field} className="w-80" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )
                            }}
                        />

                        <DialogFooter>
                            <Button type="submit" className="bg-principal text-white" disabled={loading}>{loading ? <Loader2 className="animate-spin h-5 w-5 " /> : "Vender"}</Button>
                            <DialogClose asChild>
                                <Button type="button" variant={"destructive"} className="text-white bg-red-800">Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}