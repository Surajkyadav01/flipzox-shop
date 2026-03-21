import { Search, Camera, MapPin, Zap, IndianRupee, Plane, ShoppingCart, Heart, Shirt, Monitor, Smartphone, Sofa, Sparkles, ShoppingBag, Droplets, Headphones } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const subCategories = [
  { name: "For You", icon: ShoppingBag, active: true },
  { name: "Fashion", icon: Shirt },
  { name: "Mobiles", icon: Smartphone },
  { name: "Beauty", icon: Droplets },
  { name: "Electronics", icon: Headphones },
  { name: "Home", icon: Sofa },
  { name: "Wishlist", icon: Heart },
];

const FlipkartHeader = ({ searchQuery, onSearchChange }: Props) => {
  return (
    <header className="sticky top-0 z-50">
      {/* Row 1: Category Cards — pale blue-grey bg like original */}
      <div
        className="px-2 pt-2.5 pb-2"
        style={{ background: "linear-gradient(180deg, hsl(210 25% 94%) 0%, hsl(210 20% 92%) 100%)" }}
      >
        <div className="flex items-stretch gap-1.5">
          {/* FlipzoX — blue card */}
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl bg-primary shadow-[0_2px_8px_rgba(40,116,240,0.25)] active:scale-[0.97] transition-transform">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="w-[22px] h-[22px] text-primary-foreground" strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-extrabold text-primary-foreground tracking-wide leading-none">
              Flipzo<span className="text-[hsl(0,85%,50%)]">X</span>
            </span>
          </button>

          {/* Finance — white card */}
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-[0.97] transition-transform">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <IndianRupee className="w-[22px] h-[22px] text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Finance</span>
          </button>

          {/* Travel — white card */}
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-[0.97] transition-transform">
            <div className="w-10 h-10 rounded-full bg-[hsl(15,85%,55%)] flex items-center justify-center">
              <Plane className="w-[22px] h-[22px] text-primary-foreground -rotate-12" strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Travel</span>
          </button>

          {/* Grocery — white card */}
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-[0.97] transition-transform">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingCart className="w-[20px] h-[20px] text-foreground" strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Grocery</span>
          </button>
        </div>
      </div>

      {/* Row 2: Location Bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-[7px]"
        style={{ background: "hsl(210 15% 91%)" }}
      >
        <MapPin className="w-3.5 h-3.5 text-foreground/65" strokeWidth={2.5} />
        <span className="text-[12px] text-foreground/75 font-semibold">221404, Suriyawan</span>
      </div>

      {/* Row 3: Search Bar */}
      <div className="px-3 py-2" style={{ background: "hsl(210 25% 94%)" }}>
        <div className="flex items-center bg-card rounded-xl px-3.5 py-[10px] gap-3 shadow-[0_1px_6px_rgba(0,0,0,0.07)] border border-border/30">
          <Search className="w-[22px] h-[22px] text-muted-foreground/50 shrink-0" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-[15px] text-card-foreground placeholder:text-muted-foreground/45 outline-none w-full font-normal"
          />
          <Camera className="w-[22px] h-[22px] text-muted-foreground/50 shrink-0" strokeWidth={2} />
        </div>
      </div>

      {/* Row 4: Sub-Categories on white */}
      <div className="overflow-x-auto scrollbar-hide bg-card border-b border-border/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex min-w-max">
          {subCategories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-[5px] px-4 pt-2.5 pb-2 active:scale-95 transition-transform relative"
            >
              <cat.icon
                className={`w-[26px] h-[26px] ${cat.active ? "text-primary" : "text-foreground/55"}`}
                strokeWidth={1.8}
              />
              <span
                className={`text-[11px] font-semibold whitespace-nowrap ${
                  cat.active ? "text-primary" : "text-foreground/50"
                }`}
              >
                {cat.name}
              </span>
              {cat.active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-[3px] rounded-t-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
