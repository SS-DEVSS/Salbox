import PaniniIcon from "../assets/images/PaniniIcon.png";

type Props = {};

const Banners = (props: Props) => {
  return (
    <main className="relative w-full h-[250px] overflow-hidden z-30">
      s
      <div className="absolute shadow-lg top-0 left-[-10vw] bg-moonstone-400 z-20 flex justify-center items-center py-4 w-[120vw] rotate-[-7deg]">
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
      </div>
      <div className="absolute top-5 left-[-10vw] bg-moonstone-500 z-10 flex justify-center items-center py-5 w-[120vw] rotate-[7deg]">
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
      </div>
    </main>
  );
};

export default Banners;
