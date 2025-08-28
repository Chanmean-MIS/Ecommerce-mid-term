// ====== Cart setup ======
let cart = {};
let cartCount = 0;

// ====== Load cart from localStorage ======
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));

  // Count unique products
  cartCount = Object.keys(cart).length;
}

// ====== Update cart count in header ======
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = `(${cartCount})`;
  }
}

// ====== Save cart to localStorage ======
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== Initialize Add to Cart buttons ======
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ main.js loaded");

  updateCartCount(); // show count on page load

  const buttons = document.querySelectorAll(".add-to-cart");
  console.log("Found Add to Cart buttons:", buttons.length);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      if (!product) return;

      const id = product.getAttribute("data-id");
      const name = product.querySelector(".name")?.innerText || "Unknown";
      const price = parseFloat(product.getAttribute("data-price"));

      const image = product.querySelector("img")?.src || '';
      if (cart[id]) {
        cart[id].qty += 1; // increase quantity
      } else {
        cart[id] = { name: name, price: price, qty: 1, image };
        cartCount++;
      }

      updateCartCount();
      saveCart(); // persist cart
      console.log("🛒 Cart:", cart);
    });
  });
});


