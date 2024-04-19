'use client';
import { ColumnDef } from "@tanstack/react-table"
import { InfoButton } from "./table-buttons/info-button";

export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
}

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
      return <p>R$ {formatedValue}</p>
    }
  },
  {
    accessorKey: "amount",
    header: "QUANTIDADE",
    cell: ({ row }) => {
      const amountOn = row.getValue("amount") as number;
      const formatedClass = (amountOn < 4) ? "text-red-800 font-bold" : "text-black";
      return <p className={formatedClass}>{amountOn}</p>
    }
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <>
          <InfoButton id={id}></InfoButton>
        </>
      );
    },
  }
]