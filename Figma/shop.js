
// Product data
const products = [
  {
    id: '1',
    title: 'Calabrese Broccoli',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c',
    category: 'Vegetable',
    price: 13.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 0
  },
  {
    id: '2',
    title: 'Fresh Banana Fruites',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
    category: 'Fresh',
    price: 14.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 5
  },
  {
    id: '3',
    title: 'White Nuts',
    image: 'https://images.unsplash.com/photo-1544510807-78268e067c70',
    category: 'Millets',
    price: 15.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 0
  },
  {
    id: '4',
    title: 'Vegan Red Tomato',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    category: 'Vegetable',
    price: 17.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 10
  },
  {
    id: '5',
    title: 'Mung Bean',
    image: './images/1 (3).png',
    category: 'Health',
    price: 11.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 0
  },
  {
    id: '6',
    title: 'Brown Hazelnut',
    image: './images/2 (4).png',
    category: 'Nuts',
    price: 12.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 8
  },
  {
    id: '7',
    title: 'Eggs',
    image: './images/3 (3).png',
    category: 'Fresh',
    price: 17.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 0
  },
  {
    id: '8',
    title: 'Zelco Suji Elaichi Rusk',
    image: './images/4 (3).png',
    category: 'Fresh',
    price: 15.00,
    oldPrice: 20.00,
    rating: 5,
    discount: 3
  }
];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const noProductsMessage = document.getElementById('no-products-message');
const searchInput = document.getElementById('product-search');
const categoryButtons = document.querySelectorAll('.category-button');
const cartCounter = document.querySelector('.cart-count');

// State
let activeCategory = 'all';
let searchTerm = '';
let cart = [];

// Load cart from localStorage if available
function loadCart() {
  const savedCart = localStorage.getItem('organickCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCounter();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('organickCart', JSON.stringify(cart));
  updateCartCounter();
}

// Update cart counter in navbar
function updateCartCounter() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(counter => {
    counter.textContent = totalItems;
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      discount: product.discount
    });
  }
  
  // Show notification
  showNotification(`${product.title} added to cart`);
  
  // Save cart and update counter
  saveCart();
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load cart from localStorage
  loadCart();
  
  // Initial render
  renderProducts();
  
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderProducts();
  });
  
  // Category filtering
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active category
      activeCategory = button.getAttribute('data-category');
      
      // Update active class
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Re-render products
      renderProducts();
    });
  });
  
  // Cart link event listener
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'bill.html';
    });
  });
});

// Render products based on current filters
function renderProducts() {
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || 
                          product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Clear products grid
  productsGrid.innerHTML = '';
  
  // Show/hide no products message
  if (filteredProducts.length === 0) {
    noProductsMessage.style.display = 'block';
  } else {
    noProductsMessage.style.display = 'none';
    
    // Render product cards
    filteredProducts.forEach(product => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });
  }
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  // Generate star rating HTML
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    const starClass = i < product.rating ? 'fa-solid' : 'fa-regular';
    starsHtml += `<i class="${starClass} fa-star"></i>`;
  }
  
  // Generate discount badge HTML if there's a discount
  let discountHtml = '';
  if (product.discount > 0) {
    discountHtml = `<span class="product-discount">-${product.discount}%</span>`;
  }
  
  card.innerHTML = `
    <div class="product-image-container">
      <span class="product-category">${product.category}</span>
      ${discountHtml}
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <button class="add-to-cart-btn" data-id="${product.id}">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
    <div class="product-content">
      <h3 class="product-title">
        <a href="product-single.html?id=${product.id}">${product.title}</a>
      </h3>
      <div class="product-meta">
        <div class="product-price">
          <span class="price-old">$${product.oldPrice.toFixed(2)}</span>
          <span class="price-current">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-rating">
          ${starsHtml}
        </div>
      </div>
    </div>
  `;
  
  // Add event listener to the add to cart button
  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product.id);
  });
  
  return card;
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  mobileDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function() {
      const dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle('active');
    });
  });
});
