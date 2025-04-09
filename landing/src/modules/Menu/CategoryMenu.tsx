import { MenuCategory } from '../../data/foodMenuData';

interface CategoryMenuProps {
  menuData: MenuCategory[],
  selectedCategory: string;
  handleCategoryClick: (title: string, index: number) => void;
}

const CategoryMenu = ({ menuData, selectedCategory: selectedItem, handleCategoryClick }: CategoryMenuProps) => {
  return (
    <div className="bg-scarlet-100 py-4 md:py-5 px-3 md:px-10 flex gap-6 md:gap-12 lg:gap-24 overflow-x-auto no-scrollbar justify-start md:justify-center">
      {menuData.map((menuItem, index) => (
        <div
          key={menuItem.title}
          onClick={() => handleCategoryClick(menuItem.title, index)}
          className="flex gap-2 md:gap-4 items-center shrink-0 hover:cursor-pointer hover:underline hover:text-scarlet-500"
        >
          <img
            src={menuItem.image}
            className={`${selectedItem !== menuItem.title && "opacity-60"} w-6 h-6 md:w-12 md:h-12 object-contain`}
            alt={menuItem.title}
          />
          <p
            className={`${selectedItem === menuItem.title
              ? "text-scarlet-500"
              : "opacity-60"
              } font-bold text-sm md:text-base whitespace-nowrap`}
          >
            {menuItem.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CategoryMenu