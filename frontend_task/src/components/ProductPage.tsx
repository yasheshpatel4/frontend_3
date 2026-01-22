import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};
export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate=useNavigate();
    const detail=(id:number)=>{
        navigate(`${id}`);
    }
  
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {filteredProducts.map((product)=>(
          <div className="border p-4 rounded">
      <h2
  className={`text-lg font-bold `}>
  {product.name}
</h2>
      <p>Price: ${product.price}{product.price > 500 && <span>  (premium)</span>}</p>
      <p>Category: {product.category}</p>
      {product.stock == 0 && <p>out of stock</p>}
      {(product.stock >0 && product.stock< 6)&&<p>limited</p>}
      <button onClick={() => deleteProduct(product.id)} className="border-2 p-2 text-red-500 mt-2">
      Delete
      </button>
      <button onClick={() => detail(product.id)} className="border-2 p-2 text-red-500 mt-2">
      Details
      </button>
      {/* <button onClick={()=>addToCart(product.id)} className="border-2 p-2 ml-2 text-500 mt-2">
      Add to cart
      </button>  */}
    </div>
          ))}
      </div>
  );
}
