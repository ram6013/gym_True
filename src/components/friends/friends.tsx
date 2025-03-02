"use client";
import { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import MessageAddFriends from "./addFriends";
import { Friend } from "@/app/friends/actions";
import { IUser } from "@/app/(auth)/login/actions";
import { User } from "next-auth";

export default function Friends({ friends, session }: { friends: Friend[], session: User }) {
    const [friendRequest, setFriendRequest] = useState<boolean>(false);
    const [addFriend, setAddFriend] = useState<boolean>(false);

    useEffect(() => {
        setFriendRequest(friends.filter((friend: Friend) => friend.status === "pending").length > 0);
    }, [friends]);
    return (
        <div>
            <div className="flex gap-6 m-2">
                <button onClick={() => setAddFriend(!addFriend)}>{friendRequest ? <MdOutlineMarkEmailUnread className="lg:text-5xl text-4xl " /> : <MdOutlineMailOutline className="lg:text-5xl text-4xl" />}</button>
            </div>
            
                {addFriend && <div> <MessageAddFriends setAddFriend={setAddFriend} friendRequest={friendRequest} friends={friends} session={session}/></div>}
            </div>
  

    );
}