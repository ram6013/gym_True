"use client";
import { FaUser, FaHome, FaUserFriends } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { IoMdClose } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import Logout from "./logout-button";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showLogaut, setShowLogout] = useState(false);
  const iconClass =
    "text-white transform transition-transform hover:scale-110 m-3 text-3xl  lg:text-4xl ";
  const path = usePathname();
  const containerRef = useRef(null);
  useOutsideClick(containerRef, () => setShowLogout(false));

  const pages = ["/","/Home", "/run", "/calendar", "/stats", "/routines", "/friends"];
  if (pages.includes(path)) {
    return (
      <div
        ref={containerRef}
        className="flex w-auto lg:h-auto min-h-20 bg-foreground items-center justify-between "
      >
        <div className="relative flex items-center justify-between w-full">
        <button className="lg:ml-10 z-30">
          <FaUser
            className={iconClass}
            onClick={() => setShowLogout(!showLogaut)}
          />
        </button>
          {showLogaut && (
            <div className="absolute top-16 left-0 lg:left-6 bg-background border-2 border-white rounded-lg">
              <Logout setShowLogout={setShowLogout} />
            </div>
          )}
        </div>
        <div className="flex absolute w-full justify-center">
          <h1 className="text-4xl lg:text-5xl text-center font-bold text-white">
            GYM Notes
          </h1>
        </div>
        <div>
          <Botons classNameDiv="hidden  w-full lg:flex justify-end lg:justify-around gap-10 mr-10 " />
        </div>
        <div className="lg:hidden w-full flex justify-end ">
          <button onClick={() => setShowModal(!showModal)}>
            <CiMenuBurger className={iconClass} />
          </button>
        </div>
        {showModal && (
          <div className=" fixed inset-0 bg-background  w-full h-screen z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setShowModal(!showModal)}
            >
              <IoMdClose className={iconClass} size={50} />
            </button>
            <div className="flex flex-col items-center justify-around space-y-6 z-40"></div>
            <Botons
              classNameDiv="flex w-full flex-col items-center justify-around space-y-6 z-40"
              classNameBoton="text-white text-center border-2 border-white flex items-center justify-center rounded-lg p-2 w-1/2"
              setShowModal={setShowModal}
            />
          </div>
        )}
      </div>
    );
  }
}

function Botons({
  classNameDiv = "",
  classNameBoton = "z-30",
  setShowModal = () => {},
}: {
  classNameDiv?: string;
  classNameBoton?: string;
  setShowModal?: (value: boolean) => void;
}) {
  const navigate = useRouter();
  const iconClass =
    "text-white transform transition-transform hover:scale-110 m-3 text-xl  lg:text-4xl ";

  const handleNavigate = (path: string) => {
    navigate.push(path);
    setShowModal(false);
  };
  return (
    <div className={classNameDiv}>
      {/* <button
        className={classNameBoton}
        onClick={() => handleNavigate("/calendar")}
      >
        <FaCalendar className={iconClass} /> <H1 text="Calendar" />
      </button> */}
      <button
        className={classNameBoton}
        onClick={() => handleNavigate("/friends")}
      >
        <FaUserFriends className={iconClass} /> <H1 text="friends" />
      </button>
      <button className={classNameBoton} onClick={() => handleNavigate("/routines")}>
        <CgGym className={iconClass} />
        <H1 text="Routines" />
      </button>
      <button
        className={classNameBoton}
        onClick={() => handleNavigate("/")}
      >
        <FaHome className={iconClass} /> <H1 text="Home" />
      </button>
    </div>
  );
}

function H1({ text }: { text: string }) {
  return <h1 className="lg:hidden text-2xl font-bold">{text}</h1>;
}

