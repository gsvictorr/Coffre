import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";


export const enum CustomAlertType {
    SUCCESS = "success",
    ERROR = "error"
}


export type CustomAlertProps = {
    type: CustomAlertType.SUCCESS | CustomAlertType.ERROR;
    title: string;
    message: string;
    className?: string;
}

export function CustomAlert({ type, title, message, className = "" }: CustomAlertProps) {

    const alert = type === CustomAlertType.SUCCESS
        ? <SuccessAlert title={title} message={message} className={className} />
        : <ErrorAlert title={title} message={message} className={className} />

    return alert;
}

type SuccessAlertProps = {
    title: string;
    message: string;
    className: string;
};

function SuccessAlert({ title, message, className }: SuccessAlertProps) {
    return (
        <Alert className={cn("flex-row border-emerald-500 mb-2 transition-opacity duration-500 ease-in-out", className)}>
            <CheckCircleIcon className="h-8 w-8 stroke-emerald-800"></CheckCircleIcon>
            <AlertTitle className="font-bold mx-4">
                {title}
            </AlertTitle>
            <AlertDescription className="font-thin mx-4">
                {message}
            </AlertDescription>
        </Alert>
    )
}

type ErrorAlertProps = {
    title: string;
    message: string;
    className: string;
}

function ErrorAlert({ title, message, className }: ErrorAlertProps) {
    return (
        <Alert className={cn("flex-row border-red-800 mb-2 transition-opacity duration-500 ease-in-out", className)}>
            <AlertCircleIcon className="h-8 w-8 stroke-red-800"></AlertCircleIcon>
            <AlertTitle className="font-bold mx-4">
                {title}
            </AlertTitle>
            <AlertDescription className="font-thin mx-4">
                {message}
            </AlertDescription>
        </Alert>
    )
}