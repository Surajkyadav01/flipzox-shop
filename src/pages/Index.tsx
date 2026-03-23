import { useState, useEffect, useMemo, useCallback } from "react";
import FlipkartHeader from "@/components/FlipkartHeader";
import BannerSlider from "@/components/BannerSlider";
import ProductSection from "@/components/ProductSection";
import BottomNav from "@/components/BottomNav";
import AdminPanel from "@/components/AdminPanel";
import { subscribeProducts, defaultProducts, type Product } from "@/lib/products";

const categoryKeywords: Record<string, string[]> = {
  Fashion: ["kurta", "sandal", "shirt", "cotton", "ethnic", "casual", "wear", "fit", "dress", "jeans", "saree", "jacket"],
  Mobiles: ["realme", "phone", "mobile", "5g", "smartphone", "samsung", "iphone", "oneplus", "redmi", "vivo", "oppo"],
  Beauty: ["beauty", "skin", "cream", "fragrance", "perfume", "cosmetic", "makeup", "lipstick", "serum", "lotion"],
  Electronics: ["laptop", "headphone", "watch", "boat", "hp", "intel", "wireless", "speaker", "earbuds", "tablet", "camera", "tv", "monitor"],
  Home: ["sofa", "table", "chair", "furniture", "decor", "lamp", "kitchen", "home", "curtain", "bedsheet", "pillow"],
  Appliances: ["fridge", "refrigerator", "washing", "microwave", "oven", "cooler", "ac", "air conditioner", "mixer", "iron", "geyser", "appliance"],
  Books: ["book", "novel", "textbook", "fiction", "non-fiction", "author", "paperback", "hardcover", "kindle", "literature"],
  Furniture: ["desk", "shelf", "wardrobe", "bed", "cabinet", "rack", "stool", "bookshelf", "dining"],
  Sports: ["cricket", "bat", "ball", "football", "fitness", "gym", "yoga", "running", "shoes", "sports", "dumbbell", "treadmill"],
  Toys: ["toy", "lego", "doll", "puzzle", "game", "kids", "children", "play", "action figure", "board game"],
  "Food & Health": ["food", "snack", "health", "nutrition", "vitamin", "protein", "organic", "supplement", "dry fruit", "honey", "green tea"],
};

function matchesCategory(product: Product, category: string): boolean {
  if (category === "For You") return true;
  const keywords = categoryKeywords[category];
  if (!keywords) return true;
  const text = `${product.name} ${product.description}`.toLowerCase();
  return keywords.some((kw) => text.includes(kw));
}

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  discountPercentage: number;
}

function mapDummyToProduct(d: DummyProduct): Product {
  const inrPrice = Math.round(d.price * 83);
  const discount = Math.round(d.discountPercentage);
  const originalPrice = Math.round(inrPrice / (1 - discount / 100));
  return {
    id: `dummy-${d.id}`,
    name: d.title,
    price: inrPrice,
    originalPrice,
    description: d.description,
    imageUrl: d.thumbnail,
    category: "suggested",
    discount,
  };
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    const unsub = subscribeProducts((firebaseProducts) => {
      const defaultIds = new Set(defaultProducts.map((d) => d.id));
      const newOnes = firebaseProducts.filter((p) => !defaultIds.has(p.id));
      setProducts([...defaultProducts, ...newOnes]);
    });
    return unsub;
  }, []);

  // DummyJSON fallback search
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setApiProducts([]);
      return;
    }

    // Check if local products match first
    const localMatch = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
    );
    if (localMatch.length > 0) {
      setApiProducts([]);
      return;
    }

    // Fetch from DummyJSON
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setApiLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=12`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setApiProducts((data.products || []).map(mapDummyToProduct));
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("DummyJSON fetch error:", err);
      } finally {
        setApiLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery, products]);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== "For You") {
      result = result.filter((p) => matchesCategory(p, activeCategory));
    }

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

  const showApiResults = searchQuery.trim() && filtered.length === 0 && apiProducts.length > 0;

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
        {showApiResults ? (
          <ProductSection title={`Results for "${searchQuery}"`} products={apiProducts} layout="grid" />
        ) : (
          <>
            <ProductSection title="Suggested For You" products={suggested} layout="grid" />
            <ProductSection title="Featured Brands" products={featured} layout="scroll" />
            <ProductSection title="Best Deals" products={deals} layout="grid" />
          </>
        )}
      </div>

      {apiLoading && searchQuery.trim() && filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">Searching online...</div>
      )}

      {filtered.length === 0 && !showApiResults && !apiLoading && (searchQuery || activeCategory !== "For You") && (
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
