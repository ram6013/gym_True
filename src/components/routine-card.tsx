"use client"
import { Routine } from "@/app/routines/actions";
import CreatePage from "./createPage";
import Toggle from "./Toggle";
import { useState } from "react";
import { IUser } from "@/app/(auth)/login/actions";
const RoutineCard = ({ routine, user }: { routine?: Routine, user:  IUser  }) => {
    const [siesta, setSiesta] = useState(false);
    return (
        <div className="w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit">
            <div className="flex items-center justify-between">
                <Toggle setSiesta={setSiesta} siesta={siesta} />
            </div>
            {!siesta ?
            <div className="flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%]">
                <CreatePage routine={routine} user={user} />
                </div> :
                <div className="flex justify-center items-center text-2xl lg:text-5xl">
                    <h1 >🤩 Día de siesta 🤩</h1>
                </div>
            }
        </div>
    );
};
export default RoutineCard