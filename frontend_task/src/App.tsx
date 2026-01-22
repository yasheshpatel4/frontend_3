import { useState,useEffect,useContext } from "react";
// import ProductCard from "./components/ProductCard";
import CartPage from "./components/CartPage";
import StatTiles from "./components/StatTiles";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

export interface CartItem {
  id: number;
  quantity: number;
};

function App(){
  

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (query?: string) => {
    try {
      setLoading(true);
      const url = query
        ? `https://dummyjson.com/products/search?q=${query}`
        : `https://dummyjson.com/products`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      const mapped: Product[] = data.products.map((p: any) => ({
        id: p.id,
        name: p.title,
        price: p.price,
        category: p.category,
        stock: p.stock,
      }));

      setProducts(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
      fetchProducts(search.trim() || undefined);
  }, [search]);


  const deleteProduct = (id:number)=>{
    setProducts(products.filter((p)=>p.id!=id));
  };

  const filteredProducts = products.filter((p)=>p.name.toLowerCase().includes(search.toLowerCase()));

  return(

    <div className="p-4">


      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mt-4 mb-4 w-full"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>


      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {filteredProducts.map((product)=>(
           <ProductCard theme={theme} key={product.id} {...product}  deleteProduct={deleteProduct} addToCart={addToCart} /> ))}
      </div> */}

      {/* <CartPage
        cart={cart}
        products={products}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={()=>alert("Checkout functionality is remaining to implemnet")}
        totalPrice={getTotalPrice()}
      /> */}

      <StatTiles products={products}/>
    </div>
  );
}

export default App;
