// Shopping Cart functionality for Al-Khorasani Store

// Cart data structure
let cart = JSON.parse(localStorage.getItem('alkhorasani_cart')) || [];

// Product data
const products = {
    1: {
        id: 1,
        name: 'قهوة خولانية فاخرة',
        price: 2500,
        unit: 'للكيلو',
        image: 'images/products/yemeni_coffee.png',
        description: 'من أجود أنواع القهوة في العالم، محمصة بالطريقة التقليدية'
    },
    2: {
        id: 2,
        name: 'عسل سدر دوعني أصلي',
        price: 8000,
        unit: 'للكيلو',
        image: 'images/products/yemeni_honey.png',
        description: 'من أفضل أنواع العسل في العالم، طبيعي 100%'
    },
    3: {
        id: 3,
        name: 'خاتم فضة بالعقيق الأصلي',
        price: 15000,
        unit: 'للقطعة',
        image: 'images/products/silver_ring.jpg',
        description: 'صناعة يدوية تراثية بأحجار العقيق اليمني الأصلي'
    },
    4: {
        id: 4,
        name: 'ثوب يمني تراثي',
        price: 12000,
        unit: 'للقطعة',
        image: 'images/products/traditional_clothing.jpg',
        description: 'ثوب رجالي فاخر بقماش عالي الجودة وتطريز يدوي'
    }
};

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initCartButtons();
    updateCartCount();
    
    // If we're on the cart page, render the cart
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

// Initialize add to cart buttons
function initCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        showNotification('المنتج غير موجود', 'error');
        return;
    }
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`تم زيادة كمية ${product.name}`, 'success');
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            description: product.description,
            quantity: 1
        });
        showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
    }
    
    saveCart();
    updateCartCount();
    
    // Add animation to cart icon
    animateCartIcon();
}

// Remove product from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        showNotification(`تم حذف ${item.name} من السلة`, 'success');
        cart.splice(itemIndex, 1);
        saveCart();
        updateCartCount();
        
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            
            if (window.location.pathname.includes('cart.html')) {
                renderCart();
            }
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('alkhorasani_cart', JSON.stringify(cart));
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Add animation if count changed
        if (totalItems > 0) {
            cartCountElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Animate cart icon when item is added
function animateCartIcon() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.style.transform = 'scale(1.1)';
        cartLink.style.color = '#D4AF37';
        
        setTimeout(() => {
            cartLink.style.transform = 'scale(1)';
            cartLink.style.color = '';
        }, 300);
    }
}

// Render cart page
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        cartContainer.innerHTML = '';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    // Render cart items
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-price">
                    <span class="price">${item.price.toLocaleString()} ريال</span>
                    <span class="unit">${item.unit}</span>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">
                    ${(item.price * item.quantity).toLocaleString()} ريال
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = `${total.toLocaleString()} ريال`;
    }
    
    // Update other total displays
    const totalElements = document.querySelectorAll('.total-amount');
    totalElements.forEach(el => {
        el.textContent = `${total.toLocaleString()} ريال`;
    });
}

// Clear entire cart
function clearCart() {
    if (confirm('هل أنت متأكد من حذف جميع المنتجات من السلة؟')) {
        cart = [];
        saveCart();
        updateCartCount();
        
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
        
        showNotification('تم حذف جميع المنتجات من السلة', 'success');
    }
}

// Checkout process
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة، يرجى إضافة منتجات أولاً', 'error');
        return;
    }
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('alkhorasani_user');
    
    if (!isLoggedIn) {
        if (confirm('يجب تسجيل الدخول أولاً لإتمام عملية الشراء. هل تريد الانتقال لصفحة تسجيل الدخول؟')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Simulate checkout process
    showNotification('جاري معالجة طلبك...', 'success');
    
    setTimeout(() => {
        showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
    }, 2000);
}

// Apply discount code
function applyDiscount() {
    const discountInput = document.getElementById('discount-code');
    if (!discountInput) return;
    
    const code = discountInput.value.trim().toUpperCase();
    const validCodes = {
        'WELCOME20': 0.2,
        'HONEY15': 0.15,
        'COFFEE10': 0.1
    };
    
    if (validCodes[code]) {
        const discount = validCodes[code];
        showNotification(`تم تطبيق خصم ${discount * 100}%`, 'success');
        
        // Apply discount to total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;
        
        // Update display
        const totalElements = document.querySelectorAll('.total-amount');
        totalElements.forEach(el => {
            el.innerHTML = `
                <div class="original-total">${total.toLocaleString()} ريال</div>
                <div class="discount">خصم: -${discountAmount.toLocaleString()} ريال</div>
                <div class="final-total">${finalTotal.toLocaleString()} ريال</div>
            `;
        });
        
        discountInput.disabled = true;
    } else {
        showNotification('كود الخصم غير صحيح', 'error');
    }
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
window.applyDiscount = applyDiscount;

