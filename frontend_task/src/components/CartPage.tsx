import type { CartItem, Product } from "../App";

interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  totalPrice: number;
}

const CartPage = ({
  cart,
  products,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
  totalPrice,
}: CartPageProps) => {
  if (cart.length == 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto border-2 m-10">
      <h2 className="m-4 text-xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => {
          const product = products.find((p) => p.id == item.id);
          if (!product) return null;
          return (
            <div key={item.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-right">
        <p className="mr-4 text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <div className="mt-4 space-x-2">
          <button className="mb-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={onClear}>
            Clear Cart
          </button>
          <button className="mb-4 mr-4 bg-green-500 text-white px-4 py-2 rounded" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
