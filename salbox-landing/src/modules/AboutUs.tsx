import MissionIcon from "../assets/icons/MissionIcon.png";
import ObjectiveIcon from "../assets/icons/ObjectiveIcon.png";
import VisionIcon from "../assets/icons/VisionIcon.png";
import AboutUsImg from "../assets/images/AboutUs.jpg";
import AboutUsCard from "../components/AboutUsCard";
import Banners from "../components/Banners"; // Import the Banners component

const AboutUs = () => {
  return (
    <div className="relative">
      <main className="relative z-10 bg-scarlet-400 flex flex-col text-center p-6 lg:max-h-[800px] lg:flex-row lg:gap-10 lg:text-start lg:p-14 lg:pr-0">
        <section className="xl:basis-1/2 flex flex-col justify-center">
          <h1 className="font-bold text-white py-6 text-3xl md:text-[40px]">
            ¿Quiénes Somos?
          </h1>
          <p className="text-center mb-5 md:text-justify leading-8 text-white">
            En Salbox, nos dedicamos a preparar comida saludable y accesible
            para todos. Empezamos como un local con Drive-Thru y entregas a
            domicilio, pero nuestro objetivo es convertirnos en una empresa de
            logística alimentaria.
          </p>
          <AboutUsCard
            img={MissionIcon}
            title="Nuestra Misión"
            content="Nuestra misión es ofrecer comida saludable, rápida y económica, ayudando a nuestros clientes a disfrutar de una vida más equilibrada sin complicaciones."
          />
          <AboutUsCard
            img={VisionIcon}
            title="Nuestra Visión"
            content="Aspiramos a expandirnos como una empresa de logística alimentaria que revolucione la entrega de alimentos, optimizando la eficiencia y accesibilidad."
          />
          <AboutUsCard
            img={ObjectiveIcon}
            title="Nuestro Objetivo"
            content="Ofrecer un servicio que garantice entregas en tiempo récord sin descuidar la frescura de nuestros productos. Implementando tecnologías innovadoras en logística."
          />
        </section>
        <img
          src={AboutUsImg}
          className="hidden lg:block rounded-l-2xl object-cover w-[40%] xl:w-1/2"
          alt="salbox about us"
        />
      </main>
      <Banners />
    </div>
  );
};

export default AboutUs;
