document.addEventListener("DOMContentLoaded", () => {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  // Load selected products from localStorage
  const selectedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  let subtotal = 0;

  selectedItems.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" width="50"></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>$${(item.price * item.qty).toFixed(2)}</td>
    `;
    checkoutItemsContainer.appendChild(row);

    subtotal += item.price * item.qty;
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  subtotalEl.innerText = subtotal.toFixed(2);
  taxEl.innerText = tax.toFixed(2);
  totalEl.innerText = total.toFixed(2);

  // Confirm Order
  document.getElementById("confirm-order").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const selectedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

    // Remove only the selected items from cart
    selectedItems.forEach(item => {
      if (item.id && cart[item.id]) {
        delete cart[item.id];
      }
    });

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.removeItem("checkoutItems");

    alert("Order placed successfully!");
    window.location.href = "/shop/"; // redirect
  });


});
