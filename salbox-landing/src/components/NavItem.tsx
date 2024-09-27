type NavItemProps = {
  href: string | undefined;
  text: string;
  icon: string;
  isActive?: boolean;
};

const NavItem = ({ href = "", text, icon, isActive }: NavItemProps) => {
  if (text === "Otros Productos") {
    return (
      <li
        className={`gap-3 text-base font-light text-center flex ${
          isActive ? "border-b-2 border-naranja" : ""
        }`}
      ></li>
    );
  }

  return (
    <li
      className={`gap-3 text-base font-light text-center ${
        isActive ? "border-b-2 border-naranja" : ""
      }`}
    >
      <a href={href} className="flex flex-row items-center gap-3">
        {text}
        <img
          src={isActive ? `/icons/active-${icon}` : `/icons/${icon}`}
          alt="menu icon"
          className="float-end nav2:hidden w-5"
        />
      </a>
    </li>
  );
};

export default NavItem;
