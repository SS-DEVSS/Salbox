import { ContainerScroll } from "../components/ui/container-scroll-animation";
import SalboxAppPreview from "../assets/images/SalboxAppPreview.webp";
import GooglePlayIcon from "../assets/images/GooglePlayIcon.png";
import AppleIcon from "../assets/images/AppleIcon.png";

export function AppPromotion() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:gap-16 px-6 xl:px-20 2xl:px-40 overflow-hidden relative bg-white md:max-h-[900px] bg-grid-small-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <ContainerScroll
        titleComponent={
          <div className="md:hidden">
            <h2 className="text-4xl uppercase font-semibold text-scarlet-400">
              ¡Proximamente! <br />
            </h2>
            <h1 className="text-4xl md:text-[6rem] font-bold mt-5 leading-none">
              Salbox Go App
            </h1>
            <p className="mt-6 text-base leading-9">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              sapiente. Sapiente maiores, officia vel ratione accusantium sed
              ullam labore nisi? Tempora illum possimus facere consequatur iusto
              magni dolorem veritatis alias.
            </p>
          </div>
        }
      >
        <img
          src={SalboxAppPreview}
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full"
        />
      </ContainerScroll>

      <div className="md:hidden">
        <h3 className="font-bold text-lg my-6 text-center">
          ¿En dondé la podré encontrar?
        </h3>
        <div className="flex flex-col gap-2 mb-20">
          <div className="flex items-center gap-6 p-4 px-8 rounded-lg border border-[#A4A4A4] bg-black">
            <img src={AppleIcon} className="w-14 h-14" alt="apple img" />
            <div>
              <p className="uppercase text-white text-lg">Disponible en</p>
              <p className="uppercase text-white font-semibold text-xl">
                App Store
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 px-8 rounded-lg border border-[#A4A4A4] bg-black">
            <img
              src={GooglePlayIcon}
              className="w-14 h-14"
              alt="google play img"
            />
            <div>
              <p className="uppercase text-white text-lg">Disponible en</p>
              <p className="uppercase text-white font-semibold text-xl">
                Google Play
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <h2 className="text-4xl uppercase font-semibold text-scarlet-400">
          ¡Proximamente! <br />
        </h2>
        <h1 className="text-7xl xl:text-[6rem] font-bold mt-1 leading-none">
          Salbox Go App
        </h1>
        <p className="mt-6 text-base leading-9">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          sapiente. Sapiente maiores, officia vel ratione accusantium sed ullam
          labore nisi? Tempora illum possimus facere consequatur iusto magni
          dolorem veritatis alias.
        </p>
        <h3 className="font-bold text-lg my-6">
          ¿En dondé la podré encontrar?
        </h3>
        <div className="flex flex-col flex-wrap lg:flex-row gap-2">
          <div className="flex items-center gap-6 p-4 px-8 rounded-lg border border-[#A4A4A4] bg-black">
            <img src={AppleIcon} className="w-14 h-14" alt="apple img" />
            <div>
              <p className="uppercase text-white text-md">Consíguelo en el</p>
              <p className="uppercase text-white font-semibold text-xl xl:text-2xl">
                App Store
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 px-8 rounded-lg border border-[#A4A4A4] bg-black">
            <img
              src={GooglePlayIcon}
              className="w-14 h-14"
              alt="google play img"
            />
            <div>
              <p className="uppercase text-white text-md">Disponible en</p>
              <p className="uppercase text-white font-semibold text-xl xl:text-2xl">
                Google Play
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
