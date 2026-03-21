import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  category: "suggested" | "featured" | "deals";
  discount: number;
  flipkartUrl?: string;
}

const COLLECTION = "products";

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Realme P4 Lite 5G (Starry Night, 128GB)",
    price: 11499,
    originalPrice: 15999,
    description: "6GB RAM, 128GB Storage, 5000mAh Battery",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    category: "suggested",
    discount: 28,
    flipkartUrl: "https://www.flipkart.com",
  },
  {
    id: "2",
    name: "HP 15s Laptop Intel Core i5 12th Gen",
    price: 42990,
    originalPrice: 62790,
    description: '8GB RAM, 512GB SSD, 15.6" FHD Display',
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    category: "suggested",
    discount: 32,
    flipkartUrl: "https://www.flipkart.com",
  },
  {
    id: "3",
    name: "Men's Casual Sandals Black Comfort Fit",
    price: 349,
    originalPrice: 999,
    description: "Lightweight, Anti-skid, Daily Wear",
    imageUrl: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop",
    category: "suggested",
    discount: 65,
    flipkartUrl: "https://www.flipkart.com",
  },
  {
    id: "4",
    name: "boAt Rockerz 450 Wireless Headphones",
    price: 1299,
    originalPrice: 3990,
    description: "40mm Drivers, 15H Playback, Padded Ear Cushions",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "featured",
    discount: 67,
    flipkartUrl: "https://www.flipkart.com",
  },
  {
    id: "5",
    name: "Samsung Galaxy Watch 5 Pro (45mm)",
    price: 24999,
    originalPrice: 44999,
    description: "Titanium Case, Sapphire Crystal, GPS",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    category: "featured",
    discount: 44,
    flipkartUrl: "https://www.flipkart.com",
  },
  {
    id: "6",
    name: "Men's Printed Cotton Kurta (Ethnic Wear)",
    price: 499,
    originalPrice: 1499,
    description: "Regular Fit, Full Sleeve, All Season",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop",
    category: "deals",
    discount: 67,
    flipkartUrl: "https://www.flipkart.com",
  },
];

export function subscribeProducts(callback: (products: Product[]) => void): Unsubscribe {
  const q = query(collection(db, COLLECTION));
  return onSnapshot(
    q,
    (snapshot) => {
      const products: Product[] = snapshot.docs.map((d) => ({
        ...(d.data() as Omit<Product, "id">),
        id: d.id,
      }));
      callback(products);
    },
    (error) => {
      console.error("Firestore subscription error, falling back to defaults:", error);
      callback(defaultProducts);
    }
  );
}

export async function addProduct(product: Omit<Product, "id">): Promise<void> {
  await addDoc(collection(db, COLLECTION), product);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
