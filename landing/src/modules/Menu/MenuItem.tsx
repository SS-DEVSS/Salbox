interface MenuItemProps {
  title: string
  image: string
  description: string
  price: number
}

const MenuItem = ({ title, image, description, price }: MenuItemProps) => {
  return (
    <div
      key={title}
      className="bg-scarlet-400 px-3 mt-10 md:mt-5 md:px-8 pb-5 md:pb-10 rounded-xl flex flex-col gap-3 md:gap-4 text-center relative pt-12 md:pt-0"
    >
      <div className="w-full flex justify-center">
        <img
          className="w-32 md:w-52 mx-auto absolute top-0 transform -translate-y-1/2"
          src={image}
          alt={title}
        />
      </div>

      <h3 className="text-white font-bold text-lg md:text-xl mt-0 sm:mt-20">
        {title}
      </h3>
      <p className="text-sm md:text-base text-white_smoke leading-6 md:leading-8">
        {description}
      </p>
      <div className="bg-white rounded-full py-1 md:py-2 w-24 md:w-32 mx-auto mt-2">
        <p className="font-black text-base md:text-xl text-scarlet-500">
          ${price}
        </p>
      </div>
    </div>
  )
}

export default MenuItem