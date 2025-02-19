
import { cn } from "@/lib/utils";
import { WeekDay, WEEKDAYS } from "@/types";
import RoutineCard from "../routine-card";
import { auth } from "../../../auth";
import { getRoutines } from "@/app/routines/actions";
import { IUser } from "@/app/(auth)/login/actions";

async function RoutinePage() {
    const sesion = await auth();
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
                {WEEKDAYS.map((i: WeekDay) => (
                    <RoutineCard
                        user={sesion!.user!}
                        key={"routine-card-" + i}
                        weekDay={i}
                    ></RoutineCard>
                ))}
            </div>
        </div>
    );
}


export default RoutinePage;
