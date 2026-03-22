import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=400&fit=crop",
    title: "Smartphone Mega Sale",
    subtitle: "Up to 40% Off on Top Brands",
    badge: "LIMITED OFFER",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=400&fit=crop",
    title: "Cooling Days",
    subtitle: "ACs & Coolers from ₹6,999",
    badge: "HOT DEAL",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop",
    title: "Fashion Bonanza",
    subtitle: "Min 50%–80% Off Top Styles",
    badge: "TRENDING",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
    title: "Electronics Fest",
    subtitle: "Deals Starting ₹99",
    badge: "FLASH SALE",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden mx-3 my-3 rounded-xl shadow-md">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full relative h-44 rounded-xl overflow-hidden">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded mb-1.5 tracking-wide shadow">
                {banner.badge}
              </span>
              <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">
                {banner.title}
              </h3>
              <p className="text-xs text-white/85 mt-0.5">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
