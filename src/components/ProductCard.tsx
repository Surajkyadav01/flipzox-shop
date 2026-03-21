import type { Product } from "@/lib/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] transition-transform">
      <div className="relative aspect-square bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-0 bg-flipkart-green text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-r-sm">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-snug min-h-[2.25rem]">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-sm font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
