import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: Product[];
  layout?: "grid" | "scroll";
  bgClass?: string;
}

const ProductSection = ({ title, products, layout = "grid", bgClass = "bg-card" }: Props) => {
  if (products.length === 0) return null;

  return (
    <section className={`${bgClass} mx-0 my-2 py-4 px-3 rounded-none`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
      </div>
      {layout === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
          {products.map((p) => (
            <div key={p.id} className="min-w-[150px] max-w-[150px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
