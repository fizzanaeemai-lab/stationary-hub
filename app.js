/* =============================================
   STATIONERYHUB — app.js
   Fetch API se products load hote hain
   (FakeStoreAPI use kiya gaya hai demo ke liye)
============================================= */

// ─── CONFIG ──────────────────────────────────
const API_URL = "https://fakestoreapi.com/products?limit=16";

// Yeh data apni local products list ke liye
// (Fetch API kaam nahi kare to fallback bhi hai)
const STATIONERY_PRODUCTS = [
  { id: 1,  name: "Premium A5 Notebook",       price: 450, category: "Notebook",     img: "https://i.pinimg.com/736x/29/36/77/293677ee72d988b028860d50c811d102.jpg" },
  { id: 2,  name: "Gel Pen Set (10 Colors)",    price: 320, category: "Pens",         img: "https://i.pinimg.com/736x/bc/c0/d7/bcc0d7355510393bc8d31a5a7cb903b2.jpg" },
  { id: 3,  name: "Colorful Sticky Notes",      price: 180, category: "Notes",        img: "https://i.pinimg.com/1200x/3a/fa/06/3afa0607031b92f9834057d38a16d9a8.jpg" },
  { id: 4,  name: "24 Colors Art Markers",      price: 850, category: "Art Supplies", img: "https://i.pinimg.com/1200x/92/db/af/92dbafc7b2de379901d0aa68cfca26fa.jpg" },
  { id: 5,  name: "Hardcover Leather Diary",    price: 650, category: "Notebook",     img: "https://i.pinimg.com/1200x/28/bf/a2/28bfa2c97c3adb49c23f65db5261da92.jpg" },
  { id: 6,  name: "Mechanical Pencil Set",      price: 280, category: "Pens",         img: "https://i.pinimg.com/1200x/76/41/ac/7641aca17238eb18068a85eb3e0e5aa0.jpg" },
  { id: 7,  name: "File Folders Pack",          price: 220, category: "Office",       img: "https://i.pinimg.com/1200x/c0/09/3b/c0093b067bca7cb0274e9c07c87864ca.jpg" },
  { id: 8,  name: "Pastel Highlighter Set",     price: 290, category: "Pens",         img: "https://i.pinimg.com/1200x/f8/02/3e/f8023edaac9652e2d665ea576192bdab.jpg" },
  { id: 9,  name: "Washi Tape Collection",      price: 350, category: "Art Supplies", img: "https://i.pinimg.com/736x/05/f4/07/05f407bc26d2f5bb33dd3d5eb47fb28b.jpg" },
  { id: 10, name: "Brush Pen Set",              price: 480, category: "Pens",         img: "https://i.pinimg.com/736x/64/ba/21/64ba219a84d74a948cb062434c7ddba8.jpg" },
  { id: 11, name: "Memo Pad Bundle",            price: 160, category: "Notes",        img: "https://i.pinimg.com/1200x/37/11/ed/3711ed3f70d5587ebe4c5c7cd502e1f5.jpg" },
  { id: 12, name: "Watercolor Pencils",         price: 920, category: "Art Supplies", img: "https://i.pinimg.com/736x/31/97/a6/3197a6540ddc5ee7a5e84000744a6097.jpg" },
  { id: 13, name: "Spiral Bound Journal",       price: 380, category: "Notebook",     img: "https://i.pinimg.com/736x/69/db/76/69db766134d82f7e919a091d643ec975.jpg" },
  { id: 14, name: "Desk Organizer Set",         price: 750, category: "Office",       img: "https://i.pinimg.com/736x/29/36/77/293677ee72d988b028860d50c811d102.jpg" },
  { id: 15, name: "Calligraphy Pen Kit",        price: 540, category: "Pens",         img: "https://i.pinimg.com/736x/bc/c0/d7/bcc0d7355510393bc8d31a5a7cb903b2.jpg" },
  { id: 16, name: "Sticky Note Dispenser",      price: 210, category: "Notes",        img: "https://i.pinimg.com/1200x/3a/fa/06/3afa0607031b92f9834057d38a16d9a8.jpg" },
];

// Banner ke liye images
const BANNER_IMAGES = [
  { src: "https://i.pinimg.com/736x/05/f4/07/05f407bc26d2f5bb33dd3d5eb47fb28b.jpg", alt: "Notebook" },
  { src: "https://i.pinimg.com/736x/64/ba/21/64ba219a84d74a948cb062434c7ddba8.jpg", alt: "Pens" },
  { src: "https://i.pinimg.com/736x/1c/d0/df/1cd0dfd1bcf3bfe2a517897086f1cd3b.jpg", alt: "Sticky Notes" },
  { src: "https://i.pinimg.com/1200x/06/e8/a0/06e8a04761946ef0232cc48428b23a15.jpg", alt: "Diary" },
  { src: "https://i.pinimg.com/1200x/37/11/ed/3711ed3f70d5587ebe4c5c7cd502e1f5.jpg", alt: "Markers" },
  { src: "https://i.pinimg.com/736x/31/97/a6/3197a6540ddc5ee7a5e84000744a6097.jpg", alt: "Pencils" },
  { src: "https://i.pinimg.com/736x/69/db/76/69db766134d82f7e919a091d643ec975.jpg", alt: "Highlighters" },
];

// ─── STATE ───────────────────────────────────
let allProducts = [];
let cart = [];

// ─── FETCH API ────────────────────────────────
/**
 * FakeStoreAPI se products fetch karta hai.
 * Agar API fail ho jaye (network issue etc.) toh
 * STATIONERY_PRODUCTS se fallback ho jata hai.
 *
 * Fetch API flow:
 * 1. fetch(URL) → Promise return karta hai
 * 2. .then(res => res.json()) → Response ko JSON mein convert karta hai
 * 3. .then(data => ...) → Data milne ke baad products render karta hai
 * 4. .catch(err => ...) → Error aane par fallback activate hota hai
 */
async function fetchProducts() {
  try {
    // ─── FETCH API CALL ───────────────────────
    const response = await fetch(API_URL);

    // Agar response theek nahi aya (404, 500 etc.)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // JSON parse karo
    const apiData = await response.json();

    // FakeStoreAPI ka data stationery ke saath map karo
    // (kyunki API generic products deta hai)
    allProducts = apiData.map((item, index) => {
      const local = STATIONERY_PRODUCTS[index % STATIONERY_PRODUCTS.length];
      return {
        id: local.id,
        name: local.name,
        price: local.price,
        category: local.category,
        img: local.img,
        // API se rating bhi le rahe hain (bonus feature!)
        rating: item.rating ? Math.round(item.rating.rate) : 4,
      };
    });

    console.log("✅ Fetch API se products load hue:", allProducts.length, "items");

  } catch (error) {
    // ─── ERROR / FALLBACK ─────────────────────
    console.warn("⚠️ API call fail hui:", error.message);
    console.log("📦 Fallback: Local data use ho raha hai");
    allProducts = STATIONERY_PRODUCTS.map(p => ({ ...p, rating: 4 }));
  }

  // Products render karo (chahe fetch hue ya fallback)
  renderProducts(allProducts);
}

// ─── BANNER ──────────────────────────────────
function buildBanner() {
  const track = document.getElementById("strip-track");
  // Double karo smooth infinite scroll ke liye
  const doubled = [...BANNER_IMAGES, ...BANNER_IMAGES];
  track.innerHTML = doubled
    .map(img => `<img src="${img.src}" alt="${img.alt}" loading="lazy" />`)
    .join("");
}

// ─── RENDER PRODUCTS ─────────────────────────
function renderProducts(products) {
  const container = document.getElementById("products");

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fa-solid fa-box-open"></i>
        <p>Koi product nahi mila.</p>
      </div>`;
    return;
  }

  container.innerHTML = products
    .map(product => `
      <div class="product-card">
        <div class="card-img-wrap">
          <img src="${product.img}" alt="${product.name}" loading="lazy" />
          <span class="card-badge">${product.category}</span>
        </div>
        <div class="card-body">
          <p class="card-category">${product.category}</p>
          <h3 class="card-name">${product.name}</h3>
          <div class="card-footer">
            <p class="card-price"><span>Rs.</span>${product.price.toLocaleString()}</p>
            <button class="add-btn" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `)
    .join("");
}

// ─── CART FUNCTIONS ───────────────────────────
function addToCart(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  cart.push(product);
  updateCartCount();
  showToast(`✓ ${product.name} cart mein add ho gaya!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">Aapka cart khali hai.</p>`;
    totalEl.textContent = "Rs. 0";
    return;
  }

  let total = 0;
  container.innerHTML = cart
    .map((item, index) => {
      total += item.price;
      return `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" />
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">Rs. ${item.price.toLocaleString()}</p>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
              <i class="fa-solid fa-trash-can"></i> Hatao
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = `Rs. ${total.toLocaleString()}`;
}

// ─── CART TOGGLE ─────────────────────────────
function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  } else {
    renderCart();
    sidebar.classList.add("open");
    overlay.classList.add("active");
  }
}

// ─── TOAST ───────────────────────────────────
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─── INIT ─────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildBanner();    // Banner images load karo
  fetchProducts();  // ← FETCH API yahan call hoti hai
});