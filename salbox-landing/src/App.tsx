import { useState } from "react";
import PlatinumLayout from "./components/Layouts/PlatinumLayout";
import Promotions from "./components/Promotions";
import AboutUs from "./modules/AboutUs";
import { AppPromotion } from "./modules/AppPromotion";
import { Benefits } from "./modules/Benefits";
import ContactInfo from "./modules/ContactInfo";
import DeliveryTimeline from "./modules/DeliveryTimeline";
import Faq from "./modules/Faq";
import FollowSalbox from "./modules/FollowSalbox";
import Hero from "./modules/Hero";
import Menu from "./modules/Menu";
import QualityWarranty from "./modules/QualityWarranty";
import Register from "./modules/Register";
import TableComparison from "./modules/TableComparison";
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
      <Promotions />
      <TableComparison />
      <DeliveryTimeline />
      <QualityWarranty />
      <AppPromotion />
      <Testimonials />
      <Register
        phoneNumber={phoneNumber}
        handlePhoneNumber={handlePhoneNumber}
        registered={registered}
      />
      <Menu />
      <FollowSalbox />
      <ContactInfo />
      <Faq />
    </PlatinumLayout>
  );
}

export default App;
