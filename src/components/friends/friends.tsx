"use client";
import { useState } from "react";
import { MdOutlineMailOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import MessageAddFriends from "./addFriends";
import Card from "./routine";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Routine } from "@/app/routines/actions";


export default function Friends({ friends, session, friendData, friendsAccepted }: { friends: { email: string, user_id: number, id: number }[], session: number, friendData: Map<string, { user_id: number, routines: Routine[] }>, friendsAccepted: { email: string, user_id: number, id: number }[] }) {
    const [addFriend, setAddFriend] = useState<boolean>(false);
    const [open, setOpen] = useState<Record<string, boolean>>({});
    



    const toggleOpen = (email: string) => {
        setOpen(prev => ({ ...prev, [email]: !prev[email] })); 
    };




    return (
        <div>
            <div className="flex gap-6 m-2">
                <button onClick={() => setAddFriend(!addFriend)}>
                    {friends.length > 0 ? <MdOutlineMarkEmailUnread className="lg:text-5xl text-4xl text-white" /> : <MdOutlineMailOutline className="lg:text-5xl text-4xl text-white" />}
                </button>
            </div>

            {addFriend && (
                <div>
                    <MessageAddFriends setAddFriend={setAddFriend} friends={friends} id={session} friendsAccepted={friendsAccepted} />
                </div>
            )}
            {
                friendData.size === 0 && <div className="flex items-center w-full justify-center">
                    <button onClick={() => setAddFriend(true)} className="text-blue-400 text-center lg:text-4xl text-2xl underline flex items-center gap-2">
                        añade amigos en <MdOutlineMailOutline className="text-blue-400" size={28} />
                    </button>
                </div>

            }

            {friendData && Array.from(friendData).map(([email, { routines }]) => (
                <div key={email} className="w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-1xl lg:text-3xl text-white">{email || ""}</h1>
                        <button onClick={() => toggleOpen(email)}>
                            {open[email] ? <FaAngleUp className="text-white" size={32} /> : <FaAngleDown className="text-white" size={32} />}
                        </button>
                    </div>
                    <div className={`flex flex-col mt-2 p-2 rounded-xl bg-neutral-900 h-[100%] ${open[email] ? "" : "hidden"}`}>
                        {routines.length === 0 && <p className="text-white">No routines found</p>}
                        {routines.map((routine, index) => (
                            <Card key={index} routine={routine} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
