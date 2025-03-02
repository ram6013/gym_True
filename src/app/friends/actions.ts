import supabase from "@/lib/supabase"

export type Friend = {
    user_id_1: number
    user_id_2: number
    status: "pending" | "accepted" | "rejected"
    users: {
        email: string
    }
}
export async function addFriend(user_id_1: number, user_id_2: number) {
    const {error} = await supabase.from("friends").insert({user_id_1, user_id_2, status: "pending"})
    if (error) {
        console.error(error)
        return false
    }
    return true
}

export async function getFriends(user_id: number) {
    const {data, error} = await supabase.from("friends").select("*, users!friends_user_id_2_fkey(email)").eq("user_id_1", user_id).returns<Friend[]>()
    if (error) {
        console.error(error)
        return null
    }
    return data
}

export async function acceptFriend(user_id_1: number, user_id_2: number) {
    const {error} = await supabase.from("friends").update({status: "accepted"}).eq("user_id_1", user_id_1).eq("user_id_2", user_id_2)
    if (error) {
        console.error(error)
        return false
    }
    return true
}

export async function rejectFriend(user_id_1: number, user_id_2: number) {
    const {error} = await supabase.from("friends").delete().eq("user_id_1", user_id_1).eq("user_id_2", user_id_2)
    if (error) {
        console.error(error)
        return false
    }
    return true
}

