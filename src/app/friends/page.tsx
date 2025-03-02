import Friends from "@/components/friends/friends";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getFriends } from "./actions";

export default async function FriendsPage() {
        const sesion = await auth();
        if (!sesion?.user){
            redirect("/login");
        }
        const data = await getFriends(Number(sesion.user.id))
    return (
        <>
            <Friends friends={data || []} session={sesion.user}/>
        </>
    );
}