
import { cn } from "@/lib/utils";
import { WeekDay, WEEKDAYS } from "@/types";
import RoutineCard from "../routine-card";
import { auth } from "../../../auth";

async function RoutinePage() {

    const session = await auth()
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
                        user={session!.user!}

                        key={"routine-card-" + i}
                    ></RoutineCard>
                ))}
            </div>
        </div>
    );
}


export default RoutinePage;
