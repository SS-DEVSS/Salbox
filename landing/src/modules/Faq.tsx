import AboutUsImg from "../assets/images/AboutUs.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const Faq = () => {
  return (
    <section
      id="faq"
      className="scroll-mt-20 flex flex-col mt-10 md:my-20 lg:flex-row gap-6 lg:px-20"
    >
      <div className="hidden lg:block lg:w-2/5">
        <img
          src={AboutUsImg}
          className="rounded-xl object-cover w-full h-full max-h-[440px]"
          alt="Salbox FAQ"
        />
      </div>
      <section className="lg:w-3/5 px-6">
        <h2 className="text-center lg:text-start text-2xl md:text-4xl font-bold mb-4">
          Preguntas Frecuentes FAQ
        </h2>
        <p className="text-center lg:text-start text-sm md:text-base leading-6 md:leading-7 mb-8">
          ¿Tienes alguna duda de cómo funciona nuestro servicio? ¡Encuéntrala
          aquí!
        </p>

        <Accordion
          defaultValue="item-1"
          type="single"
          collapsible
          className="w-full mb-8"
        >
          <AccordionItem value="item-1" className="mb-4">
            <AccordionTrigger>
              ¿Cómo hago un pedido para SalboxGo?
            </AccordionTrigger>
            <AccordionContent>
              Con SalboxGo, no tienes que hacer ningún pedido! Simplemente
              accede a la app, ve nuestro mapa, identifica la ubicación en
              tiempo real de nuestro SalboxGo, y solicita del servicio con un
              solo click! ¡Fácil, rápido y sin costos de envío!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="mb-4">
            <AccordionTrigger className="text-start">
              ¿Si quiero pedir productos para cierta hora en específico, puedo
              pedirlo con SalboxGo?
            </AccordionTrigger>
            <AccordionContent>
              No. Las rutas SalboxGo van dependiendo la demanda. Abre la app,
              checa la ruta más cercana y espéranos que pronto estaremos por tus
              rumbos!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="mb-4">
            <AccordionTrigger>
              ¿Puedo pedir de sucursal directo sin costo de envío?
            </AccordionTrigger>
            <AccordionContent>
              Si! Si tu sucursal más cercana Salbox está a menos de 2 km, el
              pedido arriba de 200 pesos es gratis! Si estás más lejos de 2km,
              el envío tendrá un costo mínimo! Nada que ver con los costos
              excesivos de plataformas.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};

export default Faq;
