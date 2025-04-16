import MobileTable from "../components/MobileTable";
import { BackgroundBeams } from "../components/ui/background-beams";

const TableComparison = () => {
  return (
    <section className="relative bg-[#E7EAED] mt-10 md:mt-20 lg:mt-24 py-20 text-center antialiased overflow-hidden">
      <BackgroundBeams />

      {/* Main content */}
      <div className="relative z-10">
        <h4 className="font-semibold text-2xl">
          <span className="font-bold uppercase text-scarlet-400">SalboxGo</span>{" "}
          vs el resto…
        </h4>
        <h2 className="text-[28px] md:text-[40px] font-bold my-5 px-6">
          ¿Que es SalboxGo?
        </h2>
        <p className="md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
          Nuestro sistema de rutas de entrega on demand SalboxGo va a donde tu
          estes. Ya sea en tu oficina, departamento, escuela, o donde quiera que
          estes, SalboxGo tendra una ruta para ti en donde te prepararemos al
          momento y en tiempo record tu comida fresca y calientita!. Solo
          descarga la app, vee nuestro mapa, checa la ruta donde vamo y:
          ¡Veenos, paranos y pidenos!
        </p>
        {/* Tables */}
        <div className="max-w-[1440px] px-10 mx-auto">
          <MobileTable />
        </div>
      </div>
    </section>
  );
};

export default TableComparison;
