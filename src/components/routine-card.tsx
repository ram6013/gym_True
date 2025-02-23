"use client"
import { Routine } from "@/app/routines/actions";
import CreatePage from "./createPage";
import Toggle from "./Toggle";
import { useState } from "react";
import { IUser } from "@/app/(auth)/login/actions";
import DeleteButton from "./delete-button";
import DropdownButton from "./dropdown";
const RoutineCard = ({ routine, user, setCreate, weekDay, view }: { routine?: Routine, user: IUser, setCreate?: (create: boolean) => void, weekDay?: string, view?: boolean }) => {
    const [siesta, setSiesta] = useState(false);
    return (
        <div className="w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit">
            <h1 className="text-2xl lg:text-5xl">{weekDay || ""}</h1>
            {view &&
            <div className="flex items-center justify-between">
                <Toggle setSiesta={setSiesta} siesta={siesta} />
                <div className="flex sm:gap-8 gap-2 items-center">
                    <DropdownButton user={user} routine={routine}/>
                    <DeleteButton user={user} routine={routine} />
                </div>
            </div>
            }
            {!siesta ?
            <div className="flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%]">
                    <CreatePage routine={routine} user={user} setCreate={setCreate} />
                </div> :
                <div className="flex justify-center items-center text-2xl lg:text-5xl">
                    <h1 >🤩 Día de siesta 🤩</h1>
                </div>
            }
        </div>
    );
};
export default RoutineCard