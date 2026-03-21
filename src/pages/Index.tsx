import { useState, useEffect, useCallback } from "react";
import FlipkartHeader from "@/components/FlipkartHeader";
import CategoryBar from "@/components/CategoryBar";
import BannerSlider from "@/components/BannerSlider";
import ProductSection from "@/components/ProductSection";
import BottomNav from "@/components/BottomNav";
import AdminPanel from "@/components/AdminPanel";
import { getProducts, type Product } from "@/lib/products";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    loadProducts();
    window.addEventListener("products-updated", loadProducts);
    return () => window.removeEventListener("products-updated", loadProducts);
  }, [loadProducts]);

  const suggested = products.filter((p) => p.category === "suggested");
  const featured = products.filter((p) => p.category === "featured");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Account") {
      // Double-tap account to open admin
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 max-w-lg mx-auto">
      <FlipkartHeader />
      <CategoryBar />
      <BannerSlider />

      <ProductSection title="Suggested For You" products={suggested} layout="grid" />
      <ProductSection title="Featured Brands" products={featured} layout="scroll" />

      {/* Hidden admin access */}
      <div className="flex justify-center py-6">
        <button
          onClick={() => setShowAdmin(true)}
          className="text-[10px] text-muted-foreground/40 active:text-muted-foreground transition-colors"
        >
          Admin Access
        </button>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

export default Index;
