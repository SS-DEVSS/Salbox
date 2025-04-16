import Footer from "../Footer";
import HeaderNew from "../HeaderNew";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <HeaderNew />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
