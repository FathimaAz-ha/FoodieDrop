import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateCartQuantity, subtotal, tax, delivery, total } = useCart();
  const navigate = useNavigate();

  return (
    <section className="cart-section">
      <div className="container">
        <h2>Your Shopping Cart</h2>
        <div className="cart-wrapper">
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart" />
                <p>Your cart is empty</p>
                <button className="btn btn-primary" type="button" onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">LKR {item.price.toFixed(2)}</div>
                    <div className="cart-item-controls">
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(event) => updateCartQuantity(item.id, event.target.value)}
                      />
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </div>
                    <span className="cart-item-remove" role="button" tabIndex={0} onClick={() => removeFromCart(item.id)}>
                      <i className="fas fa-trash" /> Remove
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (10%):</span>
              <span>LKR {tax.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee:</span>
              <span>LKR {delivery.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>LKR {total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary full-width" type="button" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <button className="btn btn-secondary full-width" type="button" onClick={() => navigate('/') }>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
