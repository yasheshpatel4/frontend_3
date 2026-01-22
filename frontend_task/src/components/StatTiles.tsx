import type { Product } from "../App";

const StatTiles = ({ products }: { products: Product[] }) => {
    const total = products.reduce((acc, p) => acc + p.price * p.stock, 0);
    const lowStock = products.filter((p) => p.stock <= 5).map(p=>p.name).join(",");

  return (
    <>
      <div className=" mt-4 bg-white border rounded p-4">
        <p className="text-sm text-gray-500">Total Products:</p>
        <p className="text-2xl font-bold">{products.length}</p>
        <p className="text-sm text-gray-500">Total Value:</p>
        <p className="text-2xl font-bold">{total}</p>
        <p className="text-sm text-gray-500">low stocks:</p>
        <p className="text-2xl font-bold">{lowStock}</p>
      </div>
      </>
  );
};
  export default StatTiles;