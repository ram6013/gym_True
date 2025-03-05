import Friends from "@/components/friends/friends";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Friend, getFriends } from "./actions";
import { getRoutines, Routine } from "../routines/actions";
export default async function FriendsPage() {
    const sesion = await auth();
    if (!sesion?.user) {
        redirect("/login");
    }

    const userPendding: { email: string, user_id: number, id: number}[] = [];
    const FriendData = new Map<string, { user_id: number, routines: Routine[]}>(); 
    const data: Friend[] | null = await getFriends(Number(sesion.user.id));
    const friendsAccepted: { email: string, user_id: number, id: number}[] = [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            const email = data[i].user_id_1 === Number(sesion.user.id) ? data[i].users_user_id_2_fkey.email : data[i].users_user_id_1_fkey.email; 
            if (data[i].status === "accepted") {
                const friendId = data[i].user_id_1 === Number(sesion.user.id) ? data[i].user_id_2 : data[i].user_id_1;

                friendsAccepted.push({ email: email, user_id: friendId, id: data[i].id });
                const routine = await getRoutines(friendId);
                if (routine) {
                    const currentData = FriendData.get(email); 

                    if (currentData) {
                        currentData.routines.push(...routine);  
                    } else {
                        FriendData.set(email, { user_id: friendId, routines: routine });
                    }
                }
            }
            if (data[i].status === "pending") {
                    const user_id = data[i].user_id_1 === Number(sesion.user.id) ? data[i].user_id_2 : data[i].user_id_1;
                    userPendding.push({ email: email, user_id: user_id, id: data[i].id });
            }
        }
    }


    return (
        <>
            <Friends friends={userPendding} session={Number(sesion.user.id)} friendData={FriendData} friendsAccepted={friendsAccepted} />
        </>
    );
}
