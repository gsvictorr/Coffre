'use client';

import { AuthContext } from "@/context/auth-context";
import { frontendAPI } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomAlert, CustomAlertType } from "../alerts/custom-alerts";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { LoginResponseType } from "@/api/auth/login/route";

const loginFormSchema = z.object({
    email: z.string().email({message: "Insira um email válido."}).min(10, {message: "Insira um email com no mínimo 10 caracteres."}),
    password: z.string().min(8, {message: "Insira uma senha com no mínimo 8 caracteres."})
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm(){

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState(<></>);

    const authContext = useContext(AuthContext);

    const router = useRouter();

    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function clickLogin({ email, password }: LoginFormType){
        setLoading(true);
        const data = JSON.stringify({
            email, password
        });

        try {
            const result = await frontendAPI.post("/auth/login", data);

            const {token, error} = result.data as LoginResponseType;

            if(token){
                authContext.signIn(token);
                router.push("/dashboard");

            } else{
                const message = <CustomAlert
                type={CustomAlertType.ERROR}
                title="Erro ao logar-se!"
                message={error || "Erro desconhecido."}
                >
                </CustomAlert>;
                setMessage(message);
            }
            
        } catch (e) {

            const message = <CustomAlert
                type={CustomAlertType.ERROR}
                title="Erro ao logar-se!"
                message="API fora do ar, tente novamente mais tarde!"
            />;

            setMessage(message);    
        } finally{
            setLoading(false);
            setTimeout(() => setMessage(<></>), 3500);
        }

    };

    return(
        <>
            <div className="flex items-center h-screen">
                <div className="container space-y-2 p-8 max-w-md rounded-xl shadow-md dark:bg-zinc-900">
                    <span className="flex items-center justify-center">
                        <h1 className="font-bold text-principal text-3xl">Coffre</h1>
                        </span>
                    <span className='flex justify-center text-md'>Realize seu login</span>
                    <Form{...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(clickLogin)}>
                            {message}
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="mb-2">
                                            <Label htmlFor='text' className='font-bold text-sm'>Email</Label>
                                            <FormControl>
                                                <Input type='text' placeholder='Digite seu email' className='rounded-none border-2 border-s-principal'  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField

                                control={loginForm.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <Label htmlFor='password' className='font-bold text-sm'>Senha</Label>
                                            <FormControl>
                                                <Input type='password' placeholder='Digite sua senha' className='rounded-none border-2 border-s-principal' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )

                                }}
                            />
                            <div className='flex justify-end'>
                            <Button type="submit" className='bg-principal mt-5 text-slate-50 font-normal rounded-none' disabled={loading}>{loading ? <Loader2 className="animate-spin h-5 w-5 "/> : "Login"}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div >
        </>

    );
    
}