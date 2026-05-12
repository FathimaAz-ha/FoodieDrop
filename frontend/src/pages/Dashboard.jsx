import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Dashboard() {
  const { refreshProducts, notify } = useCart();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
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
      notify?.("Failed to load products: " + error.message);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `http://localhost:8080/api/updateProduct/${editingProduct.id}`
        : "http://localhost:8080/api/addProduct";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (!response.ok) {
        const errorMessage = await parseResponseError(response);
        throw new Error(errorMessage);
      }

      fetchProducts();
      refreshProducts();
      resetForm();
      notify?.(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!",
      );
    } catch (error) {
      console.error("Error saving product:", error);
      notify?.(
        "Error saving product: " + (error.message || "Please try again."),
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/deleteById/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorMessage = await parseResponseError(response);
          throw new Error(errorMessage);
        }
        fetchProducts();
        refreshProducts();
        notify?.("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        notify?.(
          "Error deleting product: " + (error.message || "Please try again."),
        );
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    });
  };

  return (
    <section className="admin-section">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="sidebar-menu">
            <button
              className={`sidebar-btn ${activeTab === "overview" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("overview")}
            >
              <i className="fas fa-chart-line" /> Overview
            </button>
            <button
              className={`sidebar-btn ${activeTab === "products" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("products")}
            >
              <i className="fas fa-box" /> Products
            </button>
            <button className="sidebar-btn" type="button">
              <i className="fas fa-shopping-cart" /> Orders
            </button>
            <button className="sidebar-btn" type="button">
              <i className="fas fa-users" /> Customers
            </button>
          </div>
        </aside>

        <main className="admin-content">
          {activeTab === "overview" && (
            <div className="admin-tab active">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-dollar-sign" />
                  <h4>Total Sales</h4>
                  <div className="stat-number">LKR 42,500</div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-shopping-basket" />
                  <h4>Orders</h4>
                  <div className="stat-number">124</div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-users" />
                  <h4>Customers</h4>
                  <div className="stat-number">89</div>
                </div>
              </div>
              <div className="table-section">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1104</td>
                      <td>Sam</td>
                      <td>Delivered</td>
                      <td>LKR 2,100</td>
                    </tr>
                    <tr>
                      <td>#1105</td>
                      <td>Lisa</td>
                      <td>Pending</td>
                      <td>LKR 1,450</td>
                    </tr>
                    <tr>
                      <td>#1106</td>
                      <td>Mark</td>
                      <td>Delivered</td>
                      <td>LKR 3,320</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="admin-tab active">
              <h2>Product Management</h2>

              <div className="product-form-section">
                <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="dairy">Dairy</option>
                        <option value="beverages">Beverages</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stock">Stock</label>
                      <input
                        type="number"
                        id="stock"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="url"
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    {editingProduct && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="table-section">
                <h3>Existing Products</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>LKR {product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <button
                            className="btn btn-small btn-primary"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-small btn-danger"
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
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
