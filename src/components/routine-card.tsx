"use client"
import { Routine } from "@/app/routines/actions";
import CreatePage from "./createPage";
import { useState } from "react";
import { IUser } from "@/app/(auth)/login/actions";
import DeleteButton from "./delete-button";
import DropdownButton from "./dropdown";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const RoutineCard = ({ routine, user, setCreate, weekDay, view, defaultOpen }: { routine?: Routine, user: IUser, setCreate?: (create: boolean) => void, weekDay?: string, view?: boolean, defaultOpen?: boolean }) => {
    const [open, setOpen] = useState<boolean>(defaultOpen || false);
    return (
        <div className="w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit">
            {!view &&
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl lg:text-5xl text-white">{weekDay || ""}</h1>
                    <button onClick={() => setOpen(!open)}>{open ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</button>
                </div>
            }
            {view &&
                <div className="flex items-center justify-end">
                <div className="flex sm:gap-8 gap-2 items-center">
                    <DropdownButton user={user} routine={routine}/>
                    <DeleteButton user={user} routine={routine} />
                </div>
                
            </div>
            }
            {open &&
                <div className="flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%]">
                    <CreatePage routine={routine} user={user} setCreate={setCreate} />
                </div> 
            }
        </div>

    );
};
export default RoutineCard