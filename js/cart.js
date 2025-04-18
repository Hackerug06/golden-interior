// Cart functionality
let cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');
const totalAmount = document.querySelector('.total-amount');

// Toggle cart
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Add to cart
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
    
    // Remove item from cart
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
    
    // Update quantity
    if (e.target.classList.contains('quantity-btn')) {
        const productId = parseInt(e.target.parentElement.getAttribute('data-id'));
        const isIncrease = e.target.classList.contains('increase');
        updateQuantity(productId, isIncrease);
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartAlert(product.title);
}

function showAddToCartAlert(productName) {
    const alert = document.createElement('div');
    alert.className = 'cart-alert';
    alert.innerHTML = `${productName} added to cart!`;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 2000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, isIncrease) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity = Math.max(1, item.quantity - 1);
        }
    }
    
    updateCart();
}

function updateCart() {
    // Save cart to localStorage
    localStorage.setItem('goldenInteriorCart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalAmount.textContent = 'UGX 0';
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">UGX ${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity" data-id="${item.id}">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                        <button class="quantity-btn increase">+</button>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        totalAmount.textContent = `UGX ${total.toLocaleString()}`;
    }
}

// Checkout via WhatsApp
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = 'Hello Golden Interior, I would like to order the following items:\n\n';
    
    cart.forEach(item => {
        message += `- ${item.title} (${item.quantity} x UGX ${item.price.toLocaleString()})\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: UGX ${total.toLocaleString()}\n\nMy contact information:\nName: \nPhone: \nDelivery Address: `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/25681245888?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('goldenInteriorCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});

// Add some CSS for the add to cart alert
const cartAlertStyle = document.createElement('style');
cartAlertStyle.textContent = `
    .cart-alert {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1100;
    }
    
    .cart-alert.show {
        opacity: 1;
    }
`;
document.head.appendChild(cartAlertStyle);
