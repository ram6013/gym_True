"use server";
import { MdOutlineMailOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { logOut } from "@/app/(auth)/login/actions";
export default  function HeaderFriends() {
    

    return (
        <form action={logOut} className="flex flex-col gap-4 m-5 border-2 border-white p-2 w-fit ">
            <button><FiUserPlus size={32}/></button>
            <button><MdOutlineMailOutline size={32}/></button>
            <button type="submit"><TbLogout2 size={32}/></button>
        </form>
    );
}