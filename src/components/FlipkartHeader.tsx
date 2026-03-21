import { Search, Camera, MapPin, Zap, Landmark, Plane, ShoppingBasket, Heart, Shirt, Monitor, Smartphone, Sofa, Sparkles } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const mainCategories = [
  { name: "FlipzoX", icon: Zap },
  { name: "Finance", icon: Landmark },
  { name: "Travel", icon: Plane },
  { name: "Grocery", icon: ShoppingBasket },
];

const subCategories = [
  { name: "For You", icon: Sparkles },
  { name: "Mobiles", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Electronics", icon: Monitor },
  { name: "Home", icon: Sofa },
  { name: "Wishlist", icon: Heart },
];

const FlipkartHeader = ({ searchQuery, onSearchChange }: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      {/* Row 1: Main Categories */}
      <div className="flex items-center justify-around px-4 pt-3 pb-2">
        {mainCategories.map((cat) => (
          <button
            key={cat.name}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <cat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-[10px] font-medium text-primary-foreground/90">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Row 2: Location Bar */}
      <div className="flex items-center gap-1.5 px-4 py-1 bg-primary/80">
        <MapPin className="w-3.5 h-3.5 text-primary-foreground/70" />
        <span className="text-[11px] text-primary-foreground/80 font-medium">221404, Suriyawan</span>
      </div>

      {/* Row 3: Search Bar */}
      <div className="px-3 py-2">
        <div className="flex items-center bg-card rounded-sm px-3 py-1.5 gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none w-full"
          />
          <Camera className="w-5 h-5 text-muted-foreground shrink-0" />
        </div>
      </div>

      {/* Row 4: Sub-Categories */}
      <div className="overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-4 px-4 min-w-max">
          {subCategories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform"
            >
              <cat.icon className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-[10px] text-primary-foreground/70 font-medium whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
