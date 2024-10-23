import PaniniIcon from "../assets/images/PaniniIcon.png";

const Banners = () => {
  return (
    <main className="absolute left-0 w-full h-[500px] transform -translate-y-[50%] overflow-hidden z-30">
      {/* First Banner */}
      <div className="absolute top-[50%] left-[-10vw] bg-moonstone-400 z-30 shadow flex gap-10 justify-center items-center w-[120vw] rotate-[-4deg] py-5">
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke">
          Nuestros Combos
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
      </div>

      {/* Second Banner */}
      <div className="absolute top-[50%] left-[-10vw] bg-moonstone-500 z-20 flex gap-10 justify-center items-center w-[120vw] rotate-[4deg] py-5">
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
