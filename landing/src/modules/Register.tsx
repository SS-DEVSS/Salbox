import { Dispatch } from 'react';
import RegisterImg from "../assets/images/RegisterImg.svg";
import RegisterForm from '../components/RegisterForm';

type RegisterProps = {
  phoneNumber: string | null;
  handlePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  registered: boolean;
  setRegistered: Dispatch<React.SetStateAction<boolean>>;
};

const Register = ({
  phoneNumber,
  handlePhoneNumber,
  registered,
  setRegistered
}: RegisterProps) => {
  return (
    <main id='registro' className="bg-moonstone-400 max-w-7xl m-4 mx-4 xl:mx-auto px-8 pt-10 lg:pt-4 text-center h-full lg:text-start rounded-xl flex flex-col lg:gap-10 items-center justify-center lg:flex-row-reverse lg:my-10 lg:pr-20">
      {!registered ? (
        <section className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
            Regístrate Para pedir Salbox
          </h2>
          <p className="my-4 text-sm md:text-base md:w text-white leading-8 md:leading-8 md:my-8">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit Neque porro quisquam.
          </p>
          <RegisterForm
            phoneNumber={phoneNumber}
            handlePhoneNumber={handlePhoneNumber}
            setRegistered={setRegistered}
          />
        </section>
      ) : (
        <section className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl lg:text-[40px] font-semibold text-white">
            ¡Gracias por Registrarte con Salbox!
          </h2>
          <p className="my-4 text-sm md:text-base md:w text-white leading-8 md:leading-8 md:my-8">
            Te redireccionaremos al WhatsApp de Salbox ahora...
          </p>
        </section>
      )}
      <img
        src={RegisterImg}
        className="w-[300px] lg:w-[400px] mx-auto mt-auto"
        alt="Register Image"
      />
    </main>
  );
};

export default Register;
