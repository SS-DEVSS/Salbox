import { addDoc, collection } from 'firebase/firestore';
import { Dispatch } from 'react'
import { dbFirestore } from '../config/firebase-config';
import { contactData } from '../data/contactData';
type RegisterFormProps = {
  phoneNumber: string | null;
  handlePhoneNumber: () => void;
  setRegistered: Dispatch<React.SetStateAction<boolean>>;
  setConfetti?: Dispatch<React.SetStateAction<boolean>>;
};


const RegisterForm = ({
  phoneNumber,
  handlePhoneNumber,
  setRegistered,
  setConfetti
}: RegisterFormProps) => {


  /**
   * Handles form submission, sets registration state, displays confetti,
   * creates a customer document in Firestore, and redirects to WhatsApp.
   *
   * @param {Event} event - The form submission event.
   */
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistered(true);
    if (setConfetti) setConfetti(true);
    createCustomer()

    setTimeout(() => {
      redirectToWhatsApp()
    }, 3000)
  };

  /**
  * Creates a customer document in Firestore with the user's phone number.
  *
  * @async
  * @returns {Promise<void>}
  */
  const createCustomer = async () => {
    try {
      await addDoc(collection(dbFirestore, 'customers'), {
        phoneNumber,
        createdAt: new Date(),
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  /**
   * @function redirectToWhatsApp
   * Redirects the user to WhatsApp with a predefined message.
   */
  const redirectToWhatsApp = () => {
    window.open(`https://wa.me/${contactData.phoneNumber}?text=¡Hola!%20Quiero%20obtener%20el%20servicio%20de%20Salbox`);
  };

  return (
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
            required={true}
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
      <div className="hidden sm:flex items-center bg-white rounded-full py-2 px-2">
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
            required={true}
          />
          <input
            className="bg-scarlet-400 hover:bg-scarlet-500 transition-colors text-white text-lg font-semibold rounded-full border-none px-16 py-2 cursor-pointer"
            type="submit"
            value="Enviar"
          />
        </form>
      </div>
    </>
  )
}

export default RegisterForm