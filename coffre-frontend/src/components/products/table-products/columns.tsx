'use client';
import { ColumnDef } from "@tanstack/react-table";
import { InfoButton } from "./table-buttons/info-button";
import { SellButton } from "./table-buttons/sell-button";
import { DeleteButton } from "./table-buttons/delete-button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "PRODUTO",
  },
  {
    accessorKey: "price",
    header: "PREÇO (R$)",
    cell: ({ row }) => {
      const value = row.getValue("price") as number;
      const formatedValue = value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return <p>R$ {formatedValue}</p>;
    }
  },
  {
    accessorKey: "amount",
    header: "QUANTIDADE",
    cell: ({ row }) => {
      const amountOn = row.getValue("amount") as number;
      const formatedClass = (amountOn < 4) ? "text-red-800 font-bold" : "";
      return <p className={formatedClass}>{amountOn}</p>;
    }
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const { user } = useContext(AuthContext);
      const id = row.original.id;
      return (
        <>
          <InfoButton id={id}></InfoButton>
          <SellButton id={id}></SellButton>
          {user?.userRole !== 'USER' && <DeleteButton id={id}></DeleteButton>}
        </>
      );
    },
  }
];
