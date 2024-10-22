import { Timeline } from "../components/ui/timeline";
import { timelineData } from "../constants/timelineData";

const DeliveryTimeline = () => {
  return (
    <main className="py-20">
      <h2 className="text-center text-[28px] md:text-[40px] font-bold px-6">
        Detalle del proceso de entrega
      </h2>
      <p className="text-center mt-5 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
        En Salbox, nuestra prioridad es que recibas tu comida fresca y lista
        para disfrutar en el menor tiempo posible. Descubre cómo preparamos tu
        platillo con precisión y cuidado.
      </p>
      <Timeline data={timelineData} />
    </main>
  );
};

export default DeliveryTimeline;
