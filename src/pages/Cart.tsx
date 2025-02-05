import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const styles = {
  cartItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  },
  cartItemImage: {
    width: '100px',
    height: '100px',
  },
};

const Cart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();

  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }


  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }
    clearCart();
    alert('Checkout Successful!');
  };

  return (
    <div>
      <h1>Current Shopping Cart:</h1>
      {cartItems.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} style={styles.cartItemImage} />
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>
        <h4>Total: ${total}</h4>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};
export default Cart;
