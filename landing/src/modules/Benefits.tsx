import { Card, Carousel } from "../components/ui/apple-cards-carousel";
import FastDelivery from "../assets/icons/FastDelivery.png";
import HealthyIcon from "../assets/icons/HealthyIcon.png";
import SavingsIcon from "../assets/icons/SavingsIcon.png";

function Benefits() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full p-8 md:p-20 text-center bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h2 className="text-center text-[28px] md:text-[40px] font-bold px-6">
        Conoce Los Beneficios
      </h2>
      <p className="text-center mt-5 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
        Salbox es un concepto que revoluciona el método tradicional de la comida
        rápida. Esta basado en un modelo de negocios innovador, dentro del cuál
        se combinan los siguientes conceptos:
      </p>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    title: "RÁPIDO",
    body: "Gracias a nuestro sistema de entrega eficiente y local con Drive-Thru, recibirás tu comida en tiempo récord, sin perder tiempo en largas filas.",
    src: FastDelivery,
  },
  {
    title: "SALUDABLE",
    body: "Nuestros platillos están diseñados para ofrecerte opciones equilibradas y nutritivas, utilizando ingredientes frescos y de alta calidad.",
    src: HealthyIcon,
  },
  {
    title: "ECONÓMICO",
    body: "Comer bien no tiene que ser caro; ofrecemos precios accesibles sin comprometer el sabor ni la calidad de nuestros alimentos.",
    src: SavingsIcon,
  },

  {
    title: "REUTILIZABLE",
    body: "Comer bien no tiene que ser caro; ofrecemos precios accesibles sin comprometer el sabor ni la calidad de nuestros alimentos.",
    src: SavingsIcon,
  },
];

export default Benefits;