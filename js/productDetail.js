// Fetch product data from localStorage (or API)
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    const products = JSON.parse(localStorage.getItem('allProducts')) || [];
  
    const selectedProduct = products.find(product => product.id === parseInt(productId));
  
    if (selectedProduct) {
      document.getElementById('product-title').textContent = selectedProduct.title;
      document.getElementById('product-description').textContent = selectedProduct.description;
      document.getElementById('product-price').textContent = selectedProduct.price.toFixed(2);
      document.getElementById('product-image').src = selectedProduct.image;
      document.getElementById('add-to-cart-btn').setAttribute('data-id', selectedProduct.id);
    }
  
    // Add to cart functionality
    document.getElementById('add-to-cart-btn').addEventListener('click', function () {
      const cartItem = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        image: selectedProduct.image,
        price: selectedProduct.price
      };
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert('Item added to cart!');
    });
  });
  