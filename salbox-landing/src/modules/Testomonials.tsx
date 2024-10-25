import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { testimonials } from "../constants/testimonialsData";

export function Testimonials() {
  return (
    <main className="bg-scarlet-400 p-6 py-9 text-center md:text-start lg:p-20">
      <h4 className="font-bold text-xl uppercase text-scarlet-100">
        Testimonios
      </h4>
      <h1 className="font-bold text-white py-6 text-[28px] md:text-[40px] leading-[50px]">
        Vea que dicen nuestros clientes <br></br> sobre nosotros!
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
