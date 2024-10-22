import Footer from "../Footer";
import Header from "../Header";

type PlatinumLayoutProps = {
  children: React.ReactNode;
};

const PlatinumLayout = ({ children }: PlatinumLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PlatinumLayout;
