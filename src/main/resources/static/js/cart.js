// ==================== CART PAGE FUNCTIONS ====================

function loadCart() {
    const cart = getCart();
    const container = document.getElementById('cartItemsList');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        container.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        container.style.display = 'block';
        
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <button onclick="decreaseCartItem(${item.id})">-</button>
                        <input type="number" value="${item.quantity}" 
                               onchange="updateCartItemQuantity(${item.id}, this.value)" 
                               min="1">
                        <button onclick="increaseCartItem(${item.id})">+</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="margin-bottom: 1rem; font-weight: bold;">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                    <span class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    updateCartSummary();
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    loadCart();
    showNotification('Product removed from cart');
}

function increaseCartItem(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        saveCart(cart);
        loadCart();
    }
}

function decreaseCartItem(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart(cart);
        loadCart();
    }
}

function updateCartItemQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        const newQuantity = parseInt(quantity);
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }
    loadCart();
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const tax = calculateTax(subtotal);
    const delivery = 2.00;
    const total = subtotal + tax + delivery;

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('delivery').textContent = formatPrice(delivery);
    document.getElementById('total').textContent = formatPrice(total);
}

function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
    } else {
        window.location.href = 'checkout.html';
    }
}

// ==================== STORAGE FUNCTIONS (from app.js) ====================
const STORAGE_KEYS = {
    PRODUCTS: 'foodiedrop_products',
    CART: 'foodiedrop_cart',
    USER: 'foodiedrop_user'
};

function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function formatPrice(price) {
    return 'LKR ' + price.toFixed(2);
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTax(subtotal) {
    return subtotal * 0.1;
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

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
});
