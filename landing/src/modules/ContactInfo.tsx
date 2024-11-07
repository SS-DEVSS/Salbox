import PhoneIcon from "/icons/PhoneScarletIcon.png";
import EmailIcon from "/icons/EmailScarletIcon.png";

const ContactInfo = () => {
  return (
    <main className="bg-scarlet-400 max-w-7xl m-4 mx-4 xl:mx-auto px-8 py-10 text-center h-full lg:text-start rounded-xl flex flex-col lg:gap-10 items-center justify-center lg:flex-row lg:my-10">
      {/* Mapa */}
      <div className="mx-auto w-[40%] h-[360px] bg-slate-300 rounded-xl hidden lg:block"></div>
      {/* Mapa */}
      <section className="flex flex-col items-center lg:items-start">
        <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
          Información De Contacto
        </h2>
        <p className="my-4 text-sm md:text-base md:w text-white leading-8 md:leading-8 md:my-6">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit Neque porro quisquam.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">123-456-7890</p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">contacto@contacto.com.mx</p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={EmailIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">123-456-7890</p>
          </div>
        </div>
        {/* Mapa */}
        <div className="mx-auto w-full h-[300px] bg-slate-300 my-8 rounded-xl lg:hidden"></div>
        {/* Mapa */}
        <hr className="hidden lg:block border border-[#FFFFFF] w-full my-8" />
        <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
          Horarios
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">contacto@contacto.com.mx</p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={EmailIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">123-456-7890</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactInfo;
