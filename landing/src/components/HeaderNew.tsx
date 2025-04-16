"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { menuItems } from "../constants/menuItems";

interface Item {
  name: string;
  link: string;
}

const ItemDesktop = ({ item }: { item: Item }) => (
  <li className="text-black hover:cursor-pointer hover:underline">
    <a href={item.link}>
      {item.name !== "Registrate" ? (
        <>{item.name}</>
      ) : (
        <div className="bg-moonstone-400 hover:bg-transparent hover:text-white hover:border-white transition-all text-black py-1 px-6 rounded-full text-base">
          {item.name}
        </div>
      )}
    </a>
  </li>
);

const ItemMobile = ({
  item,
  setOpen,
}: {
  item: Item;
  setOpen: (value: boolean) => void;
}) => (
  <a
    href={item.link}
    onClick={() => setOpen(false)}
    className="hover:cursor-pointer hover:underline"
  >
    <li className="flex justify-between items-center gap-4">
      <h5 className="text-lg font-medium">{item.name}</h5>
      <ChevronRight className="text-[#676767]" />
    </li>
  </a>
);

export const HeaderNew = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div
          className={`w-full transition-colors duration-300 ease-in-out ${
            open
              ? "bg-white"
              : scrolled
              ? "bg-moonstone-400 shadow-md"
              : "bg-transparent"
          }
          `}
        >
          <div className="flex items-center justify-between max-w-[1440px] mx-auto px-6 md:px-10 2xl:px-0 py-2 h-20">
            <img src="SalboxLOGO.svg" alt="Salbox Logo" className="max-w-24" />
            <button
              className="sm:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X size={28} />
              ) : (
                <Menu
                  className={`transition-colors duration-300
                    ${scrolled ? "text-white" : "text-black"}`}
                  size={28}
                />
              )}
            </button>
            <nav className="hidden sm:flex">
              <ul
                className={`flex items-center gap-8 md:gap-12 transition-colors duration-300
                  ${scrolled ? "text-white" : "text-white"}`}
              >
                {menuItems.map((item) => (
                  <ItemDesktop key={item.name} item={item} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-40 sm:hidden transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-24"></div>

        <nav className="flex-grow px-6 pt-6">
          <ul className="flex flex-col gap-10">
            {menuItems.map((item) => (
              <ItemMobile key={item.name} item={item} setOpen={setOpen} />
            ))}
          </ul>
          <a href="#registro" className="block mt-16">
            <button className="w-full bg-scarlet-400 text-white sm:text-lg rounded-md py-4">
              Registrate
            </button>
          </a>
        </nav>

        <div className="px-6 py-4 mt-auto flex justify-between text-[#7F7E80]">
          <a href="mailto:" target="_blank">
            <p>Correo</p>
          </a>
          <a href="https://wa.me/" target="_blank">
            <p>WhatsApp</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default HeaderNew;
