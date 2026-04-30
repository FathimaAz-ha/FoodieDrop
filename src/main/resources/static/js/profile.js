// ==================== USER PROFILE FUNCTIONS ====================

const STORAGE_KEYS = {
    USER: 'foodiedrop_user',
    ORDERS: 'foodiedrop_orders',
    ADDRESSES: 'foodiedrop_addresses'
};

// ==================== TAB SWITCHING ====================
function switchProfileTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.profile-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');

    // Load data for the tab
    if (tabName === 'account') {
        loadAccountInfo();
    } else if (tabName === 'orders') {
        loadOrderHistory();
    } else if (tabName === 'addresses') {
        loadAddresses();
    }
}

// ==================== ACCOUNT MANAGEMENT ====================
function loadAccountInfo() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900',
        dob: '1990-01-15'
    };

    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('dob').value = user.dob;

    // Update header info
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('userEmail').textContent = user.email;
}

function handleAccountUpdate(event) {
    event.preventDefault();

    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    showNotification('Profile updated successfully!');
    loadAccountInfo();
}

function handlePasswordChange(event) {
    event.preventDefault();
    showNotification('Password changed successfully!');
    event.target.reset();
}

// ==================== ORDER HISTORY ====================
function loadOrderHistory() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const container = document.getElementById('ordersList');

    if (orders.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: #999; padding: 2rem;">
                No orders yet. <a href="index.html#products" style="color: #ff6b35;">Start shopping!</a>
            </p>
        `;
    } else {
        container.innerHTML = orders.map(order => `
            <div class="order-card">
                <h4>Order ${order.id}</h4>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Items:</strong> ${order.items.length} items</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <div style="margin-top: 0.5rem;">
                    <span class="order-status ${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </div>
            </div>
        `).join('');
    }
}

// ==================== ADDRESSES ====================
function openAddressForm() {
    document.getElementById('addressFormSection').classList.remove('hidden');
}

function closeAddressForm() {
    document.getElementById('addressFormSection').classList.add('hidden');
}

function handleAddressSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const address = {
        id: Date.now(),
        label: form.querySelector('input[placeholder="Home"]').value,
        street: form.querySelector('input[placeholder="Street Address"]').value,
        city: form.querySelector('input[placeholder="City"]').value,
        postal: form.querySelector('input[placeholder="Postal Code"]').value,
        country: form.querySelector('input[placeholder="Country"]').value
    };

    let addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
    addresses.push(address);
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));

    showNotification('Address added successfully!');
    closeAddressForm();
    form.reset();
    loadAddresses();
}

function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
    const container = document.getElementById('addressesList');

    if (addresses.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: #999; padding: 2rem;">
                No addresses saved yet.
            </p>
        `;
    } else {
        container.innerHTML = addresses.map(address => `
            <div class="address-card">
                <h4>${address.label}</h4>
                <p>${address.street}</p>
                <p>${address.city}, ${address.postal}</p>
                <p>${address.country}</p>
                <div class="address-actions">
                    <button class="edit-btn" onclick="editAddress(${address.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteAddress(${address.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function deleteAddress(addressId) {
    if (confirm('Are you sure you want to delete this address?')) {
        let addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
        addresses = addresses.filter(addr => addr.id !== addressId);
        localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
        showNotification('Address deleted successfully!');
        loadAddresses();
    }
}

function editAddress(addressId) {
    // Placeholder for edit functionality
    showNotification('Edit address feature coming soon!');
}

// ==================== UTILITIES ====================
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

function handleDeleteAccount() {
    if (confirm('Are you sure? This action cannot be undone. All your data will be permanently deleted.')) {
        if (confirm('This is your last warning. Delete your account?')) {
            localStorage.removeItem(STORAGE_KEYS.USER);
            localStorage.removeItem(STORAGE_KEYS.ORDERS);
            localStorage.removeItem(STORAGE_KEYS.ADDRESSES);
            showNotification('Account deleted successfully!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

function updateCartCount() {
    const cart = localStorage.getItem('foodiedrop_cart');
    const cartData = cart ? JSON.parse(cart) : [];
    const count = cartData.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadAccountInfo();
    updateCartCount();

    // Set default tab
    const defaultTab = 'account';
    document.getElementById(defaultTab + 'Tab').classList.add('active');
    document.querySelector('.profile-btn').classList.add('active');
});
