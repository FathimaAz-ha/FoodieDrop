import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, subtotal, tax, delivery, total, clearCart, notify } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', payment: 'card' });
  const [agree, setAgree] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      notify('Your cart is empty!');
      navigate('/cart');
      return;
    }
    if (!agree) {
      notify('Please agree to the terms before continuing.');
      return;
    }
    clearCart();
    navigate('/');
  };

  return (
    <section className="checkout-section">
      <div className="container">
        <h2>Checkout</h2>
        <div className="checkout-wrapper">
          <div className="checkout-form">
            <div className="form-section">
              <h3>Billing Details</h3>
              <div className="form-group">
                <label>Name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea name="address" rows="4" value={form.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input name="payment" type="radio" value="card" checked={form.payment === 'card'} onChange={handleChange} />
                  Credit / Debit Card
                </label>
                <label className="payment-option">
                  <input name="payment" type="radio" value="paypal" checked={form.payment === 'paypal'} onChange={handleChange} />
                  PayPal
                </label>
                <label className="payment-option">
                  <input name="payment" type="radio" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <label className="checkbox">
              <input type="checkbox" checked={agree} onChange={() => setAgree((value) => !value)} />
              I agree to the terms and conditions.
            </label>

            <button className="btn btn-primary full-width" type="button" onClick={handleSubmit}>
              Place Order
            </button>
          </div>

          <div className="order-summary">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
