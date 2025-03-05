import { useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineMailOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaCheck, FaTrash, FaUserFriends } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { acceptFriend, addFriend, rejectFriend } from "@/app/friends/actions";
import toast from "react-hot-toast";
;

export default function MessageAddFriends({ setAddFriend, friends, id, friendsAccepted }: { setAddFriend: (value: boolean) => void, friends?: { email: string, user_id: number, id: number }[], id: number, friendsAccepted: { email: string, user_id: number, id: number }[] }) {
    const [activeTab, setActiveTab] = useState<"sendRequest" | "friendRequests" | "allFriends">("sendRequest");
    const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const friendId = Number((document.getElementById("friendId") as HTMLInputElement)?.value);
        console.log(friendId);
        try {
            const response = await addFriend(id, friendId);
            if (response === true) {
                toast.success("Friend request sent");
                return
            }
            toast.error(response.toString());
        } catch (error) {
            console.error(error);
        }
    }
    const aceeptRequest = async (inedx: number) => {
        try {
            const response = await acceptFriend(id, friends![inedx].user_id);
            if (response === true) {
                toast.success("Friend request accepted");
                window.location.reload();
                setAddFriend(true);
                return
            }
            toast.error("Error on accepting friend request");
        }
        catch (error) {
            console.error(error);
        }
    }

    const cancelRequest = async (index: number) => {
        try {
            const response = await rejectFriend(friends![index].id);
            if (response === true) {
                toast.success("Friend request rejected");
                window.location.reload();
                setAddFriend(true);
                return
            }
            toast.error("Error on rejecting friend request");
        }
        catch (error) {
            console.error(error);
        }
    }

    const deleteFriend = async (index: number) => {
        try {
            const response = await rejectFriend(friendsAccepted![index].id);
            if (response === true) {
                toast.success("Friend deleted");
                window.location.reload();
                setAddFriend(true);
                return
            }
            toast.error("Error on deleting friend");
        }
        catch (error) {
            console.error(error);
        }
    }

    const containerRef = useRef(null);
    useOutsideClick(containerRef, () => setAddFriend(false));
    return (
        <div  className="fixed inset-0 flex items-center justify-center z-100">
            <div ref={containerRef} className="bg-neutral-800 rounded-lg  w-[90%]  lg:min-w-[50%] lg:max-w-[70%] h-[40%] max-h-[40%] overflow-y-auto">
                <div className="flex justify-around border-b  text-white pt-2 pl-2 pr-2">
                    <button
                        className={`p-4 ${activeTab === "sendRequest" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab("sendRequest")}
                    >
                        <FiUserPlus className="lg:text-5xl text-4xl" />
                    </button>
                    <button
                        className={`p-4 ${activeTab === "friendRequests" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab("friendRequests")}
                    >
                        {friends!.length > 0  ? <MdOutlineMarkEmailUnread className="lg:text-5xl text-4xl"/> : <MdOutlineMailOutline className="lg:text-5xl text-4xl"/>}
                    </button>
                    <button
                        className={`p-4 ${activeTab === "allFriends" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab("allFriends")}
                    >
                        <FaUserFriends className="lg:text-5xl text-4xl" />
                    </button>
                </div>
                <div className="p-4">
                    {activeTab === "sendRequest" && 
                    <div>
                            <h1 className="text-white font-extrabold text-2xl">Tu ID es: {id}</h1>
                    <h1 className="text-white">Ingrese el id de su amigo:</h1>
                            <form onSubmit={sendRequest} className="flex gap-4 justify-center p-4">
                        
                                <input id="friendId" type="number" className="text-black p-2 font-extrabold" placeholder=" ID "></input>
                                <button type="submit" className="text-black"><IoSend className="lg:text-5xl text-4xl text-white" /></button>
                            </form>
                    </div>}
                    {activeTab === "friendRequests" && (
                        friends && friends.length > 0 ? (
                            friends
                                .map((friend, index) => (
                                    <div className="flex gap-4 items-center mb-2" key={index}>
                                        <h1 className="text-white font-extrabold text-2xl truncate w-auto max-w-[80%]">
                                            {friend.email}
                                        </h1>
                                        <button className="text-black" onClick={() => aceeptRequest(index)}>
                                            <FaCheck className="lg:text-3xl text-3xl text-green-500" />
                                        </button>
                                        <button className="text-black" onClick={() => cancelRequest(index)}>
                                            <IoClose className="lg:text-5xl text-5xl text-red-500" />
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <h1 className="text-white">No tienes ninguna solicitud pendiente...</h1>
                            )
                    )
                    }
                    {activeTab === "allFriends" && (
                        friendsAccepted && friendsAccepted.length > 0 ? (
                            friendsAccepted
                                .map((friend, index) => (
                                    <div className="flex gap-4 items-center mb-2" key={index}>
                                        <h1 className="text-white font-extrabold text-2xl truncate w-auto max-w-[80%]">
                                            {friend.email}
                                        </h1>
                                        <button onClick={() => deleteFriend(index)} className="text-white"><FaTrash className="text-red-500 text-2xl" /></button>
                                    </div>
                                ))
                        ) : (
                                <h1 className="text-white text-center">No tienes amigos todavía. Pero ya conseguirás. No te preocupes! 😄</h1>
                        ))
                    }
                    <div>

                    </div>

                </div>
            </div>
        </div>
    );
}
