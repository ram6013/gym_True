import { cn } from "@/lib/utils";
import { WeekDay, WEEKDAYS } from "@/types";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

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
    // Como quieres hacer la list de ejercicios ???

    return (
        <div className="h-64 w-full flex flex-col p-4 rounded-lg bg-neutral-800 h-fit">
            <h1 className="font-bold text-2xl">{title as string}</h1>
            <div className="flex mt-2 p-2 rounded-xl bg-neutral-900 h-[100%]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ejercicio</TableHead>
                            <TableHead>Reps</TableHead>
                            <TableHead>Kg</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableHead>Pechuga</TableHead>
                            <TableHead>15</TableHead>
                            <TableHead>45</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Pechuga</TableHead>
                            <TableHead>15</TableHead>
                            <TableHead>45</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Pechuga</TableHead>
                            <TableHead>15</TableHead>
                            <TableHead>45</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Pechuga</TableHead>
                            <TableHead>15</TableHead>
                            <TableHead>45</TableHead>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RoutinePage;
