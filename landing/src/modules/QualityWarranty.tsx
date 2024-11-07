import WarrantyImg from "../assets/images/WarratnySectionImg.jpg";
import PaniniImg from "../assets/images/SalboxPanini.jpg";
import WarrantyQualityCheckCard from "../components/WarrantyQualityCheckCard";

const QualityWarranty = () => {
  return (
    <main className="bg-moonstone-400 p-6 py-9 lg:px-12 xl:p-20">
      <div className="flex flex-col lg:flex-row lg:gap-6 items-stretch md:max-h-[400px]">
        <section className="w-full lg:w-2/3 xl:w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold text-white text-center lg:text-start">
            Garantía
          </h2>
          <p className="text-sm leading-8 text-white my-4 text-center lg:text-start">
            En Salbox, estamos comprometidos con tu satisfacción. Garantizamos
            que recibirás comida fresca y saludable en cada pedido.
          </p>
          <img
            src={WarrantyImg}
            className="rounded-xl w-full h-full object-cover mb-10 max-h-[350px] md:hidden"
            alt="Warranty section img"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3 w-full">
              <WarrantyQualityCheckCard text="Entregas puntuales garantizadas." />
              <WarrantyQualityCheckCard text="Compromiso de frescura en cada entrega." />
              <WarrantyQualityCheckCard text="Atención al cliente 24/7" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <WarrantyQualityCheckCard text="Devoluciones en caso de errores en el pedido." />
              <WarrantyQualityCheckCard text="Rastreo en tiempo real de tu entrega." />
              <WarrantyQualityCheckCard text="Actualización de estado del pedido vía SMS." />
            </div>
          </div>
        </section>
        <div className="hidden lg:block lg:w-1/3 xl:w-1/2">
          <img
            src={WarrantyImg}
            className="rounded-xl w-full h-full object-cover"
            alt="Warranty section img"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-6 items-stretch md:max-h-[400px] mt-10">
        <div className="hidden lg:block lg:w-1/3 xl:w-1/2">
          <img
            src={PaniniImg}
            className="rounded-xl w-full h-full object-cover"
            alt="Warranty section img"
          />
        </div>
        <section className="w-full lg:w-2/3 xl:w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold text-white text-center lg:text-start">
            Calidad
          </h2>
          <p className="text-sm leading-8 text-white my-4 text-center lg:text-start">
            La calidad es nuestra prioridad; usamos solo los mejores
            ingredientes, frescos y naturales, para asegurar que cada plato sea
            nutritivo y delicioso.
          </p>
          <img
            src={PaniniImg}
            className="rounded-xl w-full h-full object-cover mb-10 max-h-[350px] md:hidden"
            alt="Warranty section img"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3 w-full">
              <WarrantyQualityCheckCard text="Ingredientes frescos de origen local." />
              <WarrantyQualityCheckCard text="Menús diseñados por nutricionistas." />
              <WarrantyQualityCheckCard text="Empaque eco-friendly y seguro para alimentos." />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <WarrantyQualityCheckCard text="Preparación al momento del pedido." />
              <WarrantyQualityCheckCard text="Control de porciones para un equilibrio." />
              <WarrantyQualityCheckCard text="Auditorías internas de calidad." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default QualityWarranty;
