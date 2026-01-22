import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  return <h3>Product Detail for ID: {id}</h3>;
}
