import { useFetchProducts, useCart } from "../Home";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const { data: products, isLoading, error } = useFetchProducts();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products?.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    },0);
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length == 0 ? 
      (
        <p>Your cart is empty.</p>
      ):
      (
        <div>
          {cart.map((item) => {
            const product = products?.find((p) => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="border p-4 mb-4 rounded flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${product.price * item.quantity}</p>
                </div>
                <div>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="border p-2 mr-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="border p-2 mr-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="border p-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="mt-4">
            <p className="text-xl font-bold">Total Price: ${getTotalPrice()}</p>
            <button
              onClick={clearCart}
              className="border p-2 mt-2 text-red-500"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Checkout functionality is remaining to implement")}
              className="border p-2 mt-2 ml-2 text-green-500"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
