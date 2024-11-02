function Header() {
  return (
    <div className="bg-moonstone-500 flex items-center justify-between px-20 py-9">
      <img src="SalboxLOGO.svg" alt="Salbox Logo" />
      <nav className="hidden xl:block">
        <ul className="text-moonstone-100 flex gap-10">
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
          <a href='/#menu'>
            <li className="hover:underline transition-all">Menu</li>
          </a>
          <a href='/#faq'>
            <li className="hover:underline transition-all">
              Preguntas Frecuentes
            </li>
          </a>
          <a href='/#delivery'>
            <li className="hover:underline transition-all">
              Proceso de Entrega
            </li>
          </a>
          <a href='/#testimonials'>
            <li className="hover:underline transition-all">Testimonios</li>
          </a>
        </ul>
      </nav>
      <div className="hidden gap-4 xl:flex">
        <a
          className="border-2 border-scarlet-400 bg-white text-scarlet-400 font-semibold text-lg rounded-full py-1.5 px-8"
          href="/#follow-salbox"
        >
          Sigue a Salbox
        </a>
        <a
          className="bg-scarlet-400 text-white font-semibold text-lg rounded-full py-1.5 px-8"
          href="/#registro"
        >
          Registrate
        </a>
      </div>
    </div>
  );
}

export default Header;
