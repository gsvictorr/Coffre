'use client';
import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "NOME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "TIPO",
    cell: ({ row }) => {
      const roleType = row.getValue("role") as string;
      const formatedClass = (roleType === "ADMIN") ? "text-red-800 font-bold" : "";
      return <p className={formatedClass}>{(roleType === "ADMIN" ? "ADMINISTRADOR" : "USUÁRIO")}</p>
    }
  },
]