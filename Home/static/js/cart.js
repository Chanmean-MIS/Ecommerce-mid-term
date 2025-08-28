document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalItemsEl = document.getElementById("total-items");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  // Load cart from localStorage, or empty object if not present
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Save cart back to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render the cart table
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = `<tr><td colspan="7" style="text-align:center;">Your cart is empty.</td></tr>`;
      updateTotals();
      return;
    }

    for (const id in cart) {
      const item = cart[id];

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" class="select-item" data-id="${id}" checked></td>
        <td><img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button class="qty-minus" data-id="${id}">-</button>
          <span>${item.qty}</span>
          <button class="qty-plus" data-id="${id}">+</button>
        </td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td><button class="remove" data-id="${id}">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
    }

    updateTotals();
    attachCartButtons();
  }

  // Update totals based on selected items
  function updateTotals() {
    const checkboxes = document.querySelectorAll(".select-item");
    let subtotal = 0;
    let totalItems = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) {
        const id = cb.dataset.id;
        const item = cart[id];
        subtotal += item.price * item.qty;
        totalItems += item.qty;
      }
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    totalItemsEl.innerText = totalItems;
    subtotalEl.innerText = subtotal.toFixed(2);
    taxEl.innerText = tax.toFixed(2);
    totalEl.innerText = total.toFixed(2);
  }

  // Attach + / - / remove button events
  function attachCartButtons() {
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        cart[id].qty += 1;
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (cart[id].qty > 1) cart[id].qty -= 1;
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        delete cart[id];
        saveCart();
        renderCart();
      });
    });
  }

  // Update totals when checkbox changes
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("select-item")) {
      updateTotals();
    }
  });

  // Proceed to Checkout button
  document.querySelector(".checkout").addEventListener("click", (e) => {
    e.preventDefault();
    const selected = [];

    document.querySelectorAll(".select-item:checked").forEach(cb => {
      const id = cb.dataset.id;
      // include id in the object
      selected.push({
        id: id,
        name: cart[id].name,
        price: cart[id].price,
        qty: cart[id].qty,
        image: cart[id].image
      });
    });

    if (selected.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(selected));
    // redirect to checkout page
    window.location.href = e.target.href;
  });




  // Initial render
  renderCart();
});
