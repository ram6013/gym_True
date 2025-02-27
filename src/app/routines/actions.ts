"use server"
import supabase from "@/lib/supabase";
import { auth } from "../../../auth";

export type Routine = {
    id : number;
    name: string;
    user_id: number;
    num_ex: number;
    exercises: Exercise[];
    day?: number;
}

export type Exercise = {
    name: string;
    num_serie: number;
    comentarios?: string;
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


export async function deleteRoutine(id: number, user_id: number) {
    console.log(user_id, id)
    const {error} = await supabase.from("routines").delete().eq("user_id" , user_id).eq("id" , id)
    if (error) {
        console.error(error)
        return false
    }
    return true
}

export async function saveDay(user_id: number, day: number, routine_id: number) {
    const {error} = await supabase.from("routines").update({day: null}).eq("user_id", user_id).eq("day", day)
    if (error) {
        console.error(error)
        return error
    }
    const {error: error2} = await supabase.from("routines").update({day}).eq("user_id", user_id).eq("id", routine_id)
    if (error2) {
        console.error(error2)
        return error2
    }
    return {success: true}
 }
 