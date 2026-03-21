import { Search, Camera } from "lucide-react";

const FlipkartHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="flex flex-col items-start shrink-0">
          <span className="text-primary-foreground font-bold text-lg leading-tight tracking-tight">Flipkart</span>
          <span className="text-[10px] text-primary-foreground/70 italic -mt-0.5">
            Explore <span className="text-flipkart-yellow font-semibold">Plus</span>
          </span>
        </div>
        <div className="flex-1 flex items-center bg-card rounded-sm px-3 py-1.5 gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none w-full"
          />
          <Camera className="w-5 h-5 text-muted-foreground shrink-0" />
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
