import { getRoutines } from "./actions";
import { auth } from "../../../auth";
import { IUser } from "../(auth)/login/actions";
import Routines from "@/components/routines";
import { redirect } from "next/navigation";

export default async function Page() {
    const sesion = await auth();
    if (!sesion?.user){
        redirect("/login");
    }
    const user = sesion!.user! as IUser;
    const routines = (await getRoutines(user.id)) || [];


    return (
        <Routines routines={routines} user={user} view={true}/>
    );
    }
