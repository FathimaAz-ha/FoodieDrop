// ==================== CHECKOUT PAGE FUNCTIONS ====================

function loadCheckoutSummary() {
    const cart = getCart();
    const container = document.getElementById('summaryItems');

    if (cart.length > 0) {
        container.innerHTML = cart.map(item => `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('');
    }

    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const tax = calculateTax(subtotal);
    const delivery = 2.00;
    const total = subtotal + tax + delivery;

    document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
    document.getElementById('summaryTax').textContent = formatPrice(tax);
    document.getElementById('summaryDelivery').textContent = formatPrice(delivery);
    document.getElementById('summaryTotal').textContent = formatPrice(total);
}

function handleCheckout(event) {
    event.preventDefault();
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    // Simulate order processing
    const formData = new FormData(event.target);
    const order = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: cart,
        subtotal: getCartTotal(),
        tax: calculateTax(getCartTotal()),
        delivery: 2.00,
        total: getTotalWithTax(),
        date: new Date().toLocaleDateString(),
        status: 'Pending',
        timestamp: new Date().getTime()
    };

    // Save order to localStorage
    let orders = localStorage.getItem('foodiedrop_orders');
    orders = orders ? JSON.parse(orders) : [];
    orders.push(order);
    localStorage.setItem('foodiedrop_orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem(STORAGE_KEYS.CART);

    // Show success message and redirect
    showNotification('Order placed successfully!');
    setTimeout(() => {
        window.location.href = 'profile.html?tab=orders';
    }, 2000);
}

// ==================== STORAGE FUNCTIONS ====================
const STORAGE_KEYS = {
    PRODUCTS: 'foodiedrop_products',
    CART: 'foodiedrop_cart',
    USER: 'foodiedrop_user'
};

function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTax(subtotal) {
    return subtotal * 0.1;
}

function getTotalWithTax() {
    const subtotal = getCartTotal();
    const tax = calculateTax(subtotal);
    const delivery = 2.00;
    return subtotal + tax + delivery;
}

function formatPrice(price) {
    return 'LKR ' + price.toFixed(2);
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

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutSummary();
    updateCartCount();
});
