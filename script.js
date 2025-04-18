// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sample product data
const products = [
    {
        id: 1,
        title: "Luxury Velvet Sofa",
        category: "sofa",
        price: 2500000,
        image: "images/products/sofa1.jpg",
        description: "Premium velvet sofa with wooden legs, perfect for your living room."
    },
    {
        id: 2,
        title: "Modern Dining Chair",
        category: "chair",
        price: 450000,
        image: "images/products/chair1.jpg",
        description: "Elegant dining chair with comfortable cushion and sturdy frame."
    },
    {
        id: 3,
        title: "Coffee Table",
        category: "table",
        price: 1200000,
        image: "images/products/table1.jpg",
        description: "Solid wood coffee table with glass top, perfect for your lounge."
    },
    {
        id: 4,
        title: "King Size Bed",
        category: "bed",
        price: 3500000,
        image: "images/products/bed1.jpg",
        description: "Luxurious king size bed with upholstered headboard."
    },
    {
        id: 5,
        title: "Leather Recliner",
        category: "chair",
        price: 1800000,
        image: "images/products/chair2.jpg",
        description: "Premium leather recliner chair for ultimate comfort."
    },
    {
        id: 6,
        title: "Sectional Sofa",
        category: "sofa",
        price: 4200000,
        image: "images/products/sofa2.jpg",
        description: "Modular sectional sofa that can be configured to fit your space."
    },
    {
        id: 7,
        title: "Dining Table Set",
        category: "table",
        price: 3800000,
        image: "images/products/table2.jpg",
        description: "6-seater dining table with matching chairs, perfect for family meals."
    },
    {
        id: 8,
        title: "Queen Size Bed",
        category: "bed",
        price: 2800000,
        image: "images/products/bed2.jpg",
        description: "Elegant queen size bed with storage drawers underneath."
    }
];

// Display products
const productGrid = document.querySelector('.product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' ? 
        products : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">UGX ${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details">View Details</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Filter products
        displayProducts(button.dataset.filter);
    });
});

// Initialize with all products
displayProducts();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('messageForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}!`);
    this.reset();
});
