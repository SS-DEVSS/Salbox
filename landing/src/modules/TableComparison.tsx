import { DataTable } from "../components/DataTable";
import { DataTableValues } from "../components/DataTableValues";
import MobileTable from "../components/MobileTable";
import { BackgroundBeams } from "../components/ui/background-beams";

const TableComparison = () => {
  return (
    <main className="relative bg-scarlet-400 mt-10 md:mt-20 lg:mt-24 py-20 text-white text-center antialiased overflow-hidden">
      <BackgroundBeams />

      {/* Main content */}
      <div className="relative z-10">
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

        {/* Tables */}
        <div className="lg:hidden">
          <MobileTable />
        </div>
        <div className="hidden lg:flex max-w-[1400px] px-10 mx-auto">
          <DataTable />
          <DataTableValues />
        </div>
      </div>
    </main>
    // <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
    //   <div className="max-w-2xl mx-auto p-4">
    //     <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
    //       Join the waitlist
    //     </h1>
    //     <p></p>
    //     <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
    //       Welcome to MailJet, the best transactional email service on the web.
    //       We provide reliable, scalable, and customizable email solutions for
    //       your business. Whether you&apos;re sending order confirmations,
    //       password reset emails, or promotional campaigns, MailJet has got you
    //       covered.
    //     </p>
    //     <input
    //       type="text"
    //       placeholder="hi@manuarora.in"
    //       className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
    //     />
    //   </div>
    //   <BackgroundBeams />
    // </div>
  );
};

export default TableComparison;
