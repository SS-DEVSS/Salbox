import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import NavMobile from "./NavMobile";
// import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-moonstone-500 flex items-center justify-between px-20 py-9">
      <img src="SalboxLOGO.svg" alt="Salbox Logo" />
      <nav className="hidden xl:block">
        <ul className="text-moonstone-100 flex gap-10">
          <a href="">
            <li className="flex items-center gap-3 hover:underline transition-all">
              Sobre Salbox
              <img
                className="rotate-90 w-5"
                src="icons/IconArrowLightBlue.png"
                alt="Salbox Logo"
              />
            </li>
          </a>
          <a>
            <li className="hover:underline transition-all">Menu</li>
          </a>
          <a>
            <li className="hover:underline transition-all">
              Preguntas Frecuentes
            </li>
          </a>
          <a>
            <li className="hover:underline transition-all">
              Proceso de Entrega
            </li>
          </a>
          <a>
            <li className="hover:underline transition-all">Testimonios</li>
          </a>
        </ul>
      </nav>
      <div className="hidden gap-4 xl:flex">
        <a
          className="border-2 border-scarlet-400 bg-white text-scarlet-400 font-semibold text-lg rounded-full py-1.5 px-8"
          href=""
        >
          Sigue a Salbox
        </a>
        <a
          className="bg-scarlet-400 text-white font-semibold text-lg rounded-full py-1.5 px-8"
          href=""
        >
          Registrate
        </a>
      </div>
    </div>
  );
}

export default Header;
