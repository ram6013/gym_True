
import { cn } from "@/lib/utils";
import { WEEKDAYS } from "@/types";
import RoutineCard from "../routine-card";
import { auth } from "../../../auth";
import { getRoutines } from "@/app/routines/actions";
import { Isession, IUser } from "@/app/(auth)/login/actions";
import { NotCreatedButton } from "../ui/not-created-button";

async function RoutinePage() {
    const sesion = await auth() as Isession;
    const user = sesion!.user! as IUser;
    const routines = (await getRoutines(user.id)) || [];
    let counter = 0;
    if (routines.length === 0) {
        return <div className="flex flex-col h-screen items-center gap-4 p-8">
            <h1 className="text-4xl text-white">No routines found</h1>
            <NotCreatedButton/>
        </div>;
    }

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
                            counter++,
                            <RoutineCard
                                defaultOpen={false}
                                user={sesion!.user!}
                                key={`routine-card-${index}`}
                                weekDay={dayName}
                                routine={routine}
                                view = {false}
                                counter={counter}
                            />
                        ))
                ))}
            </div>
        </div>
    );
}


export default RoutinePage;
