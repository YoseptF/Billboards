import { Calendar, Circle, Clock, MapPin, Monitor, Search, Shapes, Star } from "lucide-react";
import React, { FC } from "react";

import bottomHero from "@/assets/bottomHero.png";
import hero from "@/assets/hero.png";
import Image from "next/image";
import logo from "@/assets/logo.png";
import NavButton from "./NavButton";

const Landing: FC = () => (
  <div className="bg-gray-100 flex flex-col justify-center items-center">
    <nav className="flex justify-between items-center p-5 w-screen">
      <Image src={logo} alt="logo" width={200} height={200} />
      <div id="navButtons" className="pr-16 font-medium flex gap-10">
        <NavButton>Inicio</NavButton>
        <NavButton>Nosotros</NavButton>
        <NavButton>Blog</NavButton>
        <NavButton>Contacto</NavButton>
        <NavButton path="/login">Ingresar</NavButton>
      </div>
    </nav>
    <div id="filter" className="bg-white shadow-md p-2 m-16 flex items-center max-w-[1100px]">
      <div id="ubicacion" className="flex flex-col gap-1 text-xs text-gray-700 !border-orange-400 p-2 my-4" style={{ borderRight: "3px solid" }}>
        <label htmlFor="ubicacionInput">Ubicación deseada</label>
        <div className="flex">
          <MapPin size={15} />
          <input id="ubicacionInput" className="placeholder:text-blue-950 placeholder:font-semibold text-blue-950 font-semibold w-96" type="text" placeholder="Heroes de Nacozari 1220, Col. Nacional, Toluca, Edo. de México" />
        </div>
      </div>
      <div id="fecha-de-inicio" className="flex flex-col gap-1 text-xs text-gray-700 !border-orange-400 p-2 my-4" style={{ borderRight: "3px solid" }}>
        <label htmlFor="fechaInicioInput">Fecha de inicio</label>
        <div className="flex">
          <Calendar size={15} />
          <input id="fechaInicioInput" className="placeholder:text-blue-950 placeholder:font-semibold w-40" type="date" />
        </div>
      </div>
      <div id="fecha-de-termino" className="flex flex-col gap-1 text-xs text-gray-700 p-2 my-4">
        <label htmlFor="fechaTerminoInput">Fecha de termino</label>
        <div className="flex">
          <Calendar size={15} />
          <input id="fechaTerminoInput" className="placeholder:text-blue-950 placeholder:font-semibold w-40" type="date" />
        </div>
      </div>
      <NavButton
        className="bg-orange-400 text-white font-semibold p-2 ml-4 flex justify-center items-center flex-col h-20 w-40"
        path="/"
      >
        <Search size={18} />
        Buscar
      </NavButton>
    </div>

    <div id="hero" className="w-screen flex justify-center ">
      <div id="topImage" className="w-8/12 relative h-fit">
        <Image src={hero} alt="logo" />
      </div>
    </div>

    <div id="caracteristicas" className="w-full flex-col flex justify-center items-center gap-3">
      <h1 className="text-orange-400 font-extrabold text-3xl">Características</h1>
      <div id="caracteristicsList" className="bg-orange-400 w-full px-48 py-14 flex flex-col gap-14">
        <div className="self-center relative">
          <Star className="absolute left-2 top-2 stroke-orange-400" />
          <Circle size={40} fill="white" className="self-center" color="white" />
        </div>
        <ul className="flex flex-col gap-3 xl:pl-96">
          <li className="flex items-center gap-2">
            <Monitor size={45} className="stroke-white" />
            <div>
              <h2 className="text-white font-semibold">Sitio dedicado a la renta 100% en linea de espectaculares</h2>
              <p className="text-white text-sm p-0 font-light">Concentramos los mejores espacios de México y Latinoamerica</p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={45} className="stroke-white" />
            <div>
              <h2 className="text-white font-semibold text-lg">Sitio dedicado a la renta 100% en linea de espectaculares</h2>
              <p className="text-white text-sm p-0 font-light">Concentramos los mejores espacios de México y Latinoamerica</p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Clock size={45} className="stroke-white" />
            <div>
              <h2 className="text-white font-semibold text-lg">Sitio dedicado a la renta 100% en linea de espectaculares</h2>
              <p className="text-white text-sm p-0 font-light">Concentramos los mejores espacios de México y Latinoamerica</p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Shapes size={45} className="stroke-white" />
            <div>
              <h2 className="text-white font-semibold text-lg">Sitio dedicado a la renta 100% en linea de espectaculares</h2>
              <p className="text-white text-sm p-0 font-light">Concentramos los mejores espacios de México y Latinoamerica</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="bottomBanner" className="w-screen flex justify-center items-center flex-col relative mt-60">
      <div id="botImage" className="w-8/12 h-fit z-10 absolute">
        <Image src={bottomHero} alt="logo" />
      </div>
      <div id="footer" className="bg-[#00275e] w-screen h-40 absolute bottom-[-12rem]">
        <div id="footerContent" className="bg-[#00275e] w-screen h-40 flex justify-center items-center">
          <p className="text-white">© 2021 Espectaculares de México. Todos los derechos reservados</p>
        </div>
      </div>
    </div>

  </div>
);

export default Landing;