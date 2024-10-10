import { useState } from "react";
import PlatinumLayout from "./components/Layouts/PlatinumLayout";
import { Benefits } from "./modules/Benefits";
import Hero from "./modules/Hero";

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);

  const handlePhoneNumber = (e: any) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  console.log(phoneNumber);

  return (
    <PlatinumLayout>
      <Hero phoneNumber={phoneNumber} handlePhoneNumber={handlePhoneNumber} />
      <Benefits />
    </PlatinumLayout>
  );
}

export default App;
