// ==================== ADMIN DASHBOARD FUNCTIONS ====================
let productList = [];

const STORAGE_KEYS = {
    PRODUCTS: 'foodiedrop_products',
    CART: 'foodiedrop_cart',
    ORDERS: 'foodiedrop_orders'
};

// ==================== TAB SWITCHING ====================
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');

    // Load data for the tab
    if (tabName === 'products') {
        loadProductsTable();
    } else if (tabName === 'orders') {
        loadOrdersTable();
    } else if (tabName === 'customers') {
        loadCustomersTable();
    } else if (tabName === 'analytics') {
        loadAnalytics();
    }
}

// ==================== PRODUCTS CRUD ====================
function openProductModal() {
    document.getElementById('productFormSection').classList.remove('hidden');
    document.getElementById('productForm').reset();
    document.getElementById('productForm').removeAttribute('data-product-id');
}


function closeProductForm() {
    document.getElementById('productFormSection').classList.add('hidden');
}

async function handleProductSubmit(event) {
    event.preventDefault();

    const productId = document.getElementById('productForm').dataset.productId;

    const product = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value
    };

    let url = 'http://localhost:8080/api/addProduct';
    let method = 'POST';

    if (productId) {
        url = `http://localhost:8080/api/updateProduct/${productId}`;
        method = 'PATCH';
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        showNotification(productId ? 'Product updated successfully!' : 'Product added successfully!');
        closeProductForm();
        document.getElementById('productForm').removeAttribute('data-product-id');
        loadProductsTable();
    } else {
        showNotification(productId ? 'Product update failed!' : 'Product adding failed!');
    }
}



async function loadProductsTable() {
    const response = await fetch('http://localhost:8080/api/getAllProducts');
    const products = await response.json();

    productList = products;

    const tbody = document.getElementById('productsTableBody');

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>LKR ${product.price.toFixed(2)}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}


function editProduct(productId) {
    const product = productList.find(p => p.id === productId);

    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;

        document.getElementById('productForm').dataset.productId = productId;
        document.getElementById('productFormSection').classList.remove('hidden');
    }
}


async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const response = await fetch(`http://localhost:8080/api/deleteById/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Product deleted successfully!');
            loadProductsTable();
        } else {
            showNotification('Product delete failed!');
        }
    }
}


// ==================== ORDERS ====================
function loadOrdersTable() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const tbody = document.getElementById('ordersTableBody');

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>Customer #${order.id.substr(-4)}</td>
            <td>${order.items.length}</td>
            <td>LKR ${order.total.toFixed(2)}</td>
            <td>
                <select onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${order.date}</td>
            <td>
                <button class="edit-btn" onclick="viewOrderDetails('${order.id}')">View</button>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(orderId, status) {
    let orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        showNotification('Order status updated!');
    }
}

function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        const itemsList = order.items.map(item => `
            <li>${item.name} x${item.quantity} = LKR ${(item.price * item.quantity).toFixed(2)}</li>
        `).join('');

        const modal = document.getElementById('actionModal');
        modal.querySelector('#actionModalBody').innerHTML = `
            <h3>Order ${order.id}</h3>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Items:</strong></p>
            <ul>${itemsList}</ul>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        `;
        modal.classList.add('active');
    }
}

// ==================== CUSTOMERS ====================
function loadCustomersTable() {
    // Generate sample customers from orders
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const tbody = document.getElementById('customersTableBody');

    // Create unique customers
    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 125.50 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 87.75 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 8, spent: 245.30 }
    ];

    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>#${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.orders}</td>
            <td>$${customer.spent.toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="viewCustomerDetails(${customer.id})">View</button>
            </td>
        </tr>
    `).join('');
}

function viewCustomerDetails(customerId) {
    const modal = document.getElementById('actionModal');
    modal.querySelector('#actionModalBody').innerHTML = `
        <h3>Customer #${customerId}</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Total Orders:</strong> 5</p>
        <p><strong>Total Spent:</strong> $125.50</p>
        <p><strong>Member Since:</strong> Jan 2024</p>
    `;
    modal.classList.add('active');
}

// ==================== ANALYTICS ====================
function loadAnalytics() {
    // Initialize charts with sample data
    const ctx1 = document.getElementById('categoryChart');
    const ctx2 = document.getElementById('revenueChart');

    // Create simple bar charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Vegetables', 'Fruits', 'Dairy', 'Beverages'],
                datasets: [{
                    label: 'Sales by Category',
                    data: [2500, 1800, 1200, 900],
                    backgroundColor: ['#ff6b35', '#f7931e', '#4caf50', '#2196F3']
                }]
            }
        });

        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Revenue',
                    data: [3000, 4500, 3800, 5200, 6100, 7500],
                    borderColor: '#ff6b35',
                    fill: false
                }]
            }
        });
    }
}

// ==================== UTILITIES ====================
function closeActionModal() {
    document.getElementById('actionModal').classList.remove('active');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 300;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const defaultTab = 'dashboard';
    document.getElementById(defaultTab + 'Tab').classList.add('active');
    document.querySelector('.sidebar-btn').classList.add('active');

    // Close modal on outside click
    window.onclick = function(event) {
        const modal = document.getElementById('actionModal');
        if (event.target === modal) {
            closeActionModal();
        }
    }
});
