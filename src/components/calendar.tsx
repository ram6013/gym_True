"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export function Calendar() {
    const date = new Date();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const daysInSelectedMonth = getDaysInMonth(
        date.getFullYear(),
        selectedMonth
    );

    const selectedMonthName = monthNames[selectedMonth];

    // TODO
    const numberOfEmptyCells = 4;

    const [selectedDate, setSelectedDate] = useState(5);

    const handleNext = () => {
        console.log(selectedMonth);
        setSelectedMonth(selectedMonth + 1);
    };
    const handleLast = () => {
        console.log(selectedMonth);
        setSelectedMonth(selectedMonth - 1);
    };
    return (
        <div className="p-4 pb-20">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <ChevronLeft
                        className="w-6 h-6 text-red-500"
                        onClick={handleLast}
                    />
                    <span className="text-red-500 text-xl">Last</span>
                </div>
                <div className="flex items-center gap-2" onClick={handleNext}>
                    <span className="text-red-500 text-xl">Next</span>
                    <ChevronRight className="w-6 h-6 text-red-500" />
                </div>
            </header>

            <h1 className="text-4xl font-bold mb-8">{selectedMonthName}</h1>

            <div className="grid grid-cols-7 gap-y-4 text-center mb-4">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="text-gray-500">
                        {day}
                    </div>
                ))}

                {Array.from({ length: numberOfEmptyCells }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInSelectedMonth }).map((_, i) => {
                    const day = i + 1;
                    return (
                        <div
                            key={"calendar-button-" + day}
                            className="relative"
                        >
                            <button
                                onClick={() => setSelectedDate(day)}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center mx-auto",
                                    selectedDate === day ? "bg-red-500" : "",
                                    "text-white"
                                )}
                            >
                                {day}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
