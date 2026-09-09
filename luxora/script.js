/* =========================
   PRODUCTS
========================= */

const products = [

  {
    id:1,
    name:"Atlas Automatic",
    price:890,
    category:"watch",
    year:2026,
    description:"A refined automatic watch built for everyday exploration.",
    color:"dark"
  },

  {
    id:2,
    name:"Forma Classic",
    price:640,
    category:"watch",
    year:2025,
    description:"Minimal proportions, precise movement and timeless character.",
    color:"silver"
  },

  {
    id:3,
    name:"Noir Chronograph",
    price:1120,
    category:"watch",
    year:2026,
    description:"A bold chronograph designed around precision and performance.",
    color:"black"
  },

  {
    id:4,
    name:"Leather Card Holder",
    price:120,
    category:"accessory",
    year:2025,
    description:"Italian leather card holder with a minimal silhouette.",
    color:"brown"
  },

  {
    id:5,
    name:"Steel Bracelet",
    price:180,
    category:"accessory",
    year:2026,
    description:"Polished stainless steel bracelet designed for daily wear.",
    color:"silver"
  },

  {
    id:6,
    name:"Travel Case",
    price:145,
    category:"accessory",
    year:2024,
    description:"A compact travel case made to protect your essentials.",
    color:"dark"
  }

];


/* =========================
   STATE
========================= */

let activeCategory = "all";
let cart = JSON.parse(localStorage.getItem("luxora-cart")) || [];


/* =========================
   ELEMENTS
========================= */

const productsGrid =
  document.getElementById("productsGrid");

const cartCount =
  document.getElementById("cartCount");

const cartPanel =
  document.getElementById("cartPanel");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const cartBackdrop =
  document.getElementById("cartBackdrop");

const toast =
  document.getElementById("toast");

const modal =
  document.getElementById("productModal");

const modalProduct =
  document.getElementById("modalProduct");


/* =========================
   PRODUCT VISUAL
========================= */

function productVisual(color = "dark") {

  const colors = {
    dark:"#22221F",
    black:"#11110F",
    silver:"#C9C5BC",
    brown:"#795F4A"
  };

  const face =
    colors[color] || colors.dark;

  return `
    <div class="product-watch">

      <div
        class="watch-strap top"
        style="background:${face}">
      </div>

      <div
        class="watch-face"
        style="background:${face}">
        <span class="watch-brand">LX</span>
        <span class="watch-time">10:10</span>
      </div>

      <div
        class="watch-strap bottom"
        style="background:${face}">
      </div>

    </div>
  `;
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

  let list = [...products];

  if (activeCategory !== "all") {

    list = list.filter(product =>
      product.category === activeCategory
    );

  }

  const sort =
    document.getElementById("sortSelect").value;

  if (sort === "low") {

    list.sort((a,b) =>
      a.price - b.price
    );

  }

  if (sort === "high") {

    list.sort((a,b) =>
      b.price - a.price
    );

  }

  if (sort === "new") {

    list.sort((a,b) =>
      b.year - a.year
    );

  }


  productsGrid.innerHTML =
    list.map(product => `

      <article
        class="product"
        data-id="${product.id}">

        <div class="product-image">

          ${productVisual(product.color)}

        </div>

        <div class="product-info">

          <div class="product-top">

            <span class="product-name">
              ${product.name}
            </span>

            <span class="product-price">
              $${product.price}
            </span>

          </div>

          <p>
            ${product.category === "watch"
              ? "Automatic timepiece"
              : "Everyday accessory"}
          </p>

          <span class="product-tag">
            VIEW DETAILS →
          </span>

        </div>

      </article>

    `).join("");


  document
    .querySelectorAll(".product")
    .forEach(product => {

      product.addEventListener("click", () => {

        const id =
          Number(product.dataset.id);

        openProduct(id);

      });

    });

}


/* =========================
   FILTERS
========================= */

document
  .querySelectorAll(".filter-btn")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".filter-btn")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

      activeCategory =
        button.dataset.category;

      renderProducts();

    });

  });


/* =========================
   SORT
========================= */

document
  .getElementById("sortSelect")
  .addEventListener("change", renderProducts);


/* =========================
   SEARCH
========================= */

const searchBtn =
  document.getElementById("searchBtn");

const searchOverlay =
  document.getElementById("searchOverlay");

const closeSearch =
  document.getElementById("closeSearch");

const searchInput =
  document.getElementById("searchInput");

const searchResults =
  document.getElementById("searchResults");


searchBtn.addEventListener("click", () => {

  searchOverlay.classList.add("active");

  setTimeout(() => {
    searchInput.focus();
  },100);

});


closeSearch.addEventListener("click", () => {

  searchOverlay.classList.remove("active");

});


searchOverlay.addEventListener("click", e => {

  if (e.target === searchOverlay) {

    searchOverlay.classList.remove("active");

  }

});


searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.trim().toLowerCase();

  if (!value) {

    searchResults.innerHTML = "";
    return;

  }


  const result =
    products.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );


  if (!result.length) {

    searchResults.innerHTML = `
      <p style="
        color:var(--muted);
        padding-top:20px;
        font-size:.8rem;">
        No products found.
      </p>
    `;

    return;
  }


  searchResults.innerHTML =
    result.map(product => `

      <div class="search-result">

        <span>
          ${product.name}
        </span>

        <button
          data-search-id="${product.id}">
          View →
        </button>

      </div>

    `).join("");


  document
    .querySelectorAll("[data-search-id]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const id =
          Number(button.dataset.searchId);

        searchOverlay.classList.remove("active");

        openProduct(id);

      });

    });

});


/* =========================
   PRODUCT MODAL
========================= */

function openProduct(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;


  modalProduct.innerHTML = `

    <div class="modal-image">

      ${productVisual(product.color)}

    </div>

    <div class="modal-info">

      <span class="eyebrow">
        LUXORA / ${product.category.toUpperCase()}
      </span>

      <h2>
        ${product.name}
      </h2>

      <p>
        ${product.description}
      </p>

      <strong class="modal-price">
        $${product.price}
      </strong>

      <button
        class="add-modal"
        id="modalAdd">
        Add to bag
      </button>

    </div>

  `;


  modal.classList.add("active");


  document
    .getElementById("modalAdd")
    .addEventListener("click", () => {

      addToCart(product.id);

      modal.classList.remove("active");

    });

}


document
  .getElementById("modalClose")
  .addEventListener("click", () => {

    modal.classList.remove("active");

  });


modal.addEventListener("click", e => {

  if (e.target === modal) {

    modal.classList.remove("active");

  }

});


/* =========================
   CART
========================= */

function saveCart() {

  localStorage.setItem(
    "luxora-cart",
    JSON.stringify(cart)
  );

}


function addToCart(id) {

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id,
      quantity:1
    });

  }


  saveCart();

  renderCart();

  showToast("Added to your bag");

}


function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  renderCart();

}


function renderCart() {

  const count =
    cart.reduce(
      (sum,item) =>
        sum + item.quantity,
      0
    );

  cartCount.textContent = count;


  if (!cart.length) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is empty.
      </p>
    `;

    cartTotal.textContent = "$0";

    return;

  }


  let total = 0;


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );

      if (!product) return "";

      total +=
        product.price * item.quantity;


      return `

        <div class="cart-item">

          <div class="cart-thumb">
            ${productVisual(product.color)}
          </div>

          <div class="cart-item-info">

            <strong>
              ${product.name}
            </strong>

            <span>
              ${item.quantity} × $${product.price}
            </span>

          </div>

          <button
            class="remove-item"
            data-remove="${product.id}">
            ×
          </button>

        </div>

      `;

    }).join("");


  cartTotal.textContent =
    "$" + total.toLocaleString();


  document
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.addEventListener("click", () => {

        removeFromCart(
          Number(button.dataset.remove)
        );

      });

    });

}


document
  .getElementById("cartBtn")
  .addEventListener("click", () => {

    cartPanel.classList.add("active");
    cartBackdrop.classList.add("active");

  });


document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);


cartBackdrop.addEventListener(
  "click",
  closeCart
);


function closeCart() {

  cartPanel.classList.remove("active");
  cartBackdrop.classList.remove("active");

}


/* =========================
   THEME
========================= */

const themeBtn =
  document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "luxora-theme",
    document.body.classList.contains("dark")
      ? "dark"
      : "light"
  );

});


if (
  localStorage.getItem("luxora-theme")
  === "dark"
) {

  document.body.classList.add("dark");

}


/* =========================
   NEWSLETTER
========================= */

document
  .getElementById("newsletterForm")
  .addEventListener("submit", e => {

    e.preventDefault();

    const email =
      document.getElementById("emailInput").value;

    if (!email) return;

    showToast(
      "You're on the list."
    );

    e.target.reset();

  });


/* =========================
   FEATURE BUTTON
========================= */

document
  .getElementById("featureBtn")
  .addEventListener("click", () => {

    const atlas =
      products.find(
        product => product.id === 1
      );

    openProduct(atlas.id);

  });


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("active");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      toast.classList.remove("active");

    },2500);

}


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", e => {

  if (e.key !== "Escape") return;

  searchOverlay.classList.remove("active");
  modal.classList.remove("active");

  closeCart();

});


/* =========================
   INITIALIZE
========================= */

renderProducts();
renderCart();