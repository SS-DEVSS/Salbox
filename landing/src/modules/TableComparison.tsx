import MobileTable from "../components/MobileTable";
import { BackgroundBeams } from "../components/ui/background-beams";

const TableComparison = () => {
  return (
    <section className="scroll-mt-20 relative bg-[#E7EAED] py-20 text-center antialiased overflow-hidden">
      <BackgroundBeams />

      {/* Main content */}
      <div className="relative z-10">
        <h4 className="font-semibold text-2xl">
          <span className="font-bold uppercase text-scarlet-400">SalboxGo</span>{" "}
          vs el resto…
        </h4>
        <h2 className="text-[28px] md:text-[40px] font-bold my-5 px-6">
          ¿Qué es SalboxGo?
        </h2>
        <p className="md:w-2/3 lg:w-3/4 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
          Nuestro sistema de rutas de entrega on demand SalboxGo va a donde tu
          estes. Ya sea en tu oficina, departamento, escuela, o donde quiera que
          estes, SalboxGo tendra una ruta para ti en donde te prepararemos al
          momento y en tiempo record tu comida fresca y calientita!. Solo
          descarga la app, vee nuestro mapa, checa la ruta donde vamo y:
          ¡Veenos, paranos y pidenos!
        </p>
        {/* Tables */}
        <div className="px-8 md:px-20 mx-auto">
          <MobileTable />
        </div>
      </div>
    </section>
  );
};

export default TableComparison;
