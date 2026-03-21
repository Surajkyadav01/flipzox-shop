import { Home, LayoutGrid, Bell, User, ShoppingCart } from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, active: true },
  { name: "Categories", icon: LayoutGrid },
  { name: "Notifications", icon: Bell },
  { name: "Account", icon: User },
  { name: "Cart", icon: ShoppingCart, badge: 2 },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 active:scale-95 transition-transform relative"
            >
              <div className="relative">
                <tab.icon
                  className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-flipkart-orange text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
