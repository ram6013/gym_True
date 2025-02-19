import { IUser } from "@/app/(auth)/login/actions";
import { deleteRoutine, Routine } from "@/app/routines/actions";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export default function DeleteButton ({ user, routine }: { user: IUser, routine?: Routine }) {
    const  handleDelete  = async () => {
        const res = await deleteRoutine(routine!.id, user.id);
        if (!res) {
            toast.error("Routine not deleted");
            return
        }
        toast.success("Routine deleted");
        window.location.reload();

    }
    return (
        <button onClick={handleDelete} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white">
            <MdDelete size={32}/>
        </button>
    );
};