import { Search, Camera, MapPin, Zap, Landmark, Plane, ShoppingBasket, Heart, Shirt, Monitor, Smartphone, Sofa, Sparkles, ShoppingBag } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const mainCategories = [
  { name: "FlipzoX", icon: Zap, bg: "bg-primary", iconBg: "bg-primary" },
  { name: "Finance", icon: Landmark, bg: "bg-card", iconBg: "bg-primary" },
  { name: "Travel", icon: Plane, bg: "bg-card", iconBg: "bg-[hsl(15,90%,55%)]" },
  { name: "Grocery", icon: ShoppingBasket, bg: "bg-card", iconBg: "bg-secondary" },
];

const subCategories = [
  { name: "For You", icon: ShoppingBag },
  { name: "Fashion", icon: Shirt },
  { name: "Mobiles", icon: Smartphone },
  { name: "Beauty", icon: Sparkles },
  { name: "Electronics", icon: Monitor },
  { name: "Home", icon: Sofa },
  { name: "Wishlist", icon: Heart },
];

const FlipkartHeader = ({ searchQuery, onSearchChange }: Props) => {
  return (
    <header className="sticky top-0 z-50">
      {/* Row 1: Main Category Buttons — white background like screenshot */}
      <div className="bg-[hsl(210,30%,95%)] px-2.5 pt-3 pb-2">
        <div className="flex items-stretch gap-2">
          {mainCategories.map((cat, i) => (
            <button
              key={cat.name}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl shadow-sm active:scale-[0.97] transition-transform ${
                i === 0 ? "bg-primary" : "bg-card"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  i === 0
                    ? "bg-white/20"
                    : cat.iconBg
                } ${i !== 0 ? "text-primary-foreground" : ""}`}
              >
                <cat.icon
                  className={`w-5 h-5 ${
                    i === 0 ? "text-primary-foreground" : "text-primary-foreground"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-bold tracking-wide ${
                  i === 0 ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {i === 0 ? (
                  <>Flipzo<span className="text-destructive">X</span></>
                ) : (
                  cat.name
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Location Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-[hsl(210,20%,93%)]">
        <MapPin className="w-3.5 h-3.5 text-foreground/70" />
        <span className="text-xs text-foreground/80 font-medium">221404, Suriyawan</span>
      </div>

      {/* Row 3: Search Bar */}
      <div className="px-3 py-2 bg-[hsl(210,30%,95%)]">
        <div className="flex items-center bg-card rounded-lg px-3.5 py-2.5 gap-2.5 shadow-sm border border-border/50">
          <Search className="w-5 h-5 text-muted-foreground/60 shrink-0" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground/50 outline-none w-full"
          />
          <Camera className="w-5 h-5 text-muted-foreground/60 shrink-0" />
        </div>
      </div>

      {/* Row 4: Sub-Categories */}
      <div className="overflow-x-auto scrollbar-hide bg-card border-b border-border/40">
        <div className="flex min-w-max px-2">
          {subCategories.map((cat, i) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-1 px-3.5 py-2.5 active:scale-95 transition-transform relative"
            >
              <cat.icon className={`w-6 h-6 ${i === 0 ? "text-primary" : "text-foreground/70"}`} />
              <span className={`text-[11px] font-medium whitespace-nowrap ${i === 0 ? "text-primary" : "text-foreground/60"}`}>
                {cat.name}
              </span>
              {i === 0 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
