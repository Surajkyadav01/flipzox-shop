import { useState, useEffect, useMemo } from "react";
import FlipkartHeader from "@/components/FlipkartHeader";
import BannerSlider from "@/components/BannerSlider";
import ProductSection from "@/components/ProductSection";
import BottomNav from "@/components/BottomNav";
import AdminPanel from "@/components/AdminPanel";
import { subscribeProducts, defaultProducts, type Product } from "@/lib/products";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsub = subscribeProducts((firebaseProducts) => {
      // Merge: always keep defaults, append Firebase products (deduplicated by id)
      const defaultIds = new Set(defaultProducts.map((d) => d.id));
      const newOnes = firebaseProducts.filter((p) => !defaultIds.has(p.id));
      setProducts([...defaultProducts, ...newOnes]);
    });
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const suggested = filtered.filter((p) => p.category === "suggested");
  const featured = filtered.filter((p) => p.category === "featured");
  const deals = filtered.filter((p) => p.category === "deals");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Account") {
      setShowAdmin(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 max-w-lg mx-auto">
      <FlipkartHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BannerSlider />

      <ProductSection title="Suggested For You" products={suggested} layout="grid" />
      <ProductSection title="Featured Brands" products={featured} layout="scroll" />
      <ProductSection title="Best Deals" products={deals} layout="grid" />

      {filtered.length === 0 && searchQuery && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No products found for "{searchQuery}"
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

export default Index;
