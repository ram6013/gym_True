"use client"
import { Routine } from "@/app/routines/actions";
import RoutineCard from "./routine-card";
import { IUser } from "@/app/(auth)/login/actions";
import { useEffect, useState } from "react";

export default function Routines({routines, user, view}: { routines: Routine[], user: IUser , view: boolean}) {
    const [create, setCreate] = useState(false);
    useEffect(() => {
        if (routines.length === 0) {
            setCreate(true);
        }
    }, [routines]);
    return (
        <div >
            <button className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2 mt-4" onClick={() => setCreate(!create)}>{create ? "Cerrar" : "Crear rutina"}</button>
            {create ? <div className="mt-4"><RoutineCard setCreate={setCreate} user={user} defaultOpen={true}/> </div>
            :
        routines?.map((routine: Routine, key) => {
            return (
                <div key={key} className="mt-4">
                <RoutineCard key={key} routine={routine} user={user} view={view} defaultOpen={true}/>
                </div>
            )
        }) 
        }
        </div>
           );
    }
