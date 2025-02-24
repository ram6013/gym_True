"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { createRoutine, Exercise, ExerciseInfo, Routine, saveRoutine } from "@/app/routines/actions";
import { IUser } from "@/app/(auth)/login/actions";
import toast from "react-hot-toast";






export default function CreatePage({ routine, user, setCreate }: { routine?: Routine, user: IUser, setCreate?: (create: boolean) => void }) {
  const [numEx, setNumEx] = useState<number>(routine?.num_ex ?? 3);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!Number.isNaN(value)) {
      if (value > 15) {
        setNumEx(15);
        return
      }
      if (value < 1) {
        setNumEx(1);
        return
      }
      setNumEx(value);
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ejercicios: Exercise[] = [];

    for (let i = 0; i < numEx; i++) {
      const nameInput = e.currentTarget[`Ejercicio${i}`] as HTMLInputElement;
      const seriesInput = e.currentTarget[`NumSerie${i}`] as HTMLInputElement;
      const comentariosInput = e.currentTarget[`Comentarios${i}`] as HTMLInputElement;
      const numSeries = Number(seriesInput.value)
      if (nameInput && seriesInput) {
        const series: ExerciseInfo[] = []
        for (let j = 0; j < numSeries; j++) {
          const repsInput = e.currentTarget[`Ejercicio${i}REPS${j}`] as HTMLInputElement
          const kgInput = e.currentTarget[`Ejercicio${i}KG${j}`] as HTMLInputElement
          const rpeInput = e.currentTarget[`Ejercicio${i}RPE${j}`] as HTMLInputElement
          series.push(
            {
              
              reps: Number(repsInput.value),
              kg: Number(kgInput.value),
              rpe: Number(rpeInput.value)
            }
          )
        }

        const exercise: Exercise = {
          name: nameInput.value,
          num_serie: Number(seriesInput.value),
          comentarios: comentariosInput.value,
          series: series
        }
        ejercicios.push(exercise)

      }
    }
    
    const routneInput = e.currentTarget["Rutina"] as HTMLInputElement
    const data: Routine = {
      name: routneInput.value,
      num_ex: numEx,
      exercises: ejercicios,
      id : routine?.id ?? 0,
      user_id: user.id
    }
    const func = routine ? saveRoutine : createRoutine;

    const response = await func(data)
    if (response == false){
      console.error("No se ha podido guardar la rutina")
    }
    setCreate?.(false)
    toast.success("Rutina guardada")
    window.location.reload()
  };


  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-full p-1  gap-4">
      <div className="flex justify-between gap-10">
        <div className="w-full">
          <label className="text-white" htmlFor="Rutina">Nombre de la rutina:</label>
          <Input className="text-white" type="text" name="Rutina" defaultValue={routine?.name} />
        </div>
        <div className="w-full">
          <label className="text-white" htmlFor="NumEj">Nº de ejercicios</label>
          <Input
            className="text-white "
            max={15}
            min={1}
            defaultValue={routine?.num_ex}
            type="text"
            name="NumEj"
            onChange={handleChange}
          />
        </div>

      </div>
      {Array.from({ length: numEx }, (_, index: number) => (
        <Sets key={index} id={index} rotuine={routine}/>
      ))}
      <button className="text-white text-2xl p-2" type="submit">Guardar Rutina</button>
    </form>
  );
}

const Sets = ({ id, rotuine }: { id: number, rotuine?: Routine }) => {
  const [visibility, setVisibility] = useState(false);
  const [numSerie, setnumSerie] = useState(rotuine?.exercises[id]?.num_serie ?? 3);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const value = parseInt(e.target.value);
      if (!Number.isNaN(value)) {
        setVisibility(true)
        if (value > 6) {
          setnumSerie(6);
          return
        }
        if (value < 1) {
          setnumSerie(1);
          return
        }
        setnumSerie(value);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  return (
    <>
      <div className="flex border rounded-xl flex-col gap-4 p-4 w-full">
        <div className="justify-between flex gap-2  items-center  w-full">
          <Input type="text" className="text-white max-w-40" placeholder={`Ejercicio ${id}`} name={`Ejercicio${id}`} defaultValue={rotuine?.exercises[id]?.name}></Input>
          <div className="flex gap-3">
            <Input type="number" max={6} min={1} defaultValue={rotuine?.exercises[id]?.num_serie} name={`NumSerie${id}`} onChange={handleChange} className={"text-white w-12 text-center " + NoInputBar}></Input>
            <button className="text-2xl"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setVisibility(!visibility);
              }}
            >
              {visibility ? <MdVisibilityOff className="text-white"/> : <MdVisibility className="text-white"/>}
            </button>
          </div>
        </div>
        <div className={`${visibility ? "" : "hidden"} flex flex-col gap-4`}>
        { 
          Array.from({ length: numSerie }, (_, index: number) => (
            <div
              className={`flex flex-row gap-2 justify-center items-center ${visibility ? "" : "hidden"}` }
              key={index}
            >
              <label htmlFor="PESO" className="text-white">Kg</label>
              <Input type="numeric" className="text-white" name={`Ejercicio${id}KG${index}`} defaultValue={rotuine?.exercises[id]?.series[index]?.kg} />
              <label htmlFor="REPS" className="text-white">Reps</label>
              <Input type="numeric" className="text-white" name={`Ejercicio${id}REPS${index}`} defaultValue={rotuine?.exercises[id]?.series[index]?.reps} />
              <label htmlFor="RPE"  className="text-white">RPE</label>
              <Input type="numeric" className="text-white" name={`Ejercicio${id}RPE${index}`} defaultValue={rotuine?.exercises[id]?.series[index]?.rpe} />
            </div>
          ))}
          <textarea name={`Comentarios${id}`} className="bg-neutral-800 text-white placeholder:text-white w-full" defaultValue={rotuine?.exercises[id]?.comentarios} placeholder="Comentarios adicionales..."></textarea>
        </div>
      </div>
    </>
  );
};
