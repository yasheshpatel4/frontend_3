import { useParams } from "react-router-dom";
import { useFetchProductById } from "../Home";


export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useFetchProductById(id!);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-2"><strong>Price: </strong>${product.price}</p>
      <p className="mb-2"><strong>Category:</strong> {product.category}</p>
      <p className="mb-2"><strong>Stock:</strong> {product.stock}</p>
      <p className="mb-4"><strong>Description: </strong> {product.description}</p>
    </div>
  );
}
