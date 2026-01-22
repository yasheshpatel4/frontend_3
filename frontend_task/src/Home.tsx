import { Outlet, NavLink } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  description: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: { children: any }) => {
  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    // Note: This needs products data, but since it's context, we'll handle in components
    return 0; // Placeholder
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useFetchProducts = (search?: string) => {
  return useQuery({

    queryKey: ["products", search],

    queryFn: async () => {
      const url = search ? `https://dummyjson.com/products/search?q=${search}` : `https://dummyjson.com/products`;
      const response =await axios.get(url);

      return response.data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        stock: p.stock,
        description: p.description,
      })) as Product[];
    },
  });
};

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const p = response.data;
      return {
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        stock: p.stock,
        description: p.description,
      } as Product;
    },
  });
};

export default function Home() {
  return (
    <CartProvider>
      <div>
        <h1>Home Page</h1>
        <nav>
          <NavLink
          to="/product"
          className={({ isActive }) => isActive ? "active-link" : undefined}
        >
          Products
        </NavLink>
        {" | "}
        <NavLink
          to="/cart"
          className={({ isActive }) => isActive ? "active-link" : undefined}
        >
          Cart
        </NavLink>
        </nav>
        <Outlet />
      </div>
    </CartProvider>
  );
}
