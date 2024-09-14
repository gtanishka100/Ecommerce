document.addEventListener('DOMContentLoaded', () => {
    const allProductsGrid = document.getElementById('all-products-grid');
    
    // Retrieve all products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

    // Display all products
    allProductsGrid.innerHTML = allProducts.map(product => `
        <div class="product-card">
           <a href="product-detail.html?id=${product.id}" class="product-link">
            <img src="${product.image}" alt="${product.title}" class="product-img" />
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
           </a>
            <button
                class="add_to_cart_product"
                data-id="${product.id}"
                data-title="${product.title}"
                data-image="${product.image}"
                data-price="${product.price}"
            >
                Add to Cart
            </button>
        </div>
    `).join('');

    // Add to Cart functionality
    allProductsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add_to_cart_product')) {
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
});