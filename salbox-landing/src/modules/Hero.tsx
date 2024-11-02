import { CheckCircle2 } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import Confetti from "react-confetti";

type HeroProps = {
  phoneNumber: string | null;
  handlePhoneNumber: any;
  registered: boolean;
  setRegistered: Dispatch<React.SetStateAction<boolean>>;
};

const Hero = ({
  phoneNumber,
  handlePhoneNumber,
  registered,
  setRegistered,
}: HeroProps) => {
  const [confetti, setConfetti] = useState(false);

  const handleForm = (event: any) => {
    event.preventDefault();
    setRegistered(true);
    setConfetti(true);
  };

  useEffect(() => {
    if (confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 8000);
    }
  }, [confetti]);

  return (
    <main className="bg-moonstone-500 flex items-center px-6 lg:px-12 xl:px-20 min-h-[87vh]">
      {confetti && <Confetti />}
      <section className="flex flex-col items-center text-center lg:items-start lg:text-left lg:basis-1/2 m-0">
        <h1 className="text-3xl sm:text-[40px] xl:text-[52px] leading-[70px] font-semibold text-white_smoke">
          ¿Ya te brindamos servicio?
        </h1>
        <h1 className="text-3xl sm:text-[40px] xl:text-[52px] mt-2 md:mt-6 font-black text-white">
          ¡Conoce Salbox!
        </h1>
        <p className="text-base text-white_smoke my-10 leading-8 mx-0 md:mx-20 lg:mx-0">
          La nueva manera de comer rapido, accesible, fresco y delicioso! Solo
          escribe tu whatsapp y salbox llegara a ti! Conoce nuestro menu!
        </p>

        {registered ? (
          <section className="bg-green-500 shadow rounded-2xl flex flex-col md:flex-row items-center py-5 px-7 gap-5 text-center md:text-start">
            <CheckCircle2 className="text-green-100 w-10 h-10" />
            <div className="text-white">
              <h2 className="text-xl md:text-3xl font-semibold">
                ¡Gracias por Registrarte!
              </h2>
              <p className="text-sm md:text-base md:w leading-8 md:leading-8">
                Revisa tu whatsapp para descubir lo que Salbox tiene para
                ofrecerte.
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* Form for mobile */}
            <form className="flex items-center sm:hidden" onSubmit={handleForm}>
              <div className="flex items-center bg-white rounded-full rounded-r-none py-2 px-1">
                <img
                  className="w-6 h-6 ml-5"
                  src="icons/IconWhatsapp.png"
                  alt="Hero Image"
                />
                <input
                  className="ml-8 text-base w-[160px] focus:outline-none bg-transparent"
                  type="text"
                  placeholder="0000000000"
                  maxLength={10}
                  value={phoneNumber ? phoneNumber : ""}
                  onChange={handlePhoneNumber}
                />
              </div>
              <input
                className="bg-scarlet-400 text-lg font-semibold rounded-full rounded-l-none border-none px-5 py-3 h-10"
                type="image"
                src="icons/IconSend.png"
                alt="Send Button"
              />
            </form>

            {/* Form for desktop */}
            <div className="hidden sm:flex items-center bg-white rounded-full py-1 px-1">
              <img
                className="w-6 h-6 ml-5"
                src="icons/IconWhatsapp.png"
                alt="Hero Image"
              />
              <form onSubmit={handleForm}>
                <input
                  className="ml-8 text-xl w-[180px] focus:outline-none bg-transparent"
                  type="text"
                  placeholder="000 000 0000"
                  maxLength={10}
                  value={phoneNumber ? phoneNumber : ""}
                  onChange={handlePhoneNumber}
                />
                <input
                  className="bg-scarlet-400 text-white text-lg font-semibold rounded-full border-none px-16 py-2"
                  type="submit"
                  value="Enviar"
                />
              </form>
            </div>
          </>
        )}

        <div className="flex mt-32">
          <img
            className="w-16"
            src="icons/IconFacebook.png"
            alt="Instagram Icon"
          />
          <img
            className="w-16"
            src="icons/IconInstagram.png"
            alt="Facebook Icon"
          />
        </div>
      </section>
      <div className="hidden lg:block mx-auto basis-1/2">
        <img
          //   className="h-[700px]"
          src="illustrations/HeroIllustration.svg"
          alt="Hero Image"
        />
      </div>
    </main>
  );
};

export default Hero;
