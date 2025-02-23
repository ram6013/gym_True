
import { cn } from "@/lib/utils";
import { WEEKDAYS } from "@/types";
import RoutineCard from "../routine-card";
import { auth } from "../../../auth";
import { getRoutines } from "@/app/routines/actions";
import { Isession, IUser } from "@/app/(auth)/login/actions";

async function RoutinePage() {
    const sesion = await auth() as Isession;
    const user = sesion!.user! as IUser;
    const routines = (await getRoutines(user.id)) || [];
    
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-background w-full flex-1  mx-auto ",
                "min-h-[90%] h-[100%]"
            )}
        >
            <div className="grid grid-cols-1 w-full items-center justify-center p-4 gap-4">
                {WEEKDAYS.map((dayName, index) => (
                    routines
                        .filter((routine) => routine.day === index) 
                        .map((routine) => (
                            <RoutineCard
                                user={sesion!.user!}
                                key={`routine-card-${index}`}
                                weekDay={dayName}
                                routine={routine}
                                view = {false}
                            />
                        ))
                ))}
            </div>
        </div>
    );
}


export default RoutinePage;
