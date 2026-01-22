import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProducts, useCart, type Product } from "../Home";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: products, isLoading, error } = useFetchProducts(search.trim() || undefined);

  const detail = (id: number) => {
    navigate(`${id}`);
  };

  // const deleteProduct = (id: number) => {

  // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mt-4 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {products?.map((product: Product) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>Price: ${product.price}{product.price > 500 && <div> (premium)</div>}</p>
            <p>Category: {product.category}</p>
            {product.stock === 0 && <p>out of stock</p>}
            {product.stock > 0 && product.stock < 6 && <p>limited</p>}
            {/* <button onClick={() => deleteProduct(product.id)} className="border-2 p-2 text-red-500 mt-2">
              Delete
            </button> */}
            <button onClick={() => detail(product.id)} className="border-2 p-2 mt-2 ml-2">
              Detail
            </button>
            <button onClick={() => addToCart(product.id)} className="border-2 p-2 mt-2 ml-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
