

import CurrentPage from "@/components/reusable/current-page";


export default function Dashboard(){
    const today = new Date();

    const formatDate = (today:Date) => {
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do zero
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      };

    return(
        <>
        <div>
            <CurrentPage path={"dashboard"}></CurrentPage>
            <h1 className="text-2xl">Olá, seja bem-vindo(a)!</h1>
            <h2>{formatDate(today)}</h2>
        </div>
        </>
    );
}