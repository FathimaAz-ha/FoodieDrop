import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const categories = ["all", "vegetables", "fruits", "dairy", "beverages"];

function Home() {
  const { products, addToCart, notify } = useCart();
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      return products;
    }
    return products.filter((product) => product.category === filter);
  }, [filter, products]);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            Welcome to <span className="highlight">FoodieDrop</span>
          </h1>
          <p>Fresh, Delicious Food Delivered Right to Your Door</p>
          <button
            className="btn btn-primary hero-btn"
            type="button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Shopping
          </button>
        </div>
        <div className="hero-image">
          <div className="food-animation-container">
            <i className="fas fa-leaf hero-icon" style={{ "--delay": "0s" }} />
            <i
              className="fas fa-apple-alt hero-food"
              style={{ "--delay": "0.5s" }}
            />
            <i
              className="fas fa-carrot hero-food"
              style={{ "--delay": "1s" }}
            />
            <i className="fas fa-egg hero-food" style={{ "--delay": "1.5s" }} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <i className="fas fa-bolt" />
          <h3>Fast Delivery</h3>
          <p>Get your food delivered within 30 minutes</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-leaf" />
          <h3>Fresh Products</h3>
          <p>Only the freshest ingredients from local farms</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-lock" />
          <h3>Secure Payment</h3>
          <p>Safe and encrypted payment processing</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-smile" />
          <h3>Best Support</h3>
          <p>24/7 customer support at your service</p>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="container">
          <h2>Our Products</h2>
          <div className="filter-section">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="products-grid" id="productsGrid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={(productToOpen) => setSelectedProduct(productToOpen)}
                onAdd={(productId) => addToCart(productId, 1)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-content">
          <h2>About FoodieDrop</h2>
          <p>
            FoodieDrop is your one-stop destination for fresh, high-quality food
            and beverages. We partner with local farmers and producers to bring
            you the best products at affordable prices. Our mission is to make
            healthy eating accessible and convenient for everyone.
          </p>
          <div className="about-stats">
            <div className="stat">
              <h4>1000+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h4>500+</h4>
              <p>Products</p>
            </div>
            <div className="stat">
              <h4>24/7</h4>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <ContactForm
            onSuccess={() => notify("Thank you! We will get back to you soon.")}
          />
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={(productId, quantity) => {
          addToCart(productId, quantity);
          setSelectedProduct(null);
        }}
      />
    </>
  );
}

function ContactForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    onSuccess();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <textarea
        placeholder="Your Message"
        rows="5"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}

export default Home;
