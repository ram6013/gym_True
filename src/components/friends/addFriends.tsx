import { useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineMailOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { Friend } from "@/app/friends/actions";
import { User } from "next-auth";


export default function MessageAddFriends({ setAddFriend, friends, session }: { setAddFriend: (value: boolean) => void, friendRequest: boolean, friends?: Friend[], session: User }) {
    const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

    const containerRef = useRef(null);
    useOutsideClick(containerRef, () => setAddFriend(false));
    return (
        <div  className="fixed inset-0 flex items-center justify-center z-100">
            <div ref={containerRef} className="bg-neutral-800 rounded-lg  w-[90%]  lg:min-w-[50%] lg:max-w-[70%] h-[40%] max-h-[40%] overflow-y-auto">
                <div className="flex justify-around border-b  text-white pt-2 pl-2 pr-2">
                    <button
                        className={`p-4 ${activeTab === "tab1" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab("tab1")}
                    >
                        <FiUserPlus className="lg:text-5xl text-4xl" />
                    </button>
                    <button
                        className={`p-4 ${activeTab === "tab2" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab("tab2")}
                    >
                        {friends ? <MdOutlineMarkEmailUnread className="lg:text-5xl text-4xl"/> : <MdOutlineMailOutline className="lg:text-5xl text-4xl"/>}
                    </button>
                </div>
                <div className="p-4">
                    {activeTab === "tab1" && 
                    <div>
                    <h1 className="text-white font-extrabold text-2xl">Tu ID es: {session.id}</h1>
                    <h1>Ingrese el id de su amigo:</h1>
                    <div className="flex gap-4 justify-center p-4">
                        
                        <input className="text-black p-2 font-extrabold" placeholder=" ID "></input>
                        <button className="text-black"><IoSend className="lg:text-5xl text-4xl text-white"/></button>
                    </div>
                    </div>}
                    {activeTab === "tab2" && (
                    friends && friends.length > 0 ? (
                        friends.filter((friend: Friend) => friend.status === "pending").length > 0 ? (
                            friends
                                .filter((friend: Friend) => friend.status === "pending")
                                .map((friend: Friend, index) => (
                                    <div className="flex gap-4 items-center mb-2" key={index}>
                                        <h1 className="text-white font-extrabold text-2xl truncate w-auto max-w-[80%]">
                                            {friend.users.email}
                                        </h1>
                                        <button className="text-black">
                                            <FaCheck className="lg:text-3xl text-3xl text-green-500" />
                                        </button>
                                        <button className="text-black">
                                            <IoClose className="lg:text-5xl text-5xl text-red-500" />
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <h1>No tienes ninguna solicitud pendiente...</h1>
                        )
                    ) : (
                        <h1>Cargando solicitudes...</h1>
                    )
                )}
                </div>
            </div>
        </div>
    );
}
