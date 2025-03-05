"use client"

import { CgGym } from "react-icons/cg"

export function NotCreatedButton() {
    return (
                    <button onClick={() => window.location.href = "/routines"} className="flex items-center gap-4 text-blue-500 underline "><h2 className="text-2xl text-blue-400">Assign routines on </h2><CgGym className="text-blue-400 text-4xl" /></button>
    )
}