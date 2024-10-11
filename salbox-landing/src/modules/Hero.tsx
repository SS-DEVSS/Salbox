type HeroProps = {
  phoneNumber: string | null;
  handlePhoneNumber: any;
};

const Hero = ({ phoneNumber, handlePhoneNumber }: HeroProps) => {
  return (
    <main className="bg-moonstone-500 flex items-center px-6 lg:px-12 xl:px-20 min-h-[87vh]">
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
        {/* Form for mobile */}
        <form className="flex items-center sm:hidden">
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
          <form>
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
      <div className="hidden lg:block basis-1/2">
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
