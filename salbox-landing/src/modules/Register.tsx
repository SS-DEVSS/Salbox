import RegisterImg from "../assets/images/RegisterImg.svg";

type RegisterProps = {
  phoneNumber: string | null;
  handlePhoneNumber: any;
};

const Register = ({ phoneNumber, handlePhoneNumber }: RegisterProps) => {
  return (
    <main className="bg-moonstone-400 max-w-7xl m-4 mx-4 xl:mx-auto px-8 pt-8 text-center h-full lg:text-start rounded-xl flex flex-col lg:gap-10 items-center justify-center lg:flex-row-reverse lg:my-10 lg:pr-20">
      <section className="flex flex-col items-center lg:items-start">
        <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
          Regístrate Para pedir Salbox
        </h2>
        <p className="my-4 text-sm md:text-base md:w text-white leading-8 md:leading-8 md:my-8">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit Neque porro quisquam.
        </p>
        {/* Form for mobile */}
        <form className="flex items-center mb-5 sm:hidden">
          <div className="flex items-center bg-white rounded-full rounded-r-none py-3 px-1">
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
            className="bg-scarlet-400 text-lg font-semibold rounded-full rounded-l-none border-none px-6 py-3 h-12"
            type="image"
            src="icons/IconSend.png"
            alt="Send Button"
          />
        </form>
        {/* Form for desktop */}
        <div className="hidden sm:flex items-center bg-white rounded-full py-1 px-1 mb-10">
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
      </section>
      <img
        src={RegisterImg}
        className="w-[300px] lg:w-[400px] mx-auto mt-auto"
        alt="Register Image"
      />
    </main>
  );
};

export default Register;
