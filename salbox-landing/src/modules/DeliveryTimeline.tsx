import { Timeline } from "../components/ui/timeline";
import { timelineData } from "../constants/timelineData";

const DeliveryTimeline = () => {
  return (
    <section className="py-20">
      <h2 className="text-center text-[28px] md:text-[40px] font-bold px-6">
        ¡Pide fácil y rápido!
      </h2>
      <p className="text-center mt-5 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
        ¡Vive la experiencia SalboxGo donde quiera que estes!{" "}
        <span className="text-scarlet-400 font-bold">
          ¡Descarga la app SalboxGo!
        </span>
      </p>
      <Timeline data={timelineData} />
    </section>
  );
};

export default DeliveryTimeline;
