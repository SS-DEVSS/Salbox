import { useState, useRef, useEffect } from "react";
import {
  foodItems,
  FoodMenuType,
  foodMenuTypes,
  deliveryMenu,
  restaurantMenu,
  MenuCategory,
} from "../../data/foodMenuData";
import MenuCatalogue from "./MenuCatalogue";
import CategoryMenu from "./CategoryMenu";
import MenuHeader from "./MenuHeader";

const Menu = () => {
  const [menuType, setMenuType] = useState<FoodMenuType>(
    foodMenuTypes.delivery
  );
  const [menuItems, setMenuItems] = useState<MenuCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(
    deliveryMenu[0].title
  );
  const sectionsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const selectedMenu =
      menuType === foodMenuTypes.delivery ? deliveryMenu : restaurantMenu;
    const items = getCategoryMenuItems(selectedMenu);
    setMenuItems(items);

    if (items && items.length > 0) {
      setSelectedCategory(items[0].title);
      sectionsRefs.current = Array(items.length).fill(null);
    }
  }, [menuType]);

  // Update the selected item based on scroll position
  useEffect(() => {
    if (!menuItems || menuItems.length === 0) return;

    const observerOptions = {
      root: null, // use the browser viewport as root
      rootMargin: "-100px 0px 0px 0px", // offset to trigger earlier
      threshold: 0.4, // 40% visible
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const index = sectionsRefs.current.findIndex(
          (section) => section === visibleSections[0].target
        );

        console.log(index);

        if (index !== -1) {
          setSelectedCategory(menuItems[index].title);
        }
      }
    }, observerOptions);

    // Observe all section refs
    sectionsRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [menuItems]);

  // Scroll to the selected section when a category is clicked
  const handleCategoryClick = (title: string, index: number) => {
    setSelectedCategory(title);

    const section = sectionsRefs.current[index];
    if (!section) return;

    const offset = 120;
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const getCategoryMenuItems = (menuData: MenuCategory[]) => {
    const items = menuData.map((category) => ({
      ...category,
      items: category.itemIds.map((id) => foodItems[id]),
    }));
    return items;
  };

  return (
    <main id="menu" className="scroll-mt-20 min-h-screen flex flex-col">
      {menuItems && menuItems.length > 0 && (
        <>
          {/* Header Section (sticky at the top) */}
          <section className="sticky top-0 z-10">
            <MenuHeader menuType={menuType} setMenuType={setMenuType} />

            {/* Category Menu */}
            <CategoryMenu
              menuData={menuItems}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </section>
          {/* Scrollable Menu Items Section - Full height until scroll */}
          <MenuCatalogue
            menuData={menuItems}
            selectedItem={selectedCategory}
            sectionsRefs={sectionsRefs}
            handleCategoryClick={handleCategoryClick}
          />
        </>
      )}
    </main>
  );
};

export default Menu;
