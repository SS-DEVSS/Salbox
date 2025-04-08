import PaniniIcon from "../assets/images/PaniniIcon.png";

type BannersProps = {
  text: string;
};

const Banners = ({ text }: BannersProps) => {
  return (
    <main className="absolute left-0 w-full h-[500px] transform -translate-y-[50%] overflow-hidden z-30">
      {/* First Banner */}
      <div className="absolute top-[50%] left-[-10vw] bg-moonstone-400 z-30 shadow flex gap-8 lg:gap-20 justify-center items-center w-[120vw] rotate-[-3.5deg] py-5">
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
      </div>

      {/* Second Banner */}
      <div className="absolute top-[50%] left-[-10vw] bg-moonstone-500 z-20 flex gap-8 lg:gap-20 justify-center items-center w-[120vw] rotate-[3.5deg] py-5">
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
        <p className="font-bold text-[24px] lg:text-[44px] text-white_smoke whitespace-nowrap">
          {text}
        </p>
        <img className="w-12 lg:w-20 mx-8 lg:mx-12" src={PaniniIcon} />
      </div>
    </main>
  );
};

export default Banners;
