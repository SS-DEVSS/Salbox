import { MenuCategory } from '../../data/foodMenuData'
import CategoryItems from './CategoryItems'

interface MenuCatalogueProps {
  menuData: MenuCategory[]
  selectedItem: string
  sectionsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  handleCategoryClick: (title: string, index: number) => void
}

const MenuCatalogue = ({ menuData, selectedItem, sectionsRefs, handleCategoryClick }: MenuCatalogueProps) => {
  return (
    <section className="menu-items-container flex-1 overflow-y-auto bg-white_smoke pb-20">
      {menuData.map((category, index) => (
        <CategoryItems
          index={index}
          key={index}
          category={category}
          selectedItem={selectedItem}
          sectionsRefs={sectionsRefs}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </section>
  )
}

export default MenuCatalogue