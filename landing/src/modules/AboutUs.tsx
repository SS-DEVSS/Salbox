import MissionIcon from "../assets/icons/MissionIcon.png";
import ObjectiveIcon from "../assets/icons/ObjectiveIcon.png";
import VisionIcon from "../assets/icons/VisionIcon.png";
import AboutUsImg from "../assets/images/AboutUs.jpg";
import AboutUsCard from "../components/AboutUsCard";

import FastDelivery from "../assets/icons/FastDelivery.png";
import HealthyIcon from "../assets/icons/HealthyIcon.png";
import SavingsIcon from "../assets/icons/SavingsIcon.png";

const data = [
  {
    title: "La Misión de Salbox",
    body: `Salbox nace con el objetivo de ofrecer una opción de comida diaria balanceada, económica y de fácil acceso, resolviendo la falta de calidad, costos excesivos de entrega y estandarización en la comida rápida. Nuestro objetivo es brindar "comfort food" de calidad, de manera sustentable y con entrega sin costo de envio, sin complicaciones y a un precio justo.`,
    src: FastDelivery,
  },
  {
    title: "La Vision que tenemos",
    body: "Nuestra visión es que Salbox ofrezca la mejor comida al mejor precio, ofreciendo productos y servicios que se adapten a las necesidades de cada mercado y satisfagan el paladar de nuestros clientes. Hemos creado Salbox para responder a la creciente falta de tiempo de las personas, ofreciendo una alternativa de comida balanceada, deliciosa y económica, que simplifique la vida de nuestros clientes, eliminando el costo y el tiempo que implica cocinar en casa. Para nosotros, el sabor, la rapidez y el precio justo son fundamentales, y recuerda, SalboxGo, sin costos de envio.",
    src: HealthyIcon,
  },
  {
    title: "Objetivo",
    body: "Ofrecer productos de calidad a un precio justo, con entrega sin costo de envio, adaptados a las necesidades de cada mercado, tanto nacional como internacional, sin sacrificar ni el sabor ni el valor nutricional. ",
    src: SavingsIcon,
  },
];

type CardInterface = {
  src: string;
  title: string;
  body: string;
};

const Card = ({ card }: { card: CardInterface; layout?: boolean }) => {
  return (
    <section className="overflow-hidden flex flex-col items-center md:items-start md:justify-start basis-1/3 relative z-10 cursor-auto">
      <img src={card.src} />
      <div className="absolute h-full top-0 inset-x-0 z-30" />
      <div className="relative z-40 py-4">
        <p
          // layoutId={layout ? `title-${card.title}` : undefined}
          className="text-moonstone-500 text-xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
        >
          {card.title}
        </p>
      </div>
      <p
        // layoutId={layout ? `body-${card.body}` : undefined}
        className="md:text-justify leading-8"
      >
        {card.body}
      </p>
    </section>
  );
};

const AboutUs = () => {
  return (
    <div
      id="about-us"
      className="w-full h-full p-8 md:p-20 text-center bg-dot-black/[0.2] relative"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h2 className="text-center text-[28px] md:text-[40px] font-bold px-6">
        ¿Quiénes Somos?
      </h2>
      <p className="text-center mt-5 md:w-2/3 lg:w-3/4 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
        Salbox es un restaurante y entrega a domicilio dedicado a preparar
        comida balanceada y accesible para todos. Contamos con un Drive-Thru
        Express con punto de venta peatonal, entregas a domicilio
        convencionales, y lo mejor de todo: SalboxGo en ruta.
      </p>
      <section className="flex flex-col md:flex-row gap-10 w-full">
        {data.map((card) => (
          <Card card={card} />
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
