import { Card, Carousel } from "../components/ui/apple-cards-carousel";
import FastDelivery from "../assets/icons/FastDelivery.png";
import HealthyIcon from "../assets/icons/HealthyIcon.png";
import SavingsIcon from "../assets/icons/SavingsIcon.png";

export function Benefits() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full p-8 md:p-20 text-center">
      <h2 className="text-[32px] font-bold">Conoce Los Beneficios </h2>
      <p className="mt-5 lg:w-1/2 mx-auto leading-8 mb-10">
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
