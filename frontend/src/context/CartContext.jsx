import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sampleProducts } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEYS = {
  CART: 'foodiedrop_cart',
  THEME: 'foodiedrop-theme'
};

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price)
  };
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
}

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    setTheme(storedTheme);
    applyTheme(storedTheme);

    const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        setCart([]);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    applyTheme(theme);
  }, [theme]);

  async function fetchProducts() {
    try {
      const response = await fetch('/api/getAllProducts');
      if (!response.ok) {
        throw new Error('Network error');
      }
      const data = await response.json();
      setProducts(data.map(normalizeProduct));
    } catch (error) {
      setProducts(sampleProducts);
    }
  }

  function notify(message) {
    setNotification(message);
    window.setTimeout(() => {
      setNotification('');
    }, 3000);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function addToCart(productId, quantity = 1) {
    const product = products.find((item) => String(item.id) === String(productId));
    if (!product) {
      notify('Product is unavailable.');
      return;
    }
    setCart((currentCart) => {
      const existing = currentCart.find((item) => String(item.id) === String(productId));
      if (existing) {
        return currentCart.map((item) =>
          String(item.id) === String(productId)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentCart, { ...product, quantity }];
    });
    notify('Product added to cart!');
  }

  function updateCartQuantity(productId, quantity) {
    const sanitized = Number(quantity) || 1;
    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity: Math.max(1, sanitized) }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => String(item.id) !== String(productId)));
    notify('Product removed from cart');
  }

  function clearCart() {
    setCart([]);
    notify('Thank you! Your order has been placed.');
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.1).toFixed(2));
  const delivery = 2.0;
  const total = Number((subtotal + tax + delivery).toFixed(2));

  const value = useMemo(
    () => ({
      products,
      cart,
      theme,
      notification,
      cartCount,
      subtotal,
      tax,
      delivery,
      total,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleTheme,
      notify
    }),
    [products, cart, theme, notification, cartCount, subtotal, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
