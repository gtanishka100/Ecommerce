const CartItems = document.querySelector(".cart-items");
let cartTotal = 0;

function displayCartItems() {
  CartItems.innerHTML = ''; // Clear existing items
  cartTotal = 0; // Reset cart total
  const items = JSON.parse(localStorage.getItem("cart")) || [];

  if (items.length === 0) {
    CartItems.innerHTML = '<p>Your cart is empty</p>';
    updateCartTotal();
    return;
  }

  items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">$${parseFloat(item.price).toFixed(2)}</p>
      <button class="cart_delete" data-index="${index}">Delete</button>
    `;
    CartItems.appendChild(cartItem);

    // Add to cart total
    cartTotal += parseFloat(item.price);
  });

  updateCartTotal();
  addDeleteListeners();
}

function updateCartTotal() {
  const totalElement = document.createElement('div');
  totalElement.className = 'cart_total';
  totalElement.innerHTML = `<strong>Total: $${cartTotal.toFixed(2)}</strong>`;
  CartItems.appendChild(totalElement);
}

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.cart_delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteCartItem);
  });
}

function deleteCartItem(event) {
  const index = event.target.getAttribute('data-index');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Remove the item at the specified index
  cart.splice(index, 1);
  
  // Update localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Re-display the cart items
  displayCartItems();
}

displayCartItems();