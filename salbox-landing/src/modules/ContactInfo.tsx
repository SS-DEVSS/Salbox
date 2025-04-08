import PhoneIcon from "/icons/PhoneScarletIcon.png";
import EmailIcon from "/icons/EmailScarletIcon.png";

const ContactInfo = () => {
  return (
    <section className="bg-scarlet-400 max-w-7xl m-4 mx-4 xl:mx-auto px-8 py-10 text-center h-full lg:text-start rounded-xl flex flex-col lg:gap-10 items-center justify-center lg:flex-row lg:my-10">
      <div className="mx-auto w-[40%] h-[360px] bg-slate-300 rounded-xl hidden lg:block"></div>
      <section className="flex flex-col items-center lg:items-start">
        <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
          ¡Pide Salbox Ya!
        </h2>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">
              Whatsapp Sucursal Alamos: 4421294854
            </p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">
              Whatsapp Ruta SalboxGo: 4428177411
            </p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={EmailIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">Email ventas: salboxmx@gmail.com</p>
          </div>
        </div>
        <div className="mx-auto w-full h-[300px] bg-slate-300 my-8 rounded-xl lg:hidden"></div>
        <hr className="hidden lg:block border border-[#FFFFFF] w-full my-8" />
        <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
          Horarios
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={PhoneIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">
              Sucursal Alamos L-S: 7:00 am - 9:30 pmD: 8:00 am - 6:00 pm
            </p>
          </div>
          <div className="rounded-xl bg-scarlet-100 px-7 py-2 flex items-center gap-4 w-full sm:w-auto">
            <img src={EmailIcon} className="w-5 h-5" alt="phone icon" />
            <p className="text-scarlet-500">Ruta SalboxGo</p>
            <p className="text-scarlet-500">L-S: 7:15 am - 9:00 pmD: Cerrado</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactInfo;
