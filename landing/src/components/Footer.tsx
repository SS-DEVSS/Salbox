import { menuItemsFooter } from "../data/menuData";

function Footer() {
  return (
    <main className="bg-moonstone-500 py-7">
      <section className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-12 xl:px-16">
        <div className="basis-1/6">
          <img
            src="/SalboxLOGO.svg"
            alt="Logo Salbox"
            width={160}
            height={160}
          />
        </div>

        <section className="flex flex-col mt-8 lg:mt-0 sm:flex-row justify-center gap-10 lg:gap-20 basis-4/6 text-center text-moonstone-100">
          <article>
            <h5 className="text-xl font-semibold text-moonstone-100 mb-5">
              Soporte
            </h5>
            <h6 className="text-moonstone-100">contacto@contacto.mx</h6>
            <h6 className="mt-2 text-moonstone-100">
              <span className="text-scarlet-500">(000)</span> 000 00 00
            </h6>
          </article>
          <article>
            <h5 className="text-xl font-semibold text-moonstone-100 mb-5">
              Horarios
            </h5>
            <div className="flex items-center justify-between gap-8 text-moonstone-100">
              <h6 className="text-justify font-semibold">Lunes - Viernes</h6>
              <h6 className="ml-auto">9 am - 7 pm</h6>
            </div>
            <div className="flex items-center justify-between gap-8 text-moonstone-100 mt-2">
              <h6 className="text-justify font-semibold">Sábados y Domingos</h6>
              <h6 className="ml-auto">10 am - 5 pm</h6>
            </div>
          </article>
        </section>
        <section className="basis-1/6 flex justify-end mt-10 mx-auto lg:mt-0 ml-auto xl:pr-12">
          <ul className="text-white flex flex-col sm:flex-row lg:flex-col gap-4">
            {menuItemsFooter.map(
              (
                item: { href: string; text: string; icon: string },
                index: number
              ) => (
                <li
                  className="text-sm text-moonstone-100 text-center"
                  key={index}
                >
                  <a
                    className="hover:underline transition-all flex items-center gap-2"
                    href={item.href}
                  >
                    <p>{item.text}</p>
                    <img
                      src={`/icons/${item.icon}.png`}
                      alt="menu icon"
                      width={18}
                      height={18}
                    />
                  </a>
                </li>
              )
            )}
          </ul>
        </section>
      </section>
      <h6 className="text-moonstone-100 text-center text-sm mt-8 xl:mt-16">
        @ 2024 Salbox All rights reserved
      </h6>
    </main>
  );
}

export default Footer;
