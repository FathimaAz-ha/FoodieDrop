import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function AddProduct() {
  const { notify, refreshProducts, user } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  // Redirect if not logged in, then fetch products
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    setFetchingProducts(true);
    try {
      const response = await fetch("http://localhost:8080/api/getAllProducts");
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload?.message || payload?.error || response.statusText;
        throw new Error(message || "Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify("Failed to fetch products: " + error.message);
    } finally {
      setFetchingProducts(false);
    }
  };

  const parseResponseError = async (response) => {
    let message = response.statusText || "Request failed";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      } else if (typeof body === "string") {
        message = body;
      } else if (body?.error) {
        message = body.error;
      }
    } catch (error) {
      // ignore parse failure
    }
    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
        }),
      });

      if (!response.ok) {
        const errorMessage = await parseResponseError(response);
        throw new Error(errorMessage);
      }

      const newProduct = await response.json();
      notify("Product added successfully!");
      refreshProducts(); // Refresh the products list
      fetchProducts(); // Refresh the local products list
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      notify("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/deleteById/${productId}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const errorMessage = await parseResponseError(response);
          throw new Error(errorMessage);
        }

        notify("Product deleted successfully!");
        refreshProducts(); // Refresh the global products list
        fetchProducts(); // Refresh the local products list
      } catch (error) {
        console.error("Error deleting product:", error);
        notify("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (LKR):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <div className="products-section">
        <h2>Existing Products</h2>
        {fetchingProducts ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price (LKR)</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
