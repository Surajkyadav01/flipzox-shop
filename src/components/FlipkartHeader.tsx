import { Search, Camera, MapPin, Zap, Landmark, Plane, ShoppingBasket, Heart, Shirt, Monitor, Smartphone, Sofa, Sparkles } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const mainCategories = [
  { name: "FlipzoX", icon: Zap, color: "bg-[hsl(270,80%,55%)]" },
  { name: "Finance", icon: Landmark, color: "bg-[hsl(210,70%,45%)]" },
  { name: "Travel", icon: Plane, color: "bg-[hsl(195,85%,45%)]" },
  { name: "Grocery", icon: ShoppingBasket, color: "bg-[hsl(145,60%,40%)]" },
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
    <header className="sticky top-0 z-50 bg-primary">
      {/* Row 1: Logo + Main Categories */}
      <div className="px-4 pt-3 pb-2">
        {/* Logo */}
        <div className="flex items-baseline gap-0.5 mb-3">
          <h1 className="text-[22px] font-bold tracking-tight leading-none text-primary-foreground">
            Flipzo<span className="text-destructive">X</span>
          </h1>
          <div className="flex items-center gap-0.5 ml-0.5">
            <span className="text-[9px] italic text-secondary font-medium leading-none">Explore Plus</span>
            <span className="text-secondary text-[8px] leading-none">+</span>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center justify-between gap-2">
          {mainCategories.map((cat) => (
            <button
              key={cat.name}
              className="flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-white/10 active:scale-95 transition-transform"
            >
              <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center shadow-sm`}>
                <cat.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-semibold text-primary-foreground/90 whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Location Bar */}
      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white/10">
        <MapPin className="w-3 h-3 text-primary-foreground/60" />
        <span className="text-[11px] text-primary-foreground/75 font-medium tracking-wide">221404, Suriyawan</span>
        <span className="text-primary-foreground/40 text-[10px] ml-auto">▾</span>
      </div>

      {/* Row 3: Search Bar */}
      <div className="px-3 py-2">
        <div className="flex items-center bg-card rounded-md px-3 py-2 gap-2 shadow-sm">
          <Search className="w-[18px] h-[18px] text-muted-foreground/70 shrink-0" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground/60 outline-none w-full"
          />
          <Camera className="w-5 h-5 text-muted-foreground/70 shrink-0" />
        </div>
      </div>

      {/* Row 4: Sub-Categories */}
      <div className="overflow-x-auto scrollbar-hide pb-2.5 pt-0.5">
        <div className="flex gap-5 px-4 min-w-max">
          {subCategories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <cat.icon className="w-4 h-4 text-primary-foreground/85" />
              </div>
              <span className="text-[10px] text-primary-foreground/70 font-medium whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
