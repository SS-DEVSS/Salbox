import { Timeline } from "../components/ui/timeline";
import { timelineData } from "../constants/timelineData";

const DeliveryTimeline = () => {
  return (
    <main className="py-20">
      <h2 className="text-center text-[32px] font-bold">
        Conoce Los Beneficios
      </h2>
      <p className="text-center mt-5 lg:w-1/2 mx-auto leading-8 mb-16">
        Salbox es un concepto que revoluciona el método tradicional de la comida
        rápida. Esta basado en un modelo de negocios innovador, dentro del cuál
        se combinan los siguientes conceptos:
      </p>
      <Timeline data={timelineData} />
    </main>
  );
};

export default DeliveryTimeline;
