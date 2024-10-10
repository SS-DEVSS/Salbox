import { useState } from "react";
import PlatinumLayout from "./components/Layouts/PlatinumLayout";
import AboutUs from "./modules/AboutUs";
import { Benefits } from "./modules/Benefits";
import DeliveryTimeline from "./modules/DeliveryTimeline";
import Hero from "./modules/Hero";
import QualityWarranty from "./modules/QualityWarranty";
import { Testimonials } from "./modules/Testomonials";

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
      <AboutUs />
      <DeliveryTimeline />
      <QualityWarranty />
      <Testimonials />
    </PlatinumLayout>
  );
}

export default App;
