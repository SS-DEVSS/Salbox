import PaniniIcon from "../assets/images/PaniniIcon.png";
import PastaIcon from "../assets/images/SpaghettiIcon.png";
import ChilaquilesIcon from "../assets/images/ChilaquilesIcon.png";
import PastaTop from "../assets/images/PastaTest.webp";

/**
 * Menu type constants for the application
 * restaurant: For in-restaurant dining experience
 * delivery: For delivery/takeout options
 */
export const foodMenuTypes = {
  restaurant: "restaurant",
  delivery: "delivery",
} as const;

/**
 * Type for menu types (restaurant or delivery)
 */
export type FoodMenuType = typeof foodMenuTypes[keyof typeof foodMenuTypes];

/**
 * Food item interface defining the structure of a menu item
 */
export interface FoodItem {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  allergens?: string[];  // Optional allergen information
  vegetarian?: boolean;  // Optional vegetarian status
}

/**
 * Menu category interface defining the structure of a menu category
 */
export interface MenuCategory {
  title: string;
  image: string;
  itemIds: string[];
  items?: FoodItem[];
  description?: string;  // Optional category description
}

/**
 * Collection of all food items available in the menu
 * Each item contains complete information including price, description and image
 */
export const foodItems: Record<string, FoodItem> = {
  pastaBolognesa: {
    id: "pastaBolognesa",
    title: "Pasta a la Boloñesa",
    image: PastaTop,
    description:
      "Pastas. salsa boloñesa de la casa hecha a base de salsa pomodoro, vino tinto y especias. incluye pan y parmesano.",
    price: 100,
    vegetarian: false,
  },
  pastaBolognesa2: {
    id: "pastaBolognesa2",
    title: "Pasta a la Boloñesa",
    image: PastaTop,
    description:
      "Pastas. salsa boloñesa de la casa hecha a base de salsa pomodoro, vino tinto y especias. incluye pan y parmesano.",
    price: 100,
    vegetarian: false,
  },
  pastaBolognesa3: {
    id: "pastaBolognesa3",
    title: "Pasta a la Boloñesa",
    image: PastaTop,
    description:
      "Pastas. salsa boloñesa de la casa hecha a base de salsa pomodoro, vino tinto y especias. incluye pan y parmesano.",
    price: 100,
    vegetarian: false,
  },
  pastaBolognesa4: {
    id: "pastaBolognesa4",
    title: "Pasta a la Boloñesa",
    image: PastaTop,
    description:
      "Pastas. salsa boloñesa de la casa hecha a base de salsa pomodoro, vino tinto y especias. incluye pan y parmesano.",
    price: 100,
    vegetarian: false,
  },
};

/**
 * Delivery menu configuration
 * Contains categories with references to food items for the delivery option
 */
export const deliveryMenu: MenuCategory[] = [
  {
    title: "Paninis",
    image: PaniniIcon,
    description: "Delicious Italian sandwiches with various fillings",
    itemIds: ["pastaBolognesa",],
  },
  {
    title: "Pastas",
    image: PastaIcon,
    description: "Fresh pasta dishes with homemade sauces",
    itemIds: ["pastaBolognesa", "pastaBolognesa2"],
  },
  {
    title: "Chilaquiles",
    image: ChilaquilesIcon,
    description: "Traditional Mexican breakfast dish",
    itemIds: ["pastaBolognesa"],
  },
  {
    title: "Lo dulce",
    image: ChilaquilesIcon,
    description: "Sweet treats and desserts",
    itemIds: ["pastaBolognesa"],
  },
];

/**
 * Restaurant menu configuration
 * Contains categories with references to food items for in-restaurant dining
 * May differ from delivery menu in available items or presentation
 */
export const restaurantMenu: MenuCategory[] = [
  {
    title: "Paninis",
    image: PaniniIcon,
    description: "Served hot with a side of fresh greens",
    itemIds: ["pastaBolognesa", "pastaBolognesa2", "pastaBolognesa3"],
  },
  {
    title: "Pastas",
    image: PastaIcon,
    description: "Handmade pasta served with artisanal bread",
    itemIds: ["pastaBolognesa", "pastaBolognesa2", "pastaBolognesa3"],
  },
  {
    title: "Chilaquiles",
    image: ChilaquilesIcon,
    description: "Served with fresh crema and queso fresco",
    itemIds: ["pastaBolognesa"],
  },
  {
    title: "Lo dulce",
    image: ChilaquilesIcon,
    description: "Homemade desserts perfect for sharing",
    itemIds: ["pastaBolognesa"],
  },
];

/**
 * Default menu data for backward compatibility
 * Currently points to the delivery menu by default
 */
export const foodMenuData = deliveryMenu;