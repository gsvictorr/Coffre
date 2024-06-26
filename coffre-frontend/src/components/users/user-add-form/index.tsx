'use client';

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { CustomAlert, CustomAlertType } from "@/components/alerts/custom-alerts";
import { frontendAPI } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UsersContext } from "@/context/users-context";
import { UserResponseType } from "@/app/api/user/route";

const userInsertSchema = z.object({
    name: z.string().min(3, { message: "Insira um nome com no mínimo 3 caracteres." }),
    password: z.string().min(8, { message: "Insira uma senha com no mínimo 8 caracteres." }),
    email: z.string().min(10, { message: "Insira um email com no mínimo 8 caracteres." }),
    role: z.string().min(4, { message: "Insira um tipo com no mínimo 4 caracteres." }),

});

type InsertUserType = z.infer<typeof userInsertSchema>;

export function UserAddForm() {

    const [loading, setLoading] = useState(false);

    const userContext = useContext(UsersContext);

    const [message, setMessage] = useState(<></>);




    const insertForm = useForm<InsertUserType>({
        resolver: zodResolver(userInsertSchema),
        defaultValues: {
            name: "",
            password: "ABCDEFG@@",
            email: "",
            role: "USER",
        }
    });

    async function clickAddUser({ name, password, email, role }: InsertUserType) {
        setLoading(true);


        const data = JSON.stringify({
            name, password, email, role
        });

        try {
            const result = await frontendAPI.post("/user/register", data);
            const { name, error } = result.data as UserResponseType;

            if (name) {
                const message = <CustomAlert className="w-84 mr-4" type={CustomAlertType.SUCCESS}
                    title="Usuário adicionado!"
                    message={`O usuário ${name} foi adicionado com sucesso.`}>
                </CustomAlert>;

                setMessage(message);
                userContext.refreshTable();

            } else {
                const message = <CustomAlert className="w-84 mr-4"
                    type={CustomAlertType.ERROR}
                    title="Erro ao adicionar usuário."
                    message={error || "Erro desconhecido."}
                >
                </CustomAlert>;
                setMessage(message);
            }

        } catch (e) {

            const message = <CustomAlert className="w-84 mr-4"
                type={CustomAlertType.ERROR}
                title="Erro ao adicionar usuário."
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
                    <Button className="bg-principal text-white rounded-full mr-4 shadow-md">
                        <PlusCircle className="size-4 mr-1"></PlusCircle>
                        Novo usuário</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cadastrar novo usuário</DialogTitle>
                        <DialogDescription>Adicionar um novo usuário no sistema</DialogDescription>
                    </DialogHeader>
                    <Form {...insertForm}  >
                        <form onSubmit={insertForm.handleSubmit(clickAddUser)} className="grid gap-4">
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
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <div className="grid items-center">
                                            <FormItem>
                                                <Label htmlFor="email">Email</Label>
                                                <FormControl>
                                                    <Input id="email" className="w-80" {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="role"
                                render={({ field }) => {
                                    return (
                                        <div className="grid items-center">
                                            <FormItem>
                                                <Label htmlFor="role">Tipo (selecione)</Label>
                                                <FormControl>
                                                    <div>
                                                        <select id="role" className="w-80 p-1 pl-3 appearance-none border border-1 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-principal" {...field}>
                                                            <option value="USER">Usuário</option>
                                                            <option value="ADMIN">Administrador</option>
                                                        </select>
                                                    </div>
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
                                    <Button type="submit" className="bg-principal text-white" disabled={loading}>{loading ? <Loader2 className="animate-spin h-5 w-5 " /> : "Cadastrar"}</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                    <p className="text-xs">A senha padrão para novos usuários é: "ABCDEFG@@", sem as aspas.</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}
