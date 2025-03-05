import { Routine } from "@/app/routines/actions";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";





export default function Card ({ routine }: { routine: Routine}) 
{
    return(
    <div className="flex flex-col w-full p-1  gap-4">
      <div className="flex justify-between gap-10">
        <div className="w-full">
          <label className="text-white" htmlFor="Rutina">Nombre de la rutina:</label>
          <h1 className="text-white">{routine?.name}</h1>
        </div>
        <div className="w-full">
          <label className="text-white" htmlFor="NumEj">Nº de ejercicios</label>
          <h1
            className="text-white ">{routine?.num_ex}</h1>
        </div>

      </div>
      {Array.from({ length: routine.num_ex }, (_, index: number) => (
        <SetsFriends key={index} id={index} rotuine={routine}/>
      ))}
      <hr className="w-full border-neutral-800"   style={{ borderWidth: '16px', borderColor: '#2d2d2d' }} />

    </div>
    )
}

const SetsFriends = ({ id, rotuine }: { id: number, rotuine?: Routine }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <div className="flex border rounded-xl flex-col gap-4 p-4 w-full">
        <div className="justify-between flex gap-2  items-center  w-full">
          <h1 className="text-white max-w-40">{rotuine?.exercises[id]?.name}</h1>
          <div className="flex gap-3">
            <div  className={"text-white w-12 text-center " }>{rotuine?.exercises[id]?.num_serie} </div>
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
          Array.from({ length: Number(rotuine?.exercises[id].num_serie) }, (_, index: number) => (
            <div
              className={`flex flex-row gap-8 justify-center items-center ${visibility ? "" : "hidden"}` }
              key={index}
            >
              <label htmlFor="PESO" className="text-white">Kg</label>
              <h1  className="text-white">{rotuine?.exercises[id]?.series[index]?.kg}</h1>
              <label htmlFor="REPS" className="text-white">Reps</label>
              <h1  className="text-white">{rotuine?.exercises[id]?.series[index]?.reps}</h1>
              <label htmlFor="RPE"  className="text-white">RPE</label>
              <h1  className="text-white">{rotuine?.exercises[id]?.series[index]?.rpe}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
