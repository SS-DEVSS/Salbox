import { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { app } from './config/firebase-config'
import { getAuth, signInAnonymously } from '@firebase/auth';
import { contactData } from './data/contactData';
import Layout from "./components/Layouts/Layout";
import Promotions from "./components/Promotions";
import AboutUs from "./modules/AboutUs";
import AppPromotion from "./modules/AppPromotion";
import Benefits from "./modules/Benefits";
import ContactInfo from "./modules/ContactInfo";
import DeliveryTimeline from "./modules/DeliveryTimeline";
import Faq from "./modules/Faq";
import FollowSalbox from "./modules/FollowSalbox";
import Galeria from "./modules/Galeria";
import Hero from "./modules/Hero";
import Menu from "./modules/Menu";
import QualityWarranty from "./modules/QualityWarranty";
import Register from "./modules/Register";
import TableComparison from "./modules/TableComparison";
import Testimonials from "./modules/Testomonials";
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(parseInt(value))) return;
    setPhoneNumber(value);
  };


  useEffect(() => {
    const auth = getAuth(app)

    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous authentication failed:", error);
    })
  }, [])


  return (
    <BrowserRouter>
      <Layout>
        <Hero
          phoneNumber={phoneNumber}
          handlePhoneNumber={handlePhoneNumber}
          registered={registered}
          setRegistered={setRegistered}
        />
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
          setRegistered={setRegistered}
        />
        <Menu />
        <FollowSalbox />
        <ContactInfo />
        <Galeria />
        <Faq />
        <WhatsAppButton phoneNumber={contactData.whatsAppNumber} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
