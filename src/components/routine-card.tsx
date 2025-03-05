"use client"
import { Routine } from "@/app/routines/actions";
import CreatePage from "./createPage";
import { useState } from "react";
import { IUser } from "@/app/(auth)/login/actions";
import DeleteButton from "./delete-button";
import DropdownButton from "./dropdown";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { NotCreatedButton } from "./ui/not-created-button";
const RoutineCard = ({ routine, user, setCreate, weekDay, view, defaultOpen, counter }: { routine?: Routine, user: IUser, setCreate?: (create: boolean) => void, weekDay?: string, view?: boolean, defaultOpen?: boolean, counter?: number }) => {
    const [open, setOpen] = useState<boolean>(defaultOpen || false);
        if (counter === 0) {
            return <div className="flex flex-col h-screen items-center gap-4 p-8" >
                <h1 className="text-4xl text-white">No routines assigned</h1>
                <NotCreatedButton/>
            </div >;
        }
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

                <div className={`flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%] ${open ? "" : "hidden"}`}>
                    <CreatePage routine={routine} user={user} setCreate={setCreate} counter={counter} />
                </div> 
            
        </div>

    );
};
export default RoutineCard