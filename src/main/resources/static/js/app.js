// ==================== LOCAL STORAGE FUNCTIONS ====================
const STORAGE_KEYS = {
    PRODUCTS: 'foodiedrop_products',
    CART: 'foodiedrop_cart',
    USER: 'foodiedrop_user'
};

// Initialize sample products
function initializeProducts() {
    const existingProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!existingProducts) {
        const sampleProducts = [
            {
                id: 1,
                name: 'Fresh Tomatoes',
                category: 'vegetables',
                price: 450,
                description: 'Organic, farm-fresh tomatoes',
                image: 'https://images.unsplash.com/photo-1592924357228-91ec8b1d3160?auto=format&fit=crop&w=900&q=80',
                stock: 50
            },
            {
                id: 2,
                name: 'Red Apples',
                category: 'fruits',
                price: 550,
                description: 'Sweet and crispy red apples',
                image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=80',
                stock: 40
            },
            {
                id: 3,
                name: 'Fresh Milk',
                category: 'dairy',
                price: 350,
                description: 'Pure, pasteurized whole milk',
                image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80',
                stock: 30
            },
            {
                id: 4,
                name: 'Orange Juice',
                category: 'beverages',
                price: 400,
                description: 'Fresh squeezed orange juice',
                image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
                stock: 25
            },
            {
                id: 5,
                name: 'Carrots',
                category: 'vegetables',
                price: 300,
                description: 'Crunchy, sweet carrots',
                image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80',
                stock: 60
            },
            {
                id: 6,
                name: 'Bananas',
                category: 'fruits',
                price: 250,
                description: 'Ripe and ready to eat bananas',
                image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
                stock: 75
            },
            {
                id: 7,
                name: 'Yogurt',
                category: 'dairy',
                price: 450,
                description: 'Creamy Greek yogurt',
                image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
                stock: 35
            },
            {
                id: 8,
                name: 'Coffee',
                category: 'beverages',
                price: 650,
                description: 'Premium arabica coffee beans',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
                stock: 20
            }
        ];
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(sampleProducts));
    }
}

function getProducts() {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
}

function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCount();
}

// ==================== PRODUCT DISPLAY ====================
async function displayProducts(filter = 'all') {
    const response = await fetch('http://localhost:8080/api/getAllProducts');
    const products = await response.json();

    const container = document.getElementById('productsGrid');

    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">LKR ${product.price.toFixed(2)}</span>
                    <button class="product-btn" onclick="event.stopPropagation(); addToCartDirect('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// ==================== FILTER FUNCTIONALITY ====================
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayProducts(category);
}


// ==================== MODAL FUNCTIONS ====================
let currentProductId = null;

function openProductModal(productId) {
    currentProductId = productId;
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.name;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPrice').textContent = 'LKR ' + product.price.toFixed(2);
        document.getElementById('quantity').value = 1;
        document.getElementById('productModal').classList.add('active');
    }
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    currentProductId = null;
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    addProductToCart(currentProductId, quantity);
    closeModal();
}

function addToCartDirect(productId, quantity = 1) {
    addProductToCart(productId, quantity);
}

function addProductToCart(productId, quantity) {
    const products = getProducts();
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        saveCart(cart);
        showNotification('Product added to cart!');
    }
}

// ==================== CART COUNT ====================
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// ==================== NOTIFICATIONS ====================
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
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== FORM HANDLERS ====================
function handleContactSubmit(event) {
    event.preventDefault();
    showNotification('Thank you! We will get back to you soon.');
    event.target.reset();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    displayProducts();
    updateCartCount();

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('productModal');
        if (event.target === modal) {
            closeModal();
        }
    }
});

// ==================== UTILITY FUNCTIONS ====================
// Format price
function formatPrice(price) {
    return 'LKR ' + price.toFixed(2);
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate tax
function calculateTax(subtotal) {
    return subtotal * 0.1; // 10% tax
}

// Get total with tax and delivery
function getTotalWithTax() {
    const subtotal = getCartTotal();
    const tax = calculateTax(subtotal);
    const delivery = 2.00;
    return subtotal + tax + delivery;
}
