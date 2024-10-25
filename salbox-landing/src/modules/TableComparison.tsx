import { DataTable } from "../components/DataTable";
import { DataTableValues } from "../components/DataTableValues";
import MobileTable from "../components/MobileTable";

const TableComparison = () => {
  return (
    <main className="bg-scarlet-400 mt-10 md:mt-20 lg:mt-24 py-20 text-white text-center">
      <h4 className="font-semibold text-xl uppercase text-white_smoke">
        Comparación
      </h4>
      <h2 className="text-[28px] md:text-[40px] font-bold my-5 px-6 text-white">
        Detalle del proceso de entrega
      </h2>
      <p className="md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 md:mb-16 px-6">
        En Salbox, nuestra prioridad es que recibas tu comida fresca y lista
        para disfrutar en el menor tiempo posible. Descubre cómo preparamos tu
        platillo con precisión y cuidado.
      </p>
      <div className="lg:hidden">
        <MobileTable />
      </div>
      <div className="hidden lg:flex max-w-[1400px] px-10 mx-auto">
        <DataTable />
        <DataTableValues />
      </div>
    </main>
  );
};

export default TableComparison;
