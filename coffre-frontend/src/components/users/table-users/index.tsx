'use client';
import { ProductsContext } from "@/context/products-context"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react"
import { UsersContext } from "@/context/users-context";



export function UserTable() {

  const usersContext = useContext(UsersContext);

  const users = usersContext.users;

  return (
    <div className="max-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  )
}