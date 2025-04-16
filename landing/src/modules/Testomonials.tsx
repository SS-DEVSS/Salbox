import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { testimonials } from "../constants/testimonialsData";

function Testimonials() {
  return (
    <main
      id="testimonials"
      className="scroll-mt-20 bg-scarlet-400 px-8 py-14 text-center md:text-start lg:p-20 lg:py-28"
    >
      <h4 className="font-bold text-3xl uppercase text-scarlet-100">
        Testimonios
      </h4>
      <h1 className="font-bold text-white py-6 text-[28px] md:text-[40px] lg:text-[50px] leading-[50px]">
        Nuestros clientes hablan por si solos
      </h1>
      <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden mt-5 lg:mt-10">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </main>
  );
}

export default Testimonials;
