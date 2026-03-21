import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    gradient: "from-blue-600 to-blue-400",
    title: "Cooling Days Sale",
    subtitle: "Up to 45% Off on ACs & Coolers",
  },
  {
    id: 2,
    gradient: "from-orange-500 to-yellow-400",
    title: "Fashion Mega Sale",
    subtitle: "Min 50% Off on Top Brands",
  },
  {
    id: 3,
    gradient: "from-green-600 to-emerald-400",
    title: "Electronics Fest",
    subtitle: "Deals Starting ₹99",
  },
  {
    id: 4,
    gradient: "from-purple-600 to-pink-400",
    title: "Travel Bonanza",
    subtitle: "Flat ₹500 Off on Flight Bookings",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden mx-3 my-3 rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full h-40 bg-gradient-to-r ${banner.gradient} rounded-lg flex flex-col justify-center px-6`}
          >
            <h3 className="text-xl font-bold text-white drop-shadow-sm">{banner.title}</h3>
            <p className="text-sm text-white/90 mt-1">{banner.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
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
