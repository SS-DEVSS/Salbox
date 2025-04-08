import MissionIcon from "../assets/icons/MissionIcon.png";
import ObjectiveIcon from "../assets/icons/ObjectiveIcon.png";
import VisionIcon from "../assets/icons/VisionIcon.png";
import AboutUsImg from "../assets/images/AboutUs.jpg";
import AboutUsCard from "../components/AboutUsCard";

const AboutUs = () => {
  return (
    <div id='about-us' className="relative">
      <section className="relative bg-scarlet-400 flex flex-col text-center p-6 lg:flex-row lg:gap-10 lg:text-start lg:p-14 lg:pr-0">
        <section className="xl:basis-1/2 flex flex-col justify-center">
          <h1 className="font-bold text-white py-6 text-3xl md:text-[40px]">
            ¿Quiénes Somos?
          </h1>
          <p className="text-center mb-5 md:text-justify leading-8 text-white">
            Salbox es un restaurante y entrega a domicilio dedicado a preparar
            comida balanceada y accesible para todos. Contamos con un Drive-Thru
            Express con punto de venta peatonal, entregas a domicilio
            convencionales, y lo mejor de todo: SalboxGo en ruta.
          </p>
          <AboutUsCard
            img={MissionIcon}
            title="La Misión de Salbox:"
            content={`Salbox nace con el objetivo de ofrecer una opción de comida diaria balanceada, económica y de fácil acceso, resolviendo la falta de calidad, costos excesivos de entrega y estandarización en la comida rápida. Nuestro objetivo es brindar "comfort food" de calidad, de manera sustentable y con entrega sin costo de envio, sin complicaciones y a un precio justo.`}
          />
          <AboutUsCard
            img={VisionIcon}
            title="La Vision que tenemos:"
            content="Nuestra visión es que Salbox ofrezca la mejor comida al mejor precio, ofreciendo productos y servicios que se adapten a las necesidades de cada mercado y satisfagan el paladar de nuestros clientes. Hemos creado Salbox para responder a la creciente falta de tiempo de las personas, ofreciendo una alternativa de comida balanceada, deliciosa y económica, que simplifique la vida de nuestros clientes, eliminando el costo y el tiempo que implica cocinar en casa. Para nosotros, el sabor, la rapidez y el precio justo son fundamentales, y recuerda, SalboxGo, sin costos de envio."
          />
          <AboutUsCard
            img={ObjectiveIcon}
            title="Objetivo:"
            content="Ofrecer productos de calidad a un precio justo, con entrega sin costo de envio, adaptados a las necesidades de cada mercado, tanto nacional como internacional, sin sacrificar ni el sabor ni el valor nutricional."
          />
        </section>
        <img
          src={AboutUsImg}
          className="hidden lg:block rounded-l-2xl z-40 object-cover w-[40%] max-h-[900px] xl:w-1/2"
          alt="salbox about us"
        />
      </section>
    </div>
  );
};

export default AboutUs;
