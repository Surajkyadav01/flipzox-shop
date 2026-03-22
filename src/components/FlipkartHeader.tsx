import { Search, Camera, MapPin, IndianRupee, Plane, ShoppingCart, Heart, Shirt, Monitor, Smartphone, Sofa, Sparkles, ShoppingBag, Droplets, Headphones, ScanLine, Zap } from "lucide-react";

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
];

const FlipkartHeader = ({ searchQuery, onSearchChange }: Props) => {
  return (
    <header className="sticky top-0 z-50">
      {/* Gradient background with palm-leaf texture overlay */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #90caf9 0%, #bbdefb 40%, #e3f2fd 75%, #ffffff 100%)",
        }}
      >
        {/* Subtle palm-leaf texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M20 80 Q60 20 100 60 Q80 40 60 70 Z' fill='%23ffffff' opacity='0.12'/%3E%3Cpath d='M140 30 Q170 70 130 100 Q160 60 150 40 Z' fill='%23ffffff' opacity='0.10'/%3E%3Cpath d='M30 140 Q70 110 90 150 Q60 130 40 145 Z' fill='%23ffffff' opacity='0.08'/%3E%3Cpath d='M150 120 Q180 150 160 180 Q175 140 155 130 Z' fill='%23ffffff' opacity='0.09'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Row 1: Category Cards */}
        <div className="relative px-2.5 pt-3 pb-2">
          <div className="flex items-stretch gap-2">
            {/* FlipzoX — Blue bg card */}
            <button className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-primary shadow-[0_2px_10px_rgba(40,116,240,0.3)] active:scale-[0.97] transition-transform">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                <span className="text-primary font-extrabold text-lg leading-none">F</span>
              </div>
              <span className="text-[11px] font-extrabold text-primary-foreground tracking-wide leading-none">
                Flipzo<span className="text-[hsl(0,85%,50%)]">X</span>
              </span>
            </button>

            {/* Finance */}
            <button className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.97] transition-transform">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-sm">
                <IndianRupee className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Finance</span>
            </button>

            {/* Travel */}
            <button className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.97] transition-transform">
              <div className="w-11 h-11 rounded-full bg-[hsl(15,85%,55%)] flex items-center justify-center shadow-sm">
                <Plane className="w-6 h-6 text-primary-foreground -rotate-12" strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Travel</span>
            </button>

            {/* Grocery */}
            <button className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.97] transition-transform">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-5 h-5 text-foreground" strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-foreground tracking-wide leading-none">Grocery</span>
            </button>
          </div>
        </div>

        {/* Row 2: Location Bar */}
        <div className="relative flex items-center justify-between px-4 py-[7px] bg-card/40 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-foreground/70" strokeWidth={2.5} />
            <span className="text-[12px] text-foreground/80 font-semibold">221404, Suriyawan</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-secondary" strokeWidth={2.5} />
            <span className="text-[12px] font-bold text-foreground/70">0</span>
          </div>
        </div>

        {/* Row 3: Search Bar */}
        <div className="relative flex items-center gap-2 px-3 py-2">
          <div className="flex-1 flex items-center bg-card rounded-xl px-3.5 py-[9px] gap-3 border-2 border-primary/70 transition-colors">
            <Search className="w-[20px] h-[20px] text-muted-foreground/60 shrink-0" strokeWidth={2.2} />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-[14px] text-card-foreground placeholder:text-muted-foreground/50 outline-none w-full font-normal"
            />
            <Camera className="w-[20px] h-[20px] text-muted-foreground/50 shrink-0" strokeWidth={2} />
          </div>
          <button className="shrink-0 p-1.5 active:scale-95 transition-transform">
            <ScanLine className="w-6 h-6 text-foreground/60" strokeWidth={2} />
          </button>
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
