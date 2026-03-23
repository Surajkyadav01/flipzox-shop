import type { Product } from "@/lib/products";

const ProductCard = ({ product }: { product: Product }) => {
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = product.flipkartUrl || "https://www.flipkart.com";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
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
      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-snug min-h-[2.25rem]">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mt-0.5">
            {product.description}
          </p>
        )}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-sm font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <button
          onClick={handleBuyNow}
          className="w-full mt-2 bg-flipkart-orange text-white text-xs font-bold py-2 rounded active:scale-[0.97] transition-transform"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
