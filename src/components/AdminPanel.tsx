import { useState } from "react";
import { X, Trash2, Plus } from "lucide-react";
import { addProduct, getProducts, deleteProduct, type Product } from "@/lib/products";

interface Props {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>(getProducts());

  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    imageUrl: "",
    category: "suggested" as "suggested" | "featured",
  });

  const handleLogin = () => {
    if (password === "Sunil") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice) || price;
    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    addProduct({
      name: form.name,
      price,
      originalPrice,
      description: form.description,
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: form.category,
      discount,
    });

    setForm({ name: "", price: "", originalPrice: "", description: "", imageUrl: "", category: "suggested" });
    setProducts(getProducts());
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl p-6 w-full max-w-sm shadow-xl animate-fade-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-foreground">Admin Login</h2>
            <button onClick={onClose} className="active:scale-95">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full mt-3 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg active:scale-[0.98] transition-transform"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center">
      <div className="bg-card rounded-t-2xl sm:rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl animate-fade-up">
        <div className="sticky top-0 bg-card z-10 flex justify-between items-center p-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground">Admin Panel</h2>
          <button onClick={onClose} className="active:scale-95">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Add Product</h3>
          <input
            placeholder="Product Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Price (₹) *"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              placeholder="Original Price (₹)"
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as "suggested" | "featured" })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="suggested">Suggested For You</option>
            <option value="featured">Featured Brands</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full bg-flipkart-green text-accent-foreground font-semibold py-2.5 rounded-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="p-4 border-t border-border">
          <h3 className="font-semibold text-sm text-foreground mb-3">
            All Products ({products.length})
          </h3>
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-muted rounded-lg p-2.5">
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    ₹{p.price.toLocaleString("en-IN")} · {p.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="shrink-0 p-2 text-destructive hover:bg-destructive/10 rounded-lg active:scale-95 transition-transform"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
