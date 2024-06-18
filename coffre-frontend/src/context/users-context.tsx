'use client';

import { UserType, UsersType } from "@/app/api/user/route";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import React, { createContext } from "react";

type UsersContextType = {
    users: UserType[];
    refreshTable: () => void;
}

async function getData(): Promise<UserType[]> {

    var data: UserType[] = [];
  
    try {
      const result = await frontendAPI.get("/user");
      const {users} = result.data as UsersType;
  
      if(users){
        data = users;
      }
      
    } catch (error) {
      data= [];
      
    }
    return data;
    
  }


export const UsersContext = createContext({} as UsersContextType);

export function UsersContextProvider({children}: {children: React.ReactNode}){

    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      getData().then((response) => {
        setUsers(response);
        setLoading(false);
      });
    }, []);


    function refreshTable(){
        getData().then((response) => {
            setUsers(response);
          });
    }

    return (
        <UsersContext.Provider value={{users, refreshTable}}>
                {!loading ? children : <LoadingSkeleton/>}
        </UsersContext.Provider>
    )
}