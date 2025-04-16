import { MenuCategory } from '../../data/foodMenuData'
import MenuItem from './MenuItem'

interface CategoryItemsProps {
  index: number
  category: MenuCategory
  selectedItem: string
  sectionsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  handleCategoryClick: (title: string, index: number) => void
}

const CategoryItems = ({ index, category, selectedItem, sectionsRefs, handleCategoryClick }: CategoryItemsProps) => {
  return (
    <div
      ref={(el) => {
        if (sectionsRefs.current && el) {
          sectionsRefs.current[index] = el;
        }
      }}
      key={category.title}
      data-category={category.title}
      className="px-4 md:px-16 xl:px-32 pt-4 md:pt-8"
    >
      <div
        onClick={() => handleCategoryClick(category.title, index)}
        className="flex gap-3 md:gap-4 items-center hover:cursor-pointer hover:underline hover:text-scarlet-500"
      >
        <img
          src={category.image}
          className={`${selectedItem !== category.title && "opacity-60"} w-10 md:w-16 my-3 md:my-6`}
          alt={category.title}
        />
        <p className="font-bold text-lg md:text-xl">{category.title}</p>
      </div>

      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-20">
        {category.items && category.items.map((categoryItem, index) => (
          <MenuItem
            key={index}
            title={categoryItem.title}
            image={categoryItem.image}
            description={categoryItem.description}
            price={categoryItem.price} />
        ))}
      </div>
    </div>
  )
}

export default CategoryItems