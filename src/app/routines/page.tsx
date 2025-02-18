import RoutineCard from "@/components/routine-card";
import { getRoutines, Routine } from "./actions";
import { auth } from "../../../auth";
import { IUser } from "../(auth)/login/actions";

export default async function Page() {
    const sesion = await auth();
    const user = sesion!.user! as IUser;
    const routines = await getRoutines(user.id);


    return (
        <>
        { routines?.map((routine: Routine, key) => {
            return (
                <RoutineCard key={key} routine={routine} user={user}/>
            )
        }) 
        }
        <div className="flex justify-center items-center ">
            <button>Agregar rutinas</button>
        </div>
        </>
           );
    }
