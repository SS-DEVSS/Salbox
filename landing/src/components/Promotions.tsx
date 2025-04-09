import Banners from './Banners';
import { WobbleCard } from "./ui/wobble-card";
import Combo1 from "../assets/images/promotions/combo_1.jpg"
import Combo2 from "../assets/images/promotions/combo_2.jpg"
import Combo3 from "../assets/images/promotions/combo_3.jpg"
import Combo4 from "../assets/images/promotions/combo_4.jpg"

const Promotions = () => {
  return (
    <section className="pt-16 md:pt-24 flex flex-col gap-4 bg-white_smoke">
      <div className="mb-20 lg:mb-32">
        <Banners text={"Nuestros Combos"} />
      </div>
      <div className="flex flex-col md:flex-row gap-5 px-4 lg:px-20 xl:px-32">
        <WobbleCard
          backgroundImage={Combo1}
          containerClassName="basis-2/5 bg-scarlet-400 rounded-xl lg:min-h-[350px]">
          .
        </WobbleCard>
        <WobbleCard
          backgroundImage={Combo3}
          containerClassName="hidden md:inline basis-3/5 bg-moonstone-200 rounded-xl lg:min-h-[280px]">
          .
        </WobbleCard>
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-4 lg:px-20 xl:px-32">
        <WobbleCard
          backgroundImage={Combo4}
          containerClassName="hidden md:inline dbasis-3/5 bg-moonstone-500 rounded-xl lg:min-h-[280px]">
          .
        </WobbleCard>
        <WobbleCard
          backgroundImage={Combo2}
          containerClassName="basis-2/5 bg-scarlet-200 rounded-xl lg:min-h-[280px]">
          .
        </WobbleCard>
      </div>
    </section>
  );
};

export default Promotions;
