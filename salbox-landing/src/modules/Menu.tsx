import { useState, useRef, useEffect } from "react";
import { foodMenuData } from "../data/foodMenuData";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(foodMenuData[0].title);
  const sectionsRefs = useRef([]);

  // Scroll to the selected section when a category is clicked
  const handleCategoryClick = (title: string, index: number) => {
    setSelectedItem(title);
    sectionsRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Update the selected item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      sectionsRefs.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Detect when the section is halfway visible on the screen
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setSelectedItem(foodMenuData[index].title);
        }
      });
    };

    const scrollContainer = document.querySelector(".menu-items-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id='menu' className="h-[100vh] flex flex-col">
      {/* Header Section (sticky at the top) */}
      <section className="bg-scarlet-400 pt-16 sticky top-0 z-10">
        <h2 className="text-white text-center text-[28px] md:text-[40px] font-bold px-6">
          Menu
        </h2>
        <p className="text-white text-center mt-5 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 px-6">
          Discover our delicious offerings.
        </p>

        {/* Category Menu */}
        <div className="bg-scarlet-100 py-5 px-10 flex gap-16 md:gap-32 overflow-x-auto no-scrollbar justify-center">
          {foodMenuData.map((menuItem, index) => (
            <div
              key={menuItem.title}
              onClick={() => handleCategoryClick(menuItem.title, index)}
              className="flex gap-2 md:gap-4 items-center hover:cursor-pointer hover:underline hover:text-scarlet-500"
            >
              <img
                src={menuItem.image}
                className={`${selectedItem !== menuItem.title && "opacity-60"
                  } w-8 md:w-16`}
                alt={menuItem.title}
              />
              <p
                className={`${selectedItem === menuItem.title
                  ? "text-scarlet-500 underline"
                  : "opacity-60"
                  } font-bold text-sm md:text-xl`}
              >
                {menuItem.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scrollable Menu Items Section */}
      <section className="menu-items-container sticky bottom-0 overflow-y-auto flex-1 bg-white_smoke pb-10">
        {foodMenuData.map((category, index) => (
          <div
            ref={(el) => (sectionsRefs.current[index] = el)}
            key={category.title}
            className="px-4 md:px-16 xl:px-32"
          >
            <div
              onClick={() => handleCategoryClick(category.title, index)}
              className="flex gap-4 items-center hover:cursor-pointer hover:underline hover:text-scarlet-500"
            >
              <img
                src={category.image}
                className={`${selectedItem !== category.title && "opacity-60"
                  } w-16 my-6`}
                alt={category.title}
              />
              <p className="font-bold text-xl">{category.title}</p>
            </div>
            <div className="grid gap-2 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-20">
              {category.items.map((categoryItem) => (
                <div
                  key={categoryItem.title}
                  className="bg-scarlet-500 px-3 md:px-8 pb-5 md:pb-10 rounded-xl flex flex-col gap-4 text-center"
                >
                  <img
                    className={"w-52 mx-auto mt-[-100px]"}
                    src={categoryItem.image}
                    alt={categoryItem.title}
                  />
                  <h3 className="text-white font-bold text-xl">
                    {categoryItem.title}
                  </h3>
                  <p className="text-base text-white_smoke leading-9">
                    {categoryItem.description}
                  </p>
                  <div className="bg-white rounded-full py-2 w-[100px] md:w-[150px] mx-auto">
                    <p className="font-black text-base md:text-xl text-scarlet-500">
                      ${categoryItem.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Menu;
