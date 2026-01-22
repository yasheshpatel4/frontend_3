import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
type ProductCardProps = {
  theme: string
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  deleteProduct: (id: number)=>void;
  addToCart: (id: number) =>void;
};


const mode=localStorage.getItem("theme");
const ProductCard = ({
  theme,
  id,
  name,
  price,
  category,
  stock,
  deleteProduct,
  addToCart,
}: ProductCardProps) => {
  const navigate = useNavigate();
const detail = (id: number) => {
    navigate(`products/${id}`); 
  };
  return (

    <div className="border p-4 rounded">
      <h2
  className={`text-lg font-bold ${
    theme == "light"
      ? 'text-blue-600 dark:text-red-400'
      : 'text-gray-900 dark:text-yellow-300'
  }`}>
  {name}
</h2>
      <p>Price: ${price}{price > 500 && <span>  (premium)</span>}</p>
      <p>Category: {category}</p>
      {stock == 0 && <p>out of stock</p>}
      {(stock >0 && stock< 6)&&<p>limited</p>}
      <button onClick={() => deleteProduct(id)} className="border-2 p-2 text-red-500 mt-2">
      Delete
      </button>
      <button onClick={()=>addToCart(id)} className="border-2 p-2 ml-2 text-500 mt-2">
      Add to cart
      </button> 
      <button onClick={()=>detail(id)} className="border-2 p-2 ml-2 text-500 mt-2">
      Details
      </button> 
      
    </div>
    
  );
};

export default ProductCard;
