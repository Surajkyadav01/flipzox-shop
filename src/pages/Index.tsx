import { useState, useEffect, useMemo } from "react";
import FlipkartHeader from "@/components/FlipkartHeader";
import BannerSlider from "@/components/BannerSlider";
import ProductSection from "@/components/ProductSection";
import BottomNav from "@/components/BottomNav";
import AdminPanel from "@/components/AdminPanel";
import { subscribeProducts, defaultProducts, type Product } from "@/lib/products";

// Map subcategory names to keyword matchers
const categoryKeywords: Record<string, string[]> = {
  Fashion: ["kurta", "sandal", "shirt", "cotton", "ethnic", "casual", "wear", "fit"],
  Mobiles: ["realme", "phone", "mobile", "5g", "smartphone", "samsung", "iphone"],
  Beauty: ["beauty", "skin", "cream", "fragrance", "perfume", "cosmetic"],
  Electronics: ["laptop", "headphone", "watch", "boat", "hp", "intel", "wireless", "speaker", "earbuds"],
  Home: ["sofa", "table", "chair", "furniture", "decor", "lamp", "kitchen", "home"],
};

function matchesCategory(product: Product, category: string): boolean {
  if (category === "For You") return true;
  const keywords = categoryKeywords[category];
  if (!keywords) return true;
  const text = `${product.name} ${product.description}`.toLowerCase();
  return keywords.some((kw) => text.includes(kw));
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");

  useEffect(() => {
    const unsub = subscribeProducts((firebaseProducts) => {
      const defaultIds = new Set(defaultProducts.map((d) => d.id));
      const newOnes = firebaseProducts.filter((p) => !defaultIds.has(p.id));
      setProducts([...defaultProducts, ...newOnes]);
    });
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    let result = products;

    // Category filter
    if (activeCategory !== "For You") {
      result = result.filter((p) => matchesCategory(p, activeCategory));
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, searchQuery, activeCategory]);

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
    <div className="min-h-screen bg-background pb-16 w-full max-w-[1200px] mx-auto">
      <FlipkartHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BannerSlider />

      <div className="transition-all duration-300">
        <ProductSection title="Suggested For You" products={suggested} layout="grid" />
        <ProductSection title="Featured Brands" products={featured} layout="scroll" />
        <ProductSection title="Best Deals" products={deals} layout="grid" />
      </div>

      {filtered.length === 0 && (searchQuery || activeCategory !== "For You") && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No products found{searchQuery ? ` for "${searchQuery}"` : ` in ${activeCategory}`}
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

export default Index;
