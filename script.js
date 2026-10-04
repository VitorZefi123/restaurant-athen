// ---------- Menu data ----------
const MENU = [
  { id: 1, cat: "starters", name: "Burrata & Heirloom Tomato", desc: "Creamy burrata, basil oil, aged balsamic, sourdough crisps.", price: 12.5, emoji: "🧀", tag: "Chef's pick", tint: "#3b2a1f,#5a3a22" },
  { id: 2, cat: "starters", name: "Crispy Calamari", desc: "Lemon-pepper squid, smoked paprika aioli, charred lime.", price: 11, emoji: "🦑", tint: "#2a2530,#4a3550" },
  { id: 3, cat: "starters", name: "Roasted Pumpkin Soup", desc: "Velvety pumpkin, toasted seeds, coconut cream swirl.", price: 8.5, emoji: "🎃", tag: "Vegan", tint: "#3e2a14,#6b4318" },
  { id: 4, cat: "starters", name: "Garden Avocado Toast", desc: "Smashed avocado, chili flakes, pickled onion, micro herbs.", price: 9.5, emoji: "🥑", tint: "#1f2e1d,#35502e" },

  { id: 5, cat: "mains", name: "Wood-Fired Ribeye", desc: "300g dry-aged ribeye, chimichurri, rosemary fries.", price: 34, emoji: "🥩", tag: "Signature", tint: "#3a1a1a,#5e2626" },
  { id: 6, cat: "mains", name: "Truffle Tagliatelle", desc: "Fresh egg pasta, black truffle butter, parmesan snow.", price: 22, emoji: "🍝", tint: "#3a301c,#5c4a22" },
  { id: 7, cat: "mains", name: "Miso Glazed Salmon", desc: "Atlantic salmon, sesame greens, jasmine rice.", price: 26, emoji: "🐟", tint: "#1c2a36,#27435a" },
  { id: 8, cat: "mains", name: "Margherita Napoletana", desc: "San Marzano tomato, fior di latte, basil, 48h dough.", price: 16, emoji: "🍕", tag: "Popular", tint: "#3a1f1a,#63302a" },
  { id: 9, cat: "mains", name: "Smash Burger Deluxe", desc: "Double beef, aged cheddar, house pickles, brioche.", price: 18, emoji: "🍔", tint: "#35261a,#5a3d22" },
  { id: 10, cat: "mains", name: "Green Curry Bowl", desc: "Thai green curry, tofu, seasonal vegetables, lime.", price: 19, emoji: "🍛", tag: "Vegan", tint: "#23301c,#3c5228" },

  { id: 11, cat: "desserts", name: "Molten Lava Cake", desc: "Dark chocolate heart, vanilla bean gelato.", price: 10, emoji: "🍫", tag: "Must try", tint: "#2a1a14,#46291c" },
  { id: 12, cat: "desserts", name: "Classic Tiramisu", desc: "Espresso-soaked savoiardi, mascarpone, cocoa.", price: 9, emoji: "🍰", tint: "#33291f,#54432e" },
  { id: 13, cat: "desserts", name: "Berry Pavlova", desc: "Crisp meringue, whipped cream, fresh berries.", price: 9.5, emoji: "🍓", tint: "#381a26,#5c2a3e" },

  { id: 14, cat: "drinks", name: "Smoked Old Fashioned", desc: "Bourbon, maple, orange bitters, cherry wood smoke.", price: 14, emoji: "🥃", tint: "#3a2614,#61401d" },
  { id: 15, cat: "drinks", name: "Passionfruit Spritz", desc: "Prosecco, passionfruit, elderflower, soda.", price: 12, emoji: "🍹", tag: "New", tint: "#3a2a12,#664a18" },
  { id: 16, cat: "drinks", name: "House Red Wine", desc: "Glass of our Tuscan Sangiovese.", price: 11, emoji: "🍷", tint: "#2e141c,#4d1f2e" },
  { id: 17, cat: "drinks", name: "Fresh Lemonade", desc: "Hand-squeezed lemons, mint, sparkling water.", price: 5, emoji: "🍋", tint: "#34321a,#555222" },

  { id: 18, cat: "soft", name: "Coca-Cola", desc: "Ice-cold classic cola served over ice with a lemon slice. 330ml.", price: 3.5, emoji: "🥤", tag: "Classic", tint: "#3d0d12,#8a1622", fizz: true },
  { id: 19, cat: "soft", name: "Coca-Cola Zero", desc: "All the taste, zero sugar. Chilled with ice. 330ml.", price: 3.5, emoji: "🥤", tint: "#151515,#3a3a3a", fizz: true },
  { id: 20, cat: "soft", name: "Fanta Orange", desc: "Bright, bubbly orange soda served ice cold. 330ml.", price: 3.5, emoji: "🍊", tag: "Fizzy", tint: "#7a3a05,#e2780e", fizz: true },
  { id: 21, cat: "soft", name: "Sprite", desc: "Crisp lemon-lime soda with fresh mint leaves. 330ml.", price: 3.5, emoji: "🍈", tint: "#0f3a24,#1f7a4a", fizz: true },
  { id: 22, cat: "soft", name: "Still Mineral Water", desc: "Pure natural spring water, served chilled. 500ml.", price: 2.5, emoji: "💧", tint: "#0c2a44,#1d5d8f" },
  { id: 23, cat: "soft", name: "Sparkling Water", desc: "Naturally carbonated mineral water with lime. 500ml.", price: 3, emoji: "🫧", tag: "Refreshing", tint: "#0e3340,#1f7590", fizz: true },
];

const SERVICE_RATE = 0.1;
const DELIVERY_FEE = 2.9;
const FREE_DELIVERY_FROM = 35;
const MIN_DELIVERY_ORDER = 15;

const cart = new Map(); // id -> qty
let guests = 2;
let selectedTime = null;
let currentCat = "all";
let mode = "table"; // "table" | "delivery"
let deliveryTime = "ASAP";
let payment = "Cash";

const $ = (s) => document.querySelector(s);
const money = (n) => `$${n.toFixed(2)}`;

// ---------- Render menu ----------
const grid = $("#menuGrid");

function renderMenu() {
  const items = MENU.filter((d) => currentCat === "all" || d.cat === currentCat);
  grid.innerHTML = items
    .map((d, i) => {
      const [c1, c2] = d.tint.split(",");
      return `
      <article class="dish ${cart.has(d.id) ? "selected" : ""}" data-id="${d.id}" style="animation-delay:${i * 60}ms">
        <div class="dish-emoji ${d.cat === "soft" ? "soft" : ""}" style="--tint:linear-gradient(135deg,${c1},${c2})">
          ${d.fizz ? bubblesHTML() : ""}${d.cat === "soft" && !d.fizz ? '<span class="ripple"></span>' : ""}
          <span class="glyph">${d.emoji}</span>
        </div>
        ${d.tag ? `<span class="tag">${d.tag}</span>` : ""}
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="dish-foot">
          <span class="price">${money(d.price)}</span>
          ${controlHTML(d.id)}
        </div>
      </article>`;
    })
    .join("");
}

// Rising soda bubbles with random size, position and speed
function bubblesHTML() {
  let html = '<span class="bubbles" aria-hidden="true">';
  for (let i = 0; i < 12; i++) {
    const size = 4 + Math.random() * 9;
    html += `<i style="left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${2.5 + Math.random() * 3}s;animation-delay:${-Math.random() * 5}s"></i>`;
  }
  return html + "</span>";
}

function controlHTML(id) {
  const q = cart.get(id);
  return q
    ? `<div class="qty"><button data-act="dec" data-id="${id}" aria-label="Remove one">−</button><span>${q}</span><button data-act="inc" data-id="${id}" aria-label="Add one">+</button></div>`
    : `<button class="add-btn" data-act="add" data-id="${id}">Add +</button>`;
}

function refreshCard(id) {
  const card = grid.querySelector(`.dish[data-id="${id}"]`);
  if (!card) return;
  card.classList.toggle("selected", cart.has(id));
  const foot = card.querySelector(".dish-foot");
  foot.lastElementChild.outerHTML = controlHTML(id);
}

// ---------- Cart logic ----------
function changeQty(id, delta, sourceEl) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);

  if (delta > 0 && sourceEl) flyToCart(id, sourceEl);
  if (delta > 0 && next === 1) toast(`${MENU.find((d) => d.id === id).emoji} Added to your order`);

  refreshCard(id);
  renderOrder();
}

function totals() {
  let sub = 0;
  cart.forEach((q, id) => (sub += MENU.find((d) => d.id === id).price * q));
  if (mode === "delivery") {
    const fee = sub === 0 || sub >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    return { sub, service: 0, fee, total: sub + fee };
  }
  const service = sub * SERVICE_RATE;
  return { sub, service, fee: 0, total: sub + service };
}

function lineItemsHTML() {
  return [...cart]
    .map(([id, q]) => {
      const d = MENU.find((m) => m.id === id);
      return `
      <li class="line-item">
        <div class="li-emoji">${d.emoji}</div>
        <div class="li-info">
          <div class="li-name">${d.name}</div>
          <div class="li-sub">${q} × ${money(d.price)}</div>
        </div>
        <div class="qty" style="animation:none">
          <button data-act="dec" data-id="${id}" aria-label="Remove one">−</button><span>${q}</span><button data-act="inc" data-id="${id}" aria-label="Add one">+</button>
        </div>
      </li>`;
    })
    .join("");
}

function renderOrder() {
  const count = [...cart.values()].reduce((a, b) => a + b, 0);
  const { sub, service, fee, total } = totals();
  const html = lineItemsHTML();
  const empty = cart.size === 0;
  const delivery = mode === "delivery";

  $("#cartCount").textContent = count;
  $("#summaryList").innerHTML = html;
  $("#drawerList").innerHTML = html;
  $("#summaryEmpty").hidden = !empty;
  $("#drawerEmpty").hidden = !empty;
  $("#subtotal").textContent = money(sub);
  $("#service").textContent = money(service);
  $("#fee").textContent = fee === 0 && sub > 0 ? "Free" : money(fee);
  $("#fee").classList.toggle("free", fee === 0 && sub > 0);
  $("#total").textContent = money(total);
  $("#drawerTotal").textContent = money(total);

  $("#serviceRow").hidden = delivery;
  $("#feeRow").hidden = !delivery;
  $("#emptyText").innerHTML = delivery
    ? `Your bag is empty.<br /><a href="#menu">Browse the menu</a> to order delivery.`
    : `No dishes yet.<br /><a href="#menu">Browse the menu</a> to pre-order.`;

  // Free-delivery progress bar
  $("#freeBar").hidden = !delivery;
  if (delivery) {
    const pct = Math.min(100, (sub / FREE_DELIVERY_FROM) * 100);
    $("#freeFill").style.width = `${pct}%`;
    $("#freeBar").classList.toggle("done", pct >= 100);
    $("#freeText").innerHTML =
      sub < MIN_DELIVERY_ORDER
        ? `Minimum order <b>${money(MIN_DELIVERY_ORDER)}</b> · add <b>${money(MIN_DELIVERY_ORDER - sub)}</b> more`
        : pct < 100
        ? `Add <b>${money(FREE_DELIVERY_FROM - sub)}</b> more for <b>free delivery</b> 🛵`
        : `🎉 You've unlocked <b>free delivery!</b>`;
  }
}

// One click handler for every +/−/Add button on the page
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const act = btn.dataset.act;
  if (act === "add" || act === "inc") changeQty(id, 1, btn);
  if (act === "dec") changeQty(id, -1);
});

// ---------- Fly-to-cart animation ----------
function flyToCart(id, fromEl) {
  const d = MENU.find((m) => m.id === id);
  const from = fromEl.getBoundingClientRect();
  const to = $("#cartBtn").getBoundingClientRect();
  const el = document.createElement("div");
  el.className = "fly";
  el.textContent = d.emoji;
  el.style.left = `${from.left + from.width / 2 - 16}px`;
  el.style.top = `${from.top - 10}px`;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transform = `translate(${to.left - from.left - from.width / 2 + 22}px, ${to.top - from.top + 10}px) scale(0.3)`;
    el.style.opacity = "0.2";
  });
  setTimeout(() => {
    el.remove();
    const cb = $("#cartBtn");
    cb.classList.remove("bump");
    void cb.offsetWidth;
    cb.classList.add("bump");
  }, 800);
}

// ---------- Filters with sliding indicator ----------
const indicator = $("#chipIndicator");
function moveIndicator(chip) {
  indicator.style.width = `${chip.offsetWidth}px`;
  indicator.style.height = `${chip.offsetHeight}px`;
  indicator.style.transform = `translate(${chip.offsetLeft}px, ${chip.offsetTop}px)`;
}
$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  moveIndicator(chip);
  currentCat = chip.dataset.cat;
  renderMenu();
});
window.addEventListener("resize", () => moveIndicator($(".chip.active")));

// ---------- Card spotlight + tilt ----------
grid.addEventListener("mousemove", (e) => {
  const card = e.target.closest(".dish");
  if (!card) return;
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  card.style.setProperty("--mx", `${x}px`);
  card.style.setProperty("--my", `${y}px`);
  const rx = ((y / r.height) - 0.5) * -8;
  const ry = ((x / r.width) - 0.5) * 8;
  card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
});
grid.addEventListener("mouseout", (e) => {
  const card = e.target.closest(".dish");
  if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
});

// ---------- Drawer ----------
const openDrawer = () => { $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); };
const closeDrawer = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); };
$("#cartBtn").addEventListener("click", openDrawer);
$("#closeDrawer").addEventListener("click", closeDrawer);
$("#overlay").addEventListener("click", closeDrawer);
$("#drawerReserve").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => e.key === "Escape" && (closeDrawer(), closeModal()));

// ---------- Reservation form ----------
const dateInput = $("#date");
const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
dateInput.min = todayISO();
dateInput.value = todayISO();

function renderTimes() {
  const slots = [];
  for (let h = 12; h <= 22; h++) {
    slots.push(`${h}:00`);
    if (h < 22) slots.push(`${h}:30`);
  }
  // Pretend some slots are already booked (stable per date)
  const seed = [...dateInput.value].reduce((a, c) => a + c.charCodeAt(0), 0);
  const now = new Date();
  const isToday = dateInput.value === todayISO();

  $("#times").innerHTML = slots
    .map((t, i) => {
      const [h, m] = t.split(":").map(Number);
      const past = isToday && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()));
      const booked = (seed + i * 7) % 5 === 0;
      const disabled = past || booked;
      const active = t === selectedTime && !disabled;
      return `<button type="button" class="time ${active ? "active" : ""}" data-time="${t}" ${disabled ? "disabled" : ""}>${t}</button>`;
    })
    .join("");
  if (!$("#times .time.active")) selectedTime = null;
}
dateInput.addEventListener("change", renderTimes);
$("#times").addEventListener("click", (e) => {
  const b = e.target.closest(".time");
  if (!b || b.disabled) return;
  $("#times").querySelectorAll(".time").forEach((t) => t.classList.remove("active"));
  b.classList.add("active");
  selectedTime = b.dataset.time;
});

// ---------- Delivery options ----------
function renderDeliveryTimes() {
  // "As soon as possible" plus half-hour slots starting ~45 min from now, until 22:30
  const slots = [];
  const start = new Date(Date.now() + 45 * 60000);
  start.setMinutes(start.getMinutes() < 30 ? 30 : 60, 0, 0);
  if (start.getHours() < 12) start.setHours(12, 0, 0, 0);
  for (const t = start; t.getHours() < 23 && t.getDate() === new Date().getDate(); t.setMinutes(t.getMinutes() + 30)) {
    slots.push(`${t.getHours()}:${String(t.getMinutes()).padStart(2, "0")}`);
  }
  if (!slots.includes(deliveryTime)) deliveryTime = "ASAP";
  $("#dTimes").innerHTML =
    `<button type="button" class="time asap ${deliveryTime === "ASAP" ? "active" : ""}" data-time="ASAP">⚡ ASAP</button>` +
    slots.map((t) => `<button type="button" class="time ${t === deliveryTime ? "active" : ""}" data-time="${t}">${t}</button>`).join("");
}
$("#dTimes").addEventListener("click", (e) => {
  const b = e.target.closest(".time");
  if (!b) return;
  $("#dTimes").querySelectorAll(".time").forEach((t) => t.classList.remove("active"));
  b.classList.add("active");
  deliveryTime = b.dataset.time;
});

$("#pay").addEventListener("click", (e) => {
  const b = e.target.closest(".pay-opt");
  if (!b) return;
  $("#pay").querySelectorAll(".pay-opt").forEach((p) => p.classList.remove("active"));
  b.classList.add("active");
  payment = b.dataset.pay;
});

// ---------- Mode switch (table / delivery) ----------
const MODE_TEXT = {
  table: {
    title: "Book your table",
    sub: "Reserve a table and we'll have your pre-order ready when you arrive.",
    submit: "Confirm Reservation",
    notes: "Special requests (allergies, birthday…)",
  },
  delivery: {
    title: "Delivery to your door",
    sub: `Hot & fresh in 30–45 min · Free delivery from ${money(FREE_DELIVERY_FROM)}`,
    submit: "Place Delivery Order",
    notes: "Notes for the kitchen or driver",
  },
};

function moveModeIndicator() {
  const active = $(".mode.active");
  const ind = $("#modeIndicator");
  ind.style.width = `${active.offsetWidth}px`;
  ind.style.transform = `translateX(${active.offsetLeft - 6}px)`;
}

function setMode(next) {
  if (next !== "table" && next !== "delivery") return;
  mode = next;
  document.querySelectorAll(".mode").forEach((m) => {
    const on = m.dataset.mode === mode;
    m.classList.toggle("active", on);
    m.setAttribute("aria-selected", on);
  });
  moveModeIndicator();
  document.querySelectorAll(".mode-panel").forEach((p) => {
    p.hidden = p.dataset.panel !== mode;
  });
  const t = MODE_TEXT[mode];
  $("#checkoutTitle").textContent = t.title;
  $("#checkoutSub").textContent = t.sub;
  $("#submitText").textContent = t.submit;
  $("#notesLabel").textContent = t.notes;
  $("#formError").textContent = "";
  document.body.classList.toggle("delivery-mode", mode === "delivery");
  if (mode === "delivery") renderDeliveryTimes();
  renderOrder();
}

$("#modeSwitch").addEventListener("click", (e) => {
  const b = e.target.closest(".mode");
  if (b) setMode(b.dataset.mode);
});
// Nav / hero links that jump to the checkout in a given mode
document.querySelectorAll("a[data-mode]").forEach((a) =>
  a.addEventListener("click", () => setMode(a.dataset.mode))
);
window.addEventListener("resize", moveModeIndicator);

function setGuests(n) {
  guests = Math.min(12, Math.max(1, n));
  const el = $("#guests");
  el.textContent = guests;
  el.classList.remove("tick");
  void el.offsetWidth;
  el.classList.add("tick");
}
$("#gMinus").addEventListener("click", () => setGuests(guests - 1));
$("#gPlus").addEventListener("click", () => setGuests(guests + 1));

$("#reserveForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const err = $("#formError");
  err.textContent = "";
  document.querySelectorAll(".field.invalid").forEach((f) => f.classList.remove("invalid"));

  const name = $("#name").value.trim();
  const phone = $("#phone").value.trim();
  const problems = [];
  if (!name) { problems.push("name"); $("#name").parentElement.classList.add("invalid"); }
  if (phone.replace(/\D/g, "").length < 7) { problems.push("a valid phone"); $("#phone").parentElement.classList.add("invalid"); }
  if (mode === "table") {
    if (!dateInput.value) { problems.push("a date"); dateInput.parentElement.classList.add("invalid"); }
    if (!selectedTime) problems.push("a time");
  } else {
    const mark = (id, msg) => { problems.push(msg); $(id).parentElement.classList.add("invalid"); };
    if (!$("#street").value.trim()) mark("#street", "your street");
    if (!/^\d{5}$/.test($("#zip").value.trim())) mark("#zip", "a 5-digit postal code");
    if (!$("#city").value.trim()) mark("#city", "your city");
  }

  if (problems.length) {
    err.textContent = `Please add ${problems.join(", ")}.`;
    return;
  }
  if (mode === "delivery") {
    const { sub } = totals();
    if (cart.size === 0) {
      err.innerHTML = `Your bag is empty — <a href="#menu">add some dishes</a> first.`;
      return;
    }
    if (sub < MIN_DELIVERY_ORDER) {
      err.textContent = `Minimum delivery order is ${money(MIN_DELIVERY_ORDER)}. Add ${money(MIN_DELIVERY_ORDER - sub)} more.`;
      return;
    }
  }
  showConfirmation(name);
});

// ---------- Confirmation ----------
function showConfirmation(name) {
  const delivery = mode === "delivery";
  $("#road").hidden = !delivery;
  $("#modal").querySelector(".check").style.display = delivery ? "none" : "";
  $("#modalTitle").textContent = delivery ? "Order on its way!" : "Table reserved!";
  if (delivery) return showDeliveryConfirmation(name);

  const dateStr = new Date(dateInput.value + "T00:00").toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });
  const code = "RA-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const { total } = totals();

  $("#modalText").textContent = `See you soon, ${name.split(" ")[0]}! We've saved your table.`;
  let ticket = `
    <div><span>Booking code</span><b>${code}</b></div>
    <div><span>Date</span><span>${dateStr}</span></div>
    <div><span>Time</span><span>${selectedTime}</span></div>
    <div><span>Guests</span><span>${guests}</span></div>`;
  if (cart.size) {
    ticket += `<div class="t-sep"></div>`;
    cart.forEach((q, id) => {
      const d = MENU.find((m) => m.id === id);
      ticket += `<div><span>${q}× ${d.name}</span><span>${money(d.price * q)}</span></div>`;
    });
    ticket += `<div class="t-sep"></div><div><span>Pre-order total</span><b>${money(total)}</b></div>`;
  } else {
    ticket += `<div class="t-sep"></div><div><span>Pre-order</span><span>Order at the table</span></div>`;
  }
  $("#ticket").innerHTML = ticket;
  $("#modal").classList.add("show");
  confetti();
}

function showDeliveryConfirmation(name) {
  const code = "RA-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const { sub, fee, total } = totals();
  const street = $("#street").value.trim();
  const floor = $("#floor").value.trim();
  const eta =
    deliveryTime === "ASAP"
      ? (() => {
          const fmt = (m) => new Date(Date.now() + m * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return `${fmt(30)} – ${fmt(45)}`;
        })()
      : `around ${deliveryTime}`;

  $("#modalText").textContent = `Thank you, ${name.split(" ")[0]}! The kitchen is already firing up your order.`;
  let ticket = `
    <div><span>Order code</span><b>${code}</b></div>
    <div><span>Arrives</span><span>${eta}</span></div>
    <div><span>Address</span><span class="t-right">${escapeHTML(street)}${floor ? ", " + escapeHTML(floor) : ""}<br />${escapeHTML($("#zip").value.trim())} ${escapeHTML($("#city").value.trim())}</span></div>
    <div><span>Payment</span><span>${payment}</span></div>
    <div class="t-sep"></div>`;
  cart.forEach((q, id) => {
    const d = MENU.find((m) => m.id === id);
    ticket += `<div><span>${q}× ${d.name}</span><span>${money(d.price * q)}</span></div>`;
  });
  ticket += `
    <div class="t-sep"></div>
    <div><span>Subtotal</span><span>${money(sub)}</span></div>
    <div><span>Delivery</span><span>${fee ? money(fee) : "Free"}</span></div>
    <div><span>Total</span><b>${money(total)}</b></div>`;
  $("#ticket").innerHTML = ticket;
  $("#modal").classList.add("show");
  confetti();
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function closeModal() {
  if (!$("#modal").classList.contains("show")) return;
  $("#modal").classList.remove("show");
  $("#reserveForm").reset();
  dateInput.value = todayISO();
  selectedTime = null;
  deliveryTime = "ASAP";
  setGuests(2);
  cart.clear();
  renderTimes();
  if (mode === "delivery") renderDeliveryTimes();
  renderMenu();
  renderOrder();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$("#modalClose").addEventListener("click", closeModal);

function confetti() {
  const colors = ["#2e86f0", "#ffffff", "#e2bb5a", "#6cb4ff", "#9cc85a"];
  const box = $("#confetti");
  for (let i = 0; i < 90; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = `${Math.random() * 100}vw`;
    p.style.background = colors[i % colors.length];
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    p.style.animationDuration = `${2 + Math.random() * 2}s`;
    p.style.animationDelay = `${Math.random() * 0.5}s`;
    box.appendChild(p);
    setTimeout(() => p.remove(), 4600);
  }
}

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

// ---------- Scroll effects ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 90}ms`;
  io.observe(el);
});

window.addEventListener("scroll", () => $("#nav").classList.toggle("scrolled", scrollY > 30));

// Count-up stats
function countUp() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = target % 1 ? 1 : 0;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + (p === 1 && !decimals ? "+" : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// ---------- Init ----------
renderMenu();
renderOrder();
renderTimes();
if (location.hash === "#delivery") { setMode("delivery"); $("#reserve").scrollIntoView(); }
requestAnimationFrame(() => { moveIndicator($(".chip.active")); moveModeIndicator(); });
document.fonts?.ready.then(() => { moveIndicator($(".chip.active")); moveModeIndicator(); });
setTimeout(countUp, 500);
