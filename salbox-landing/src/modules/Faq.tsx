import AboutUsImg from "../assets/images/AboutUs.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const Faq = () => {
  return (
    <div id='faq' className="flex flex-col mt-10 md:my-20 lg:flex-row md:gap-6 lg:pr-20">
      <img
        src={AboutUsImg}
        className="hidden lg:block rounded-r-2xl object-cover w-[45%] max-h-[550px]"
        alt="salbox about us"
      />
      <section className="basis-[55%]">
        <h2 className="text-center lg:text-start ml-4 text-[28px] md:text-[40px] font-bold px-6">
          Preguntas Frecuentes
        </h2>
        <p className="text-center lg:text-start ml-4 mt-5 md:w-full mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 px-6">
          Vea que preguntas frecuentes realizan nuestros clientes, para
          cualquier otra duda puede comunicarse vía redes sociales, correo
          electrónico o teléfono.
        </p>

        <Accordion
          defaultValue="item-1"
          type="single"
          collapsible
          className="w-full px-6 mb-8"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <hr className="mx-4" />
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <hr className="mx-4" />
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <hr className="mx-4" />
          <AccordionItem value="item-4">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default Faq;
