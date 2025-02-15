"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function CreatePage() {
  const [numEx, setNumEx] = useState<number>(3);

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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col w-full p-6  gap-4">
      <div className="flex justify-between gap-10">
        <div className="w-full">
          <label htmlFor="Rutina">Nombre de la rutina:</label>
          <Input className="" type="text" name="Rutina" />
        </div>
        <div className="w-full">
          <label htmlFor="NumEj">Número de ejercicios</label>
          <Input
            className=""
            max={15}
            min={1}
            defaultValue={numEx}
            type="text"
            name="NumEj"
            onChange={handleChange}
          />
        </div>

      </div>
      {Array.from({ length: numEx }, (_, index: number) => (
        <Sets key={index} />
      ))}
      <button type="submit">Crear Rutina</button>
    </form>
  );
}

const Sets = () => {
  const [visibility, setVisibility] = useState(false);
  const [numSerie, setnumSerie] = useState(3)

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
  return (
    <>
      <div className="flex border rounded-xl flex-col gap-4 p-4 w-full">
        <div className="justify-between flex gap-2  items-center  w-full">
          <Input type="text" className=" max-w-40" placeholder="Ejercicio"></Input>
          <div className="flex gap-3">
            <Input type="number" max={6} min={1} defaultValue={numSerie} onChange={handleChange} className="w-12 text-center"></Input>
            <button className="text-2xl"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setVisibility(!visibility);
              }}
            >
              {visibility ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>
        {visibility &&
          Array.from({ length: numSerie }, (_, index: number) => (
            <div
              className="flex flex-row gap-4 justify-center items-center "
              key={index}
            >
              <label htmlFor="REPS">Repeticiones</label>
              <Input type="numeric" name="REPS" />
              <label htmlFor="PESO">Kg</label>
              <Input type="numeric" name="KG" />
              <label htmlFor="RPE">RPE</label>
              <Input type="numeric" name="RPE" />
            </div>
          ))}
      </div>
    </>
  );
};
