import { IUser } from "@/app/(auth)/login/actions";
import { Routine, saveDay } from "@/app/routines/actions";
import { useState } from "react";
import toast from "react-hot-toast";

const DropdownButton = ({routine, user }: {routine?: Routine, user: IUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async (index: number) => {
    const response = await saveDay(user.id, index, routine!.id);
    if ('success' in response) {
      toast.success("Rutina guardada")
      setIsOpen(false);
      return;
    }
    toast.error("Error al guardar la rutina")
    return;
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const week = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center p-2 text-white bg-green-800 hover:bg-green-600  rounded "
      >
        <span className="sm:hidden ">Day</span>
        <span className="hidden sm:inline" >Día de la semana</span>

        <svg
          className={`ml-2 w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-green-900 border-2 border-green-950 rounded-xl shadow-lg z-10">
  {Array.from({ length: 7 }, (_, index) => (
    <div key={index}>
      <button className="w-full" onClick={() => handleClick(index)}>
    <a
      href="#"
      className="block px-4 py-2 text-sm text-white hover:bg-green-300"
    >
      {week[index]}
    </a>
    </button>
    <hr className="border border-green-950" />
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default DropdownButton;
