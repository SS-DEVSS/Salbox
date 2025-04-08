import AboutUsImg from "../assets/images/AboutUs.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const Faq = () => {
  return (
    <section id='faq' className="flex flex-col mt-10 md:my-20 lg:flex-row md:gap-6 lg:pr-20">
      <img
        src={AboutUsImg}
        className="hidden lg:block rounded-r-2xl object-cover w-[45%] max-h-[400px]"
        alt="salbox about us"
      />
      <section className="basis-[55%]">
        <h2 className="text-center lg:text-start ml-4 text-[28px] md:text-[40px] font-bold px-6">
          Preguntas Frecuentes FAQ
        </h2>
        <p className="text-center lg:text-start ml-4 mt-5 md:w-full mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 px-6">
          ¿Tienes alguna duda de como funciona nuestro servicio? ¡Encuentrala
          aqui!
        </p>

        <Accordion
          defaultValue="item-1"
          type="single"
          collapsible
          className="w-full px-6 mb-8 text-start"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              ¿Cómo hago un pedido para SalboxGo
            </AccordionTrigger>
            <AccordionContent>
              Con SalboxGo, no tienes que hacer ningun pedido! Simplemente
              accede a la app, ve nuestro mapa, identifica la ubicacion en
              tiempo real de nuestro SalboxGo, y solicita del servicio con un
              solo click! ¡Facil, rapido y sin costos de envio!
            </AccordionContent>
          </AccordionItem>
          <hr className="mx-4" />
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-start">
              ¿Si quiero pedir productos para cierta hora en especifico, puedo
              pedirlo con SalboxGo?
            </AccordionTrigger>
            <AccordionContent>
              No. Las rutas SalboxGo van dependiendo la demanda. Abre la app,
              checa la ruta más cercana y esperanos que pronto estaremos por tus
              rumbos!
            </AccordionContent>
          </AccordionItem>
          <hr className="mx-4" />
          <AccordionItem value="item-3">
            <AccordionTrigger>
              ¿Puedo pedir de sucursal directo sin costo de envío?
            </AccordionTrigger>
            <AccordionContent>
              Si! Si tu sucursal más cercana Salbox está a menos de 2 km, el
              pedido arriba de 200 pesos es gratis! Si estás más lejos de 2km,
              el envío tendra un costo mínimo! Nada que ver con los costos
              excesivos de plataformas
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};

export default Faq;
