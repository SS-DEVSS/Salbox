import { FoodMenuType, foodMenuTypes } from '../../data/foodMenuData';

interface MenuHeaderProps {
  menuType: FoodMenuType;
  setMenuType: (type: "restaurant" | "delivery") => void;
}

const MenuHeader = ({ menuType, setMenuType }: MenuHeaderProps) => {
  return (
    <div className='flex flex-row gap-4 items-center justify-between px-4 md:px-6 bg-scarlet-400 py-4'>
      <h2 className="text-white text-center text-2xl md:text-4xl font-bold">
        Menú
      </h2>

      {/* Menu Type Toggle */}
      <div className="flex justify-center gap-0 md:gap-4">
        <button
          onClick={() => setMenuType("delivery")}
          className={`px-3 py-2 rounded-lg text-white ${menuType === foodMenuTypes.delivery
            ? "bg-scarlet-500"
            : "bg-scarlet-600 font-bold"}`}
        >
          Delivery
        </button>
        <button
          onClick={() => setMenuType("restaurant")}
          className={`px-3 py-2 rounded-lg text-white ${menuType === foodMenuTypes.restaurant
            ? "bg-scarlet-500"
            : "bg-scarlet-600 font-bold"}`}
        >
          Restaurante
        </button>
      </div>
    </div>
  )
}

export default MenuHeader