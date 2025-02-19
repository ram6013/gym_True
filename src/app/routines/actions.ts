"use server"
import supabase from "@/lib/supabase";
import { auth } from "../../../auth";

export type Routine = {
    id : number;
    name: string;
    user_id: number;
    num_ex: number;
    exercises: Exercise[];
}

export type Exercise = {
    name: string;
    num_serie: number;
    series: ExerciseInfo[]
}

export type ExerciseInfo = {
    kg: number;
    rpe: number;
    reps: number;
}    


export async function getRoutines(user_id: number) {
    const { data, error} = await supabase.from("routines").select("*").eq("user_id", user_id).returns<Routine[]>();
    if (error) {
        console.error(error.message);
        return null;
    }
    return data;
}

export async function createRoutine(data: Partial<Routine>) {
    const session = await auth()
    const id = Number(session?.user?.id)
    const routine = {...data, user_id: id}
    delete routine.id;
    
    const {data: dataId, error} = await supabase.from("routines").insert(routine).select("id");
    if (error) {
        console.error(error)
        return false;
    }
    return dataId[0];
}


export async function saveRoutine(data: Routine){
    const session = await auth()
    const id = Number(session?.user?.id)
    const routine = {...data, user_id: id}

    const {error} = await supabase.from("routines").update(routine).eq("id" , data.id)
    if (error) {
        console.error(error)
        return error
    }
}


export async function deleteRoutine(user_id: number, id: number) {
    const {data, error} = await supabase.from("routines").delete().eq("user_id" , user_id).eq("id" , id)
    if (error) {
        console.error(error)
        return false
    }
    console.log(data)
    return true
}

export async function saveDay(user_id: number, day: number, routine_id: number) {
    const info = {day: day, routine_id: routine_id}
    const {error} = await supabase.from("users").update({week: info}).eq("id" , user_id)
    if (error) {
        console.error(error)
        return error
    }
}