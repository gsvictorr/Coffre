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
import { Loader2, SquareArrowRight } from "lucide-react";
import { LoginResponseType } from "@/app/api/auth/login/route";
import logo from "../../../public/logo.png";
import Image from "next/image";

const loginFormSchema = z.object({
    email: z.string().email({ message: "Insira um email válido." }).min(10, { message: "Insira um email com no mínimo 10 caracteres." }),
    password: z.string().min(8, { message: "Insira uma senha com no mínimo 8 caracteres." })
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {

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

    async function clickLogin({ email, password }: LoginFormType) {
        setLoading(true);
        const data = JSON.stringify({
            email, password
        });

        try {
            const result = await frontendAPI.post("/auth/login", data);

            const { token, error } = result.data as LoginResponseType;

            if (token) {
                authContext.signIn(token);
                router.push("/dashboard");

            } else {
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
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(<></>), 3500);
        }

    };

    return (
        <>
            <div className="flex items-center h-screen max-w-auto">
                <div className="container shadow-md space-y-2 p-8 max-w-3xl rounded-xl border border-1">
                <div className="w-full grid items-center justify-center gap-8 z-0 md:grid-cols-2 sm:grid-cols-1">
                        <div className="flex flex-col items-center justify-center text-center">
                            <Image
                                alt="coffre-logo"
                                src={logo}
                                width={80}
                                height={80}
                                className="rounded-xl shadow-md border mb-4"
                            />
                            <span className="text-gray-400">Sua chave para o controle eficiente!</span>
                        </div>
                        <div className="flex flex-col justify-center w-full gap-4">
                            <h1 className="font-bold text-gray-500 text-2xl">Entrar</h1>
                            <Form {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(clickLogin)} className="space-y-4 w-full">
                                    {message}
                                    <FormField
                                        control={loginForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="mb-2">
                                                <Label htmlFor='text' className='font-bold text-sm'>Email</Label>
                                                <FormControl>
                                                    <Input
                                                        type='text'
                                                        placeholder='Digite seu email'
                                                        className='rounded-none border-l-4 border-l-principal'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor='password' className='font-bold text-sm'>Senha</Label>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='Digite sua senha'
                                                        className='rounded-none border-l-4 border-l-principal'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div>
                                    <a href="" className="underline text-sm">Esqueci minha senha</a>

                                    <div className='flex justify-end'>
                                        <Button
                                            type="submit"
                                            className='bg-principal mt-5 text-white font-normal rounded-full shadow-md'
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <Loader2 className="animate-spin h-5 w-5" />
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span>Entrar</span>
                                                    <SquareArrowRight className="ml-2 size-4 " />
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                    </div>
                                
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}