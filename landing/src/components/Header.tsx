function Header() {
  return (
    <div className="bg-transparent flex items-center gap-10 justify-between py-5 lg:py-9 lg:pr-12 xl:pr-20">
      <img src="SalboxLOGO.svg" className="max-w-24" alt="Salbox Logo" />
      <nav className="hidden xl:block ml-auto">
        <ul className="flex gap-10">
          <a href="/#about-us">
            <li className="flex items-center gap-3 hover:underline transition-all">
              Sobre Salbox
              <img
                className="rotate-90 w-5"
                src="icons/IconArrowLightBlue.png"
                alt="Salbox Logo"
              />
            </li>
          </a>
          <a href="/#menu">
            <li className="hover:underline transition-all">Menu</li>
          </a>
          <a href="/#faq">
            <li className="hover:underline transition-all">
              Preguntas Frecuentes
            </li>
          </a>
          <a href="/#delivery">
            <li className="hover:underline transition-all">
              Proceso de Entrega
            </li>
          </a>
          <a href="/#testimonials">
            <li className="hover:underline transition-all">Testimonios</li>
          </a>
        </ul>
      </nav>
      <div className="hidden gap-4 xl:flex">
        <a
          className="border-2 border-black text-black font-semibold text-lg rounded-full py-1 px-8"
          href="/#follow-salbox"
        >
          Sigue a Salbox
        </a>
        <a
          className="bg-moonstone-400 text-white font-semibold text-lg rounded-full py-1.5 px-8"
          href="/#registro"
        >
          Registrate
        </a>
      </div>
    </div>
  );
}

export default Header;
