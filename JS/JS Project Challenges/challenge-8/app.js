const products = document.querySelector(".products");
const cartItems = document.querySelector("#cart-items");
const emptyCart = document.querySelector(".empty-cart");

function updateTotalPrice() {
  const prices = document.querySelectorAll("#cart-items .price");
  let totalPrice = 0;
  prices.forEach((price) => {
    totalPrice += parseFloat(price.textContent.slice(1));
  });
  document.querySelector(
    "#cart-total"
  ).innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
}

function addToCart(itemName, itemPrice) {
  emptyCart.style.display = "none";

  const existingItem = [...cartItems.children].find((item) => {
    return item.textContent.includes(itemName);
  });
  if (existingItem) {
    const quantity = existingItem.querySelector(".quantity");
    const price = existingItem.querySelector(".price");
    const unitPrice = parseFloat(price.getAttribute("data-unit-price"));
    quantity.textContent = parseInt(quantity.textContent) + 1;
    price.textContent = `$${(
      unitPrice * parseInt(quantity.textContent)
    ).toFixed(2)}`;
    updateTotalPrice();
    return;
  }
  const div = document.createElement("div");
  div.classList.add("cart-item");

  div.innerHTML = `${itemName}<span class="quantity-controls">
            <button class="sub">-</button><span class="quantity">1</span><button class="add">+</button>
            <span class="price" data-unit-price="${itemPrice}">$${itemPrice}</span><button class="remove">Remove</button></span>`;

  cartItems.appendChild(div);

  updateTotalPrice();
}

const cart = document.querySelector(".cart");

cart.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const cartItem = e.target.closest(".cart-item");
    const quantity = cartItem.querySelector(".quantity");
    const price = cartItem.querySelector(".price");
    const unitPrice = parseFloat(price.getAttribute("data-unit-price"));
    if (e.target.classList.contains("remove")) {
      cartItem.remove();
      updateTotalPrice();
      if (cartItems.children.length === 1) {
        emptyCart.style.display = "block";
      }
    }
    if (e.target.classList.contains("add")) {
      quantity.textContent = parseInt(quantity.textContent) + 1;
      price.textContent = `$${(
        unitPrice * parseInt(quantity.textContent)
      ).toFixed(2)}`;
      updateTotalPrice();
    }
    if (e.target.classList.contains("sub")) {
      if (parseInt(quantity.textContent) > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
        price.textContent = `$${(
          unitPrice * parseInt(quantity.textContent)
        ).toFixed(2)}`;
        updateTotalPrice();
      }
    }
  }
});
