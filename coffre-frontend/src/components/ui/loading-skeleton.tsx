
import { Loader2 } from "lucide-react";

export function LoadingSkeleton(){

    return(
        <div className="flex items-center justify-center">
            <h1 className="text-principal font-bold">Carregando...</h1>
            <Loader2 size={20} className="text-principal animate-spin"></Loader2>
        </div>
    );

}