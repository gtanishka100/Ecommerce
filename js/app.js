
// Countdown Timer
function startCountdown(endDate) {
    var countDownDate = new Date(endDate).getTime();
  
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
  
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("demo").innerHTML = 
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
  
  // Start the countdown
  startCountdown("September 15, 2024 15:37:25");
  
  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  // Display Products
  const displayProducts = (products) => {
    const productContainer = document.querySelector('.swiper-wrapper');
    const viewAllContainer = document.querySelector('.view-all-container');
    
    // Always display the first 4 products (or all if less than 4)
    const displayedProducts = products.slice(0, 4);
    
    productContainer.innerHTML = displayedProducts.map(product => `
      <div class="swiper-slide">
        <div class="card">
        <a href="product-detail.html?id=${product.id}" class="product-link">
          <div class="card_top">
            <img src="${product.image}" alt="${product.title}" class="card_img" />
            <div class="card_tag">-${Math.floor(Math.random() * 50 + 10)}%</div>
            <div class="card_top_icons">
              <!-- Add icons here -->
            </div>
          </div>
          <div class="card_body">
            <h3 class="card_title">${product.title}</h3>
            <p class="card_price">$${product.price.toFixed(2)}</p>
            <div class="card_ratings">
              <div class="card_stars">
                <!-- Add star icons here -->
              </div>
              <p class="card_rating_numbers">(${Math.floor(Math.random() * 500)}+ Reviews)</p>
            </div>
            </a>
            <button
              class="add_to_cart"
              data-id="${product.id}"
              data-title="${product.title}"
              data-image="${product.image}"
              data-price="${product.price}"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  
    // Show "View All Products" button if there are more than 4 products
    if (products.length > 4) {
      viewAllContainer.style.display = 'block';
    } else {
      viewAllContainer.style.display = 'none';
    }
  
    // Initialize Swiper after adding slides
    initSwiper();
  
    // Store all products in localStorage for use in all-products page
    localStorage.setItem('allProducts', JSON.stringify(products));
  };
  
  
  // Initialize Swiper
  function initSwiper() {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
    });
  }
  
  // Fetch and display products
  fetchProducts().then(products => displayProducts(products));
  
  
  
  // Animations
  document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().reveal(".top_nav", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
    });
    ScrollReveal().reveal(".nav", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      delay: 100,
    });
    ScrollReveal().reveal(".header", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      delay: 200,
    });
    ScrollReveal().reveal(".section", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      duration: 1000,
      delay: 100,
    });
    ScrollReveal().reveal(".footer", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      duration: 1000,
      delay: 100,
    });
  });
  
  // Mobile nav
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const Nav = document.querySelector(".mobile_nav");
  
    if (hamburger && Nav) {
      hamburger.addEventListener("click", () => {
        Nav.classList.toggle("mobile_nav_hide");
      });
    }
  });
  
  // Add to Cart functionality
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add_to_cart')) {
      const button = e.target;
      const id = button.getAttribute("data-id");
      const title = button.getAttribute("data-title");
      const image = button.getAttribute("data-image");
      const price = button.getAttribute("data-price");
  
      const cartItem = { id, title, image, price };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      alert('Item added to cart!');
    }
  });
  
  
  // star generator 
  
  function generateRandomRating(maxStars = 5) {
    // Generate a random number between 0 and maxStars, with one decimal place
    return Math.round(Math.random() * maxStars * 10) / 10;
  }
  
  function generateStars(container, maxStars = 5) {
    const rating = generateRandomRating(maxStars);
    const starSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star-icon">
        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"/>
      </svg>
    `;
  
    for (let i = 1; i <= maxStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.innerHTML = starSVG;
      
      if (i <= rating) {
        star.classList.add('full');
      } else if (i - 0.5 <= rating) {
        star.classList.add('half');
      } else {
        star.classList.add('empty');
      }
      
      container.appendChild(star);
    }
  
    // Update the rating text
    const ratingText = container.nextElementSibling;
    if (ratingText && ratingText.classList.contains('card_rating_numbers')) {
      ratingText.textContent = `${rating.toFixed(1)} (${Math.floor(Math.random() * 100) + 1}+ Reviews)`;
    }
  }
  
  // Usage
  document.addEventListener('DOMContentLoaded', () => {
    const starsContainers = document.querySelectorAll('.card_stars');
    starsContainers.forEach(container => {
      generateStars(container, 5); // 5 is the maximum number of stars
    });
  });