import { cn } from "@/lib/utils";
import { WeekDay, WEEKDAYS } from "@/types";
import CreatePage from "../createPage";

function RoutinePage() {
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
                        title={i}
                        key={"routine-card-" + i}
                    ></RoutineCard>
                ))}
            </div>
        </div>
    );
}

const RoutineCard = ({ title }: { title: WeekDay }) => {

    return (
        <div className="w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">{title as string}</h1>
                <input type="checkbox" />
            </div>
            <div className="flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%]">
                <CreatePage />
            </div>
        </div>
    );
};

export default RoutinePage;
