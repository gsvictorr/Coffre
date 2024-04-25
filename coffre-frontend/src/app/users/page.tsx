import CurrentPage from "@/components/reusable/current-page";
import { UserTable } from "@/components/users/table-users";
import { UserAddForm } from "@/components/users/user-add-form";
import { UsersContextProvider } from "@/context/users-context";


export default function Users() {
    return (
        <>
            <UsersContextProvider>
                <div>
                    <CurrentPage path={"Usuários"}></CurrentPage>
                    <UserAddForm></UserAddForm>
                    <UserTable></UserTable>
                </div>
            </UsersContextProvider>
        </>
    );
}