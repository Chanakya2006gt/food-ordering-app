// Mock Food Menu Catalog & Authentication Logic
const menuItems = [
  { id: 1, name: "Truffle Porcini Risotto", restaurant: "Osteria Milano", price: 24.50, veg: true, fast: false, rating: "4.9 ★ (340)", icon: "🍲", desc: "Arborio rice, aged Parmigiano-Reggiano, black winter truffle essence." },
  { id: 2, name: "Hamachi Truffle Crudo", restaurant: "Kuro Sakura", price: 28.00, veg: false, fast: true, rating: "5.0 ★ (512)", icon: "🍣", desc: "Yellowtail sashimi with ponzu drizzle, serrano pepper slice, and micro-cilantro." },
  { id: 3, name: "Double Smoked Wagyu Burger", restaurant: "Fire & Grind", price: 21.00, veg: false, fast: true, rating: "4.8 ★ (890)", icon: "🍔", desc: "A5 wagyu smash patty, smoked cheddar, brioche bun, house fermented pickles." },
  { id: 4, name: "Ancient Grain Harvest Bowl", restaurant: "Verdant Greens", price: 17.50, veg: true, fast: true, rating: "4.7 ★ (210)", icon: "🥗", desc: "Spiced chickpeas, roasted butternut squash, avocado, tahini citrus emulsion." },
  { id: 5, name: "Neapolitan Burrata Margherita", restaurant: "L'Antica Pizza", price: 19.00, veg: true, fast: false, rating: "4.9 ★ (720)", icon: "🍕", desc: "San Marzano D.O.P. tomatoes, fresh artisanal burrata cheese, organic basil." },
  { id: 6, name: "Slow-Braised Duck Confit Tacos", restaurant: "La Taqueria Nueva", price: 22.00, veg: false, fast: true, rating: "4.9 ★ (405)", icon: "🌮", desc: "Hand-pressed heirloom blue corn tortillas, habanero-mango salsa, pickled onions." }
];

let cart = [];

function renderMenu(items) {
  const grid = document.getElementById("foodGrid");
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="food-card" data-id="${item.id}">
      <div class="card-media">
        <span>${item.icon}</span>
        <div class="tag-badge">${item.veg ? "🌱 VEG" : "🥩 NON-VEG"}</div>
        <div class="eta-badge">${item.fast ? "⚡ 25-30 min" : "🕒 35-45 min"}</div>
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <div class="card-title">${item.name}</div>
          <div class="card-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="card-restaurant">${item.restaurant}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-action-row">
          <span class="card-rating">${item.rating}</span>
          <button class="btn-add" onclick="addToCart(${item.id})">+ Add to Bag</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    cart.push(item);
    document.getElementById("cartCount").textContent = cart.length;
    showNotification(`Added ${item.name} to cart`);
  }
}

function showNotification(msg) {
  const note = document.createElement("div");
  note.style.position = "fixed";
  note.style.bottom = "20px";
  note.style.right = "20px";
  note.style.background = "#10b981";
  note.style.color = "#fff";
  note.style.padding = "0.75rem 1.25rem";
  note.style.borderRadius = "8px";
  note.style.fontWeight = "600";
  note.style.fontSize = "0.85rem";
  note.style.zIndex = "999";
  note.textContent = msg;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2500);
}

// Initializers
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(menuItems);

  // Search filtering
  const searchInput = document.getElementById("restaurantSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = menuItems.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.restaurant.toLowerCase().includes(q) || 
        i.desc.toLowerCase().includes(q)
      );
      renderMenu(filtered);
    });
  }

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.getAttribute("data-filter");
      if (f === "veg") renderMenu(menuItems.filter(i => i.veg));
      else if (f === "fast") renderMenu(menuItems.filter(i => i.fast));
      else renderMenu(menuItems);
    });
  });

  // Modal Auth
  const authModal = document.getElementById("authModal");
  const loginBtn = document.getElementById("loginModalBtn");
  const closeBtn = document.getElementById("closeAuthBtn");
  const authForm = document.getElementById("authForm");
  const statusMsg = document.getElementById("authStatusMsg");

  if (loginBtn) loginBtn.onclick = () => authModal.classList.add("open");
  if (closeBtn) closeBtn.onclick = () => authModal.classList.remove("open");
  if (authForm) {
    authForm.onsubmit = (e) => {
      e.preventDefault();
      statusMsg.style.color = "#10b981";
      statusMsg.textContent = "✓ Session verified: Logged in successfully.";
      loginBtn.textContent = "Chanakya (VIP)";
      setTimeout(() => authModal.classList.remove("open"), 1200);
    };
  }
});
