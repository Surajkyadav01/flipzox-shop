import { Smartphone, ShirtIcon, Tv, Home, Plane, ShoppingBasket } from "lucide-react";

const categories = [
  { name: "Mobiles", icon: Smartphone },
  { name: "Fashion", icon: ShirtIcon },
  { name: "Electronics", icon: Tv },
  { name: "Home", icon: Home },
  { name: "Travel", icon: Plane },
  { name: "Grocery", icon: ShoppingBasket },
];

const CategoryBar = () => {
  return (
    <div className="bg-card py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 px-2 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-lg active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-flipkart-light flex items-center justify-center">
              <cat.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-medium text-foreground">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
