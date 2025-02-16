import RoutinePage from "@/components/routine";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const sesion = await auth();
    if (!sesion?.user){
        redirect("/login");
    }
    return <RoutinePage></RoutinePage>;
}
