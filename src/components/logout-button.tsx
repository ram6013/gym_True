"use client";
import { TbLogout2 } from "react-icons/tb";
import { logOut } from "@/app/(auth)/login/actions";
import { useRouter } from "next/navigation";
export default  function Logout({ setShowLogout }: { setShowLogout: (show: boolean) => void }) {
    const router = useRouter();
    const handleLogOut = async () => {
        console.log("logout");
        try {
            await logOut();
        } catch (error) {
            console.error(error);
        }
        router.replace("login");
        setShowLogout(false);

    };

    return (
        <div className="flex flex-col gap-4 p-2 mr-2">

            <button onClick={handleLogOut}><TbLogout2 size={32}/></button>
        </div>
    );
}