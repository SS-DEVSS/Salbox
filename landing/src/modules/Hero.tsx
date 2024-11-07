import { CheckCircle2 } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import Confetti from "react-confetti";
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} HeroProps
 * @property {string | null} phoneNumber - The user's phone number.
 * @property {function} handlePhoneNumber - Function to handle changes to the phone number input.
 * @property {boolean} registered - Indicates if the user has registered.
 * @property {function} setRegistered - Function to update the registration state.
 */
type HeroProps = {
  phoneNumber: string | null;
  handlePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  registered: boolean;
  setRegistered: Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Hero component that displays a registration form and handles user registration.
 *
 * @param {HeroProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const Hero = ({
  phoneNumber,
  handlePhoneNumber,
  registered,
  setRegistered,
}: HeroProps) => {
  const [confetti, setConfetti] = useState(false);

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
                Te redireccionaremos al WhatsApp de Salbox ahora...
              </p>
            </div>
          </section>
        ) : (
          <RegisterForm
            phoneNumber={phoneNumber}
            handlePhoneNumber={handlePhoneNumber}
            setRegistered={setRegistered}
            setConfetti={setConfetti}
          />
        )}

        <div className="flex mt-32">
          <Link to={"https://www.instagram.com/salbox.mx/"}
            target='_blank'>
            <img
              className="w-16"
              src="icons/IconInstagram.png"
              alt="Instagram Icon"
            /></Link>
          <Link to={"https://www.facebook.com/salbox.mx"}
            target='_blank'>
            <img
              className="w-16"
              src="icons/IconFacebook.png"
              alt="Facebook Icon"
            /></Link>
        </div>
      </section>
      <div className="hidden lg:block mx-auto basis-1/2">
        <img
          src="illustrations/HeroIllustration.svg"
          alt="Hero Image"
        />
      </div>
    </main>
  );
};

export default Hero;
