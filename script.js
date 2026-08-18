(() => {
  "use strict";

  /* ==========================================================================
     CONSTANTS & STORAGE KEYS
     ========================================================================== */
  const WHATSAPP_NUMBER = "917909608370";
  const CART_KEY = "royalBitesCart_v2";
  const THEME_KEY = "royalBitesTheme_v2";
  const REVIEWS_KEY = "royalBitesReviews_v2";
  const ORDERS_KEY = "royalBitesOrders_v2";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  /* ==========================================================================
     AUTHENTIC MENU DATABASE
     ========================================================================== */
  const MENU_DATA = [
    // --- PIZZAS ---
    {
      id: "p1",
      name: "Truffle Cheese Burst Pizza",
      category: "pizza",
      diet: "veg",
      isChef: true,
      spice: "Mild 🌶️",
      price: 349,
      origPrice: 429,
      rating: 4.9,
      ratingCount: 312,
      desc: "Double molten mozzarella crust infused with black truffle oil, exotic herbs & sweet basil.",
      image: "images/pizza.jpg",
      sizes: [
        { name: "Regular (8\")", add: 0 },
        { name: "Medium (10\")", add: 140 },
        { name: "Large (12\")", add: 260 }
      ],
      addons: [
        { name: "Extra Mozzarella Cheese", price: 49 },
        { name: "Garlic Dip & Jalapeño Cup", price: 29 },
        { name: "Loaded Mushroom & Olives", price: 39 }
      ]
    },
    {
      id: "p2",
      name: "Farmhouse Margherita Deluxe",
      category: "pizza",
      diet: "veg",
      isChef: false,
      spice: "Mild 🌶️",
      price: 289,
      origPrice: 349,
      rating: 4.8,
      ratingCount: 240,
      desc: "San Marzano tomato sauce, fresh bocconcini mozzarella, bell peppers & extra virgin olive oil.",
      image: "images/pizza.jpg",
      sizes: [
        { name: "Regular (8\")", add: 0 },
        { name: "Medium (10\")", add: 120 },
        { name: "Large (12\")", add: 240 }
      ],
      addons: [
        { name: "Extra Cheese", price: 40 },
        { name: "Peri Peri Sprinkle", price: 15 }
      ]
    },
    {
      id: "p3",
      name: "Fiery Peri-Peri Paneer Pizza",
      category: "pizza",
      diet: "veg",
      isChef: true,
      spice: "Hot 🔥",
      price: 329,
      origPrice: 399,
      rating: 4.9,
      ratingCount: 198,
      desc: "Marinated grilled cottage cheese, spiced red paprika, crunchy capsicum & smoky chipotle drizzle.",
      image: "images/pizza.jpg",
      sizes: [
        { name: "Regular (8\")", add: 0 },
        { name: "Medium (10\")", add: 130 },
        { name: "Large (12\")", add: 250 }
      ],
      addons: [
        { name: "Extra Peri Peri Paneer", price: 55 },
        { name: "Cheesy Dip", price: 25 }
      ]
    },
    {
      id: "p4",
      name: "BBQ Smoked Chicken Pizza",
      category: "pizza",
      diet: "nonveg",
      isChef: true,
      spice: "Medium 🌶️🌶️",
      price: 389,
      origPrice: 469,
      rating: 4.9,
      ratingCount: 420,
      desc: "Tender hickory-smoked chicken cubes, caramelized onions, BBQ glaze and melted smoked gouda.",
      image: "images/pizza.jpg",
      sizes: [
        { name: "Regular (8\")", add: 0 },
        { name: "Medium (10\")", add: 150 },
        { name: "Large (12\")", add: 280 }
      ],
      addons: [
        { name: "Extra Grilled Chicken", price: 65 },
        { name: "Extra BBQ Glaze", price: 20 }
      ]
    },

    // --- BURGERS ---
    {
      id: "b1",
      name: "Royal Double Smash Cheeseburger",
      category: "burger",
      diet: "veg",
      isChef: true,
      spice: "Medium 🌶️🌶️",
      price: 229,
      origPrice: 279,
      rating: 4.9,
      ratingCount: 290,
      desc: "Twin crispy herb patties, melted double cheddar, house secret relish in toasted butter brioche.",
      image: "images/burger.jpg",
      sizes: [
        { name: "Single Patty", add: 0 },
        { name: "Double Patty Feast", add: 60 }
      ],
      addons: [
        { name: "Add Seasoned Crinkle Fries", price: 49 },
        { name: "Extra Melted Cheddar Slice", price: 25 }
      ]
    },
    {
      id: "b2",
      name: "Crispy Peri Peri Paneer Burger",
      category: "burger",
      diet: "veg",
      isChef: false,
      spice: "Hot 🔥",
      price: 199,
      origPrice: 249,
      rating: 4.8,
      ratingCount: 185,
      desc: "Thick crumb-fried paneer steak tossed in fiery peri-peri spices, coleslaw and creamy mayo.",
      image: "images/burger.jpg",
      sizes: [
        { name: "Standard Burger", add: 0 },
        { name: "Meal with Coke & Fries", add: 89 }
      ],
      addons: [
        { name: "Extra Cheese Slice", price: 25 },
        { name: "Jalapeño Dip", price: 20 }
      ]
    },
    {
      id: "b3",
      name: "Crunchy Zinger Chicken Burger",
      category: "burger",
      diet: "nonveg",
      isChef: true,
      spice: "Medium 🌶️🌶️",
      price: 249,
      origPrice: 299,
      rating: 4.9,
      ratingCount: 350,
      desc: "Golden buttermilk fried chicken breast, fresh iceberg lettuce, and spicy chipotle sauce.",
      image: "images/burger.jpg",
      sizes: [
        { name: "Standard", add: 0 },
        { name: "Mega Combo with Peri Fries", add: 99 }
      ],
      addons: [
        { name: "Extra Bacon/Chicken Strip", price: 50 },
        { name: "Cheese Blast Topping", price: 30 }
      ]
    },

    // --- PASTAS ---
    {
      id: "pa1",
      name: "Royal Truffle Alfredo Pasta",
      category: "pasta",
      diet: "veg",
      isChef: true,
      spice: "Mild 🌶️",
      price: 279,
      origPrice: 339,
      rating: 4.9,
      ratingCount: 260,
      desc: "Penne pasta in rich parmesan cream sauce, garlic sautéed mushrooms, herbs and truffle glaze.",
      image: "images/pasta.jpg",
      sizes: [
        { name: "Regular Bowl", add: 0 },
        { name: "Large Gourmet Bowl", add: 80 }
      ],
      addons: [
        { name: "Toasted Garlic Bread (2 pcs)", price: 45 },
        { name: "Extra Grated Parmesan", price: 35 }
      ]
    },
    {
      id: "pa2",
      name: "Fiery Arrabiata Red Sauce Pasta",
      category: "pasta",
      diet: "veg",
      isChef: false,
      spice: "Hot 🔥",
      price: 249,
      origPrice: 299,
      rating: 4.7,
      ratingCount: 140,
      desc: "Fusilli tossed in slow-cooked Italian plum tomatoes, red chili flakes, black olives and fresh basil.",
      image: "images/pasta.jpg",
      sizes: [
        { name: "Regular Bowl", add: 0 },
        { name: "Large Gourmet Bowl", add: 70 }
      ],
      addons: [
        { name: "Add Garlic Breadsticks", price: 40 },
        { name: "Add Grilled Vegetables", price: 30 }
      ]
    },
    {
      id: "pa3",
      name: "Pink Sauce Rosa Chicken Pasta",
      category: "pasta",
      diet: "nonveg",
      isChef: true,
      spice: "Medium 🌶️🌶️",
      price: 319,
      origPrice: 389,
      rating: 4.9,
      ratingCount: 215,
      desc: "Creamy fusion of Alfredo & tangy Marinara with juicy spiced chicken morsels and melted mozzarella.",
      image: "images/pasta.jpg",
      sizes: [
        { name: "Regular Portion", add: 0 },
        { name: "Chef's Jumbo Portion", add: 90 }
      ],
      addons: [
        { name: "Extra Roasted Chicken", price: 60 },
        { name: "Cheesy Garlic Bread", price: 55 }
      ]
    },

    // --- SIDES & STARTERS ---
    {
      id: "s1",
      name: "Loaded Cheesy Nachos Supreme",
      category: "starter",
      diet: "veg",
      isChef: true,
      spice: "Medium 🌶️🌶️",
      price: 199,
      origPrice: 249,
      rating: 4.8,
      ratingCount: 178,
      desc: "Crisp Mexican tortilla chips smothered with warm queso, salsa fresca, jalapeños & sour cream.",
      image: "images/hero.jpg",
      sizes: [
        { name: "Standard Platter", add: 0 }
      ],
      addons: [
        { name: "Extra Guacamole & Salsa", price: 45 },
        { name: "Extra Melted Cheese", price: 35 }
      ]
    },
    {
      id: "s2",
      name: "Peri Peri Crinkle Fries",
      category: "starter",
      diet: "veg",
      isChef: false,
      spice: "Medium 🌶️🌶️",
      price: 129,
      origPrice: 169,
      rating: 4.7,
      ratingCount: 310,
      desc: "Golden crunchy crinkle cut fries tossed in our signature African peri-peri spice dust with dip.",
      image: "images/burger.jpg",
      sizes: [
        { name: "Regular Box", add: 0 },
        { name: "Large Box", add: 50 }
      ],
      addons: [
        { name: "Cheese Lava Dip", price: 30 }
      ]
    },
    {
      id: "s3",
      name: "Crispy Buffalo Wings (6 Pcs)",
      category: "starter",
      diet: "nonveg",
      isChef: true,
      spice: "Hot 🔥",
      price: 269,
      origPrice: 329,
      rating: 4.9,
      ratingCount: 220,
      desc: "Tender fried chicken wings glazed with tangy Louisiana hot sauce served with herb ranch.",
      image: "images/hero.jpg",
      sizes: [
        { name: "6 Pieces", add: 0 },
        { name: "12 Pieces (Share Pack)", add: 190 }
      ],
      addons: [
        { name: "Extra Herb Ranch Dip", price: 25 }
      ]
    },

    // --- BEVERAGES & SHAKES ---
    {
      id: "d1",
      name: "Belgian Chocolate Shake",
      category: "drink",
      diet: "veg",
      isChef: true,
      spice: "Sweet 🍫",
      price: 179,
      origPrice: 219,
      rating: 4.9,
      ratingCount: 280,
      desc: "Rich dark Belgian chocolate blended with creamy whole milk and topped with chocolate curls.",
      image: "images/hero.jpg",
      sizes: [
        { name: "350 ml Glass", add: 0 },
        { name: "500 ml Tall Jar", add: 50 }
      ],
      addons: [
        { name: "Add Whipped Cream & Choco Chips", price: 25 },
        { name: "Add Scoop of Vanilla Ice Cream", price: 30 }
      ]
    },
    {
      id: "d2",
      name: "Virgin Mint Lime Mojito",
      category: "drink",
      diet: "veg",
      isChef: false,
      spice: "Chilled ❄️",
      price: 129,
      origPrice: 159,
      rating: 4.8,
      ratingCount: 195,
      desc: "Crushed fresh garden mint, zesty lime wedges, sparkling soda, cane sugar and crushed ice.",
      image: "images/hero.jpg",
      sizes: [
        { name: "400 ml", add: 0 }
      ],
      addons: [
        { name: "Extra Mint Burst", price: 15 }
      ]
    },
    {
      id: "d3",
      name: "Hazelnut Cold Coffee Frappé",
      category: "drink",
      diet: "veg",
      isChef: true,
      spice: "Chilled ❄️",
      price: 169,
      origPrice: 209,
      rating: 4.9,
      ratingCount: 340,
      desc: "Double espresso shot blended with hazelnut essence, chilled milk and creamy ice cream foam.",
      image: "images/hero.jpg",
      sizes: [
        { name: "350 ml Glass", add: 0 },
        { name: "500 ml Jumbo Glass", add: 45 }
      ],
      addons: [
        { name: "Extra Espresso Shot", price: 30 }
      ]
    },

    // --- DESSERTS ---
    {
      id: "des1",
      name: "Molten Choco Lava Cake & Ice Cream",
      category: "dessert",
      diet: "veg",
      isChef: true,
      spice: "Sweet 🍫",
      price: 169,
      origPrice: 219,
      rating: 5.0,
      ratingCount: 450,
      desc: "Warm dark chocolate sponge cake with an oozing liquid ganache center, paired with vanilla bean gelato.",
      image: "images/hero.jpg",
      sizes: [
        { name: "Single Serving", add: 0 },
        { name: "Double Dessert Combo", add: 120 }
      ],
      addons: [
        { name: "Extra Vanilla Gelato Scoop", price: 35 },
        { name: "Hot Fudge Sauce Drizzle", price: 20 }
      ]
    },
    {
      id: "des2",
      name: "New York Blueberry Cheesecake",
      category: "dessert",
      diet: "veg",
      isChef: false,
      spice: "Sweet 🫐",
      price: 199,
      origPrice: 249,
      rating: 4.9,
      ratingCount: 210,
      desc: "Classic creamy baked cheesecake on buttery graham crust topped with wild blueberry compote.",
      image: "images/hero.jpg",
      sizes: [
        { name: "Classic Slice", add: 0 }
      ],
      addons: [
        { name: "Extra Blueberry Glaze", price: 25 }
      ]
    }
  ];

  /* ==========================================================================
     COUPONS DEFINITION
     ========================================================================== */
  const COUPONS = {
    ROYAL50: { type: "flat", value: 50, minOrder: 399, desc: "Flat ₹50 OFF" },
    FIRSTBITE: { type: "percent", value: 15, maxDiscount: 100, minOrder: 250, desc: "15% OFF up to ₹100" },
    FREEDEL: { type: "freedel", minOrder: 299, desc: "Free Delivery" }
  };

  /* ==========================================================================
     INITIAL STATE
     ========================================================================== */
  let cart = [];
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (Array.isArray(stored)) cart = stored;
  } catch {
    cart = [];
  }

  let activeCoupon = null;
  let activeOrderType = "Delivery";
  let activeCategory = "all";
  let activeDiet = "all";
  let activeSort = "recommended";
  let searchQuery = "";
  let currentCustomizingDish = null;

  /* ==========================================================================
     TOAST NOTIFICATION ENGINE
     ========================================================================== */
  const showToast = (message, type = "success") => {
    const container = $("#toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.3s ease";
      window.setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ==========================================================================
     PAGE LOADER
     ========================================================================== */
  const hideLoader = () => {
    const loader = $("#loader");
    if (!loader || loader.dataset.done === "1") return;
    loader.dataset.done = "1";
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    window.setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  };

  window.addEventListener("DOMContentLoaded", () => window.setTimeout(hideLoader, 600));
  window.addEventListener("load", () => window.setTimeout(hideLoader, 150));
  window.setTimeout(hideLoader, 2000);

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
  const themeToggle = $("#themeToggle");
  const applyTheme = (mode) => {
    const isLight = mode === "light";
    document.body.classList.toggle("light", isLight);
    if (themeToggle) themeToggle.textContent = isLight ? "☀️" : "🌙";
    document.documentElement.style.colorScheme = isLight ? "light" : "dark";
  };

  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ==========================================================================
     NAVIGATION & MOBILE DRAWER
     ========================================================================== */
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  const closeMobileNav = () => {
    navLinks?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  $$(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  /* Search Trigger scroll to menu */
  $("#searchTrigger")?.addEventListener("click", () => {
    const input = $("#menuSearchInput");
    input?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => input?.focus(), 400);
  });

  /* ==========================================================================
     SCROLL PROGRESS & BACK TO TOP
     ========================================================================== */
  const progressBar = $("#progressBar");
  const topBtn = $("#topBtn");

  const handleScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${progress}%`;

    if (topBtn) {
      if (scrollTop > 300) topBtn.removeAttribute("hidden");
      else topBtn.setAttribute("hidden", "");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ==========================================================================
     STATS COUNTER OBSERVER
     ========================================================================== */
  let statsTriggered = false;
  const startCounters = () => {
    if (statsTriggered) return;
    statsTriggered = true;

    $$(".counter").forEach((counter) => {
      const target = Number(counter.dataset.target) || 0;
      const duration = 1500;
      const start = performance.now();

      const updateCount = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * ease);

        if (progress < 1) {
          counter.textContent = String(current);
          requestAnimationFrame(updateCount);
        } else {
          if (target === 5000) counter.textContent = "5,000+";
          else if (target === 5) counter.textContent = "4.9★";
          else counter.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = $(".stats-section");
  if (statsSection && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        startCounters();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(statsSection);
  } else {
    startCounters();
  }

  /* ==========================================================================
     MENU RENDERING & INTERACTIVE FILTERS
     ========================================================================== */
  const menuGrid = $("#menuGrid");
  const noResultsMsg = $("#noResultsMsg");
  const menuSearchInput = $("#menuSearchInput");
  const clearSearchBtn = $("#clearSearchBtn");
  const menuSortSelect = $("#menuSortSelect");

  const getItemCartQty = (dishId) => {
    return cart
      .filter((item) => item.dishId === dishId)
      .reduce((sum, item) => sum + item.qty, 0);
  };

  const renderMenu = () => {
    if (!menuGrid) return;

    let filtered = MENU_DATA.filter((dish) => {
      // Category filter
      if (activeCategory !== "all" && dish.category !== activeCategory) return false;

      // Dietary filter
      if (activeDiet === "veg" && dish.diet !== "veg") return false;
      if (activeDiet === "nonveg" && dish.diet !== "nonveg") return false;
      if (activeDiet === "chef" && !dish.isChef) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.desc.toLowerCase().includes(q);
        const matchesCat = dish.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });

    // Sorting
    if (activeSort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
      menuGrid.innerHTML = "";
      noResultsMsg?.removeAttribute("hidden");
      return;
    }

    noResultsMsg?.setAttribute("hidden", "");

    menuGrid.innerHTML = filtered
      .map((dish) => {
        const cartQty = getItemCartQty(dish.id);
        const isVeg = dish.diet === "veg";

        return `
        <article class="dish-card" data-id="${dish.id}">
          <div class="dish-img-wrapper">
            <img src="${escapeHtml(dish.image)}" alt="${escapeHtml(dish.name)}" class="dish-img" loading="lazy">
            <div class="dish-badges">
              <span class="badge-diet ${isVeg ? "badge-veg" : "badge-nonveg"}">
                ${isVeg ? "🟢 Pure Veg" : "🔴 Non-Veg"}
              </span>
              ${dish.isChef ? '<span class="badge-chef">👑 Chef Special</span>' : ""}
            </div>
            <span class="dish-spice">${escapeHtml(dish.spice)}</span>
          </div>

          <div class="dish-body">
            <div class="dish-meta-row">
              <div class="dish-rating">
                <span>⭐ ${dish.rating}</span>
                <span class="dish-rating-count">(${dish.ratingCount})</span>
              </div>
            </div>

            <h3 class="dish-title">${escapeHtml(dish.name)}</h3>
            <p class="dish-desc">${escapeHtml(dish.desc)}</p>

            <div class="dish-footer">
              <div class="dish-pricing">
                <span class="dish-price">₹${dish.price}</span>
                ${dish.origPrice ? `<span class="dish-origPrice">₹${dish.origPrice}</span>` : ""}
              </div>

              <div class="dish-actions">
                <button type="button" class="btn-customize-icon" data-action="customize" data-id="${dish.id}" title="Customize portion & addons">
                  ⚙️ Options
                </button>

                ${
                  cartQty > 0
                    ? `
                    <div class="card-qty-stepper">
                      <button type="button" data-action="dec" data-id="${dish.id}" aria-label="Decrease quantity">−</button>
                      <span>${cartQty}</span>
                      <button type="button" data-action="inc" data-id="${dish.id}" aria-label="Increase quantity">+</button>
                    </div>`
                    : `
                    <button type="button" class="btn-add-cart" data-action="add-direct" data-id="${dish.id}">
                      + Add
                    </button>`
                }
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  };

  // Category Tab Clicks
  $$(".cat-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".cat-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeCategory = tab.dataset.category || "all";
      renderMenu();
    });
  });

  // Dietary Filter Clicks
  $$(".diet-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".diet-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeDiet = btn.dataset.diet || "all";
      renderMenu();
    });
  });

  // Sorting
  menuSortSelect?.addEventListener("change", (e) => {
    activeSort = e.target.value;
    renderMenu();
  });

  // Search with debounce
  let searchTimer;
  menuSearchInput?.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchQuery = e.target.value.trim();
    if (clearSearchBtn) {
      if (searchQuery.length > 0) clearSearchBtn.removeAttribute("hidden");
      else clearSearchBtn.setAttribute("hidden", "");
    }
    searchTimer = setTimeout(renderMenu, 150);
  });

  clearSearchBtn?.addEventListener("click", () => {
    if (menuSearchInput) menuSearchInput.value = "";
    searchQuery = "";
    clearSearchBtn.setAttribute("hidden", "");
    renderMenu();
  });

  $("#resetFiltersBtn")?.addEventListener("click", () => {
    activeCategory = "all";
    activeDiet = "all";
    searchQuery = "";
    if (menuSearchInput) menuSearchInput.value = "";
    clearSearchBtn?.setAttribute("hidden", "");

    $$(".cat-tab").forEach((t) => t.classList.toggle("active", t.dataset.category === "all"));
    $$(".diet-btn").forEach((b) => b.classList.toggle("active", b.dataset.diet === "all"));
    renderMenu();
  });

  /* Helper for popular links in footer */
  window.filterCategoryAndScroll = (category) => {
    const tab = $(`[data-category="${category}"]`);
    if (tab) tab.click();
    $("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  $$(".popular-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      window.filterCategoryAndScroll(cat);
    });
  });

  /* ==========================================================================
     CUSTOMIZATION MODAL
     ========================================================================== */
  const customModal = $("#customizationModal");
  const closeCustomModalBtn = $("#closeCustomModal");
  const customDishImg = $("#customDishImg");
  const customDishBadge = $("#customDishBadge");
  const customModalTitle = $("#customModalTitle");
  const customDishDesc = $("#customDishDesc");
  const customBasePrice = $("#customBasePrice");
  const sizeOptionsList = $("#sizeOptionsList");
  const addonsOptionsList = $("#addonsOptionsList");
  const customFinalPrice = $("#customFinalPrice");
  const customInstructions = $("#customInstructions");
  const addCustomizedToCartBtn = $("#addCustomizedToCartBtn");

  const openCustomModal = (dishId) => {
    const dish = MENU_DATA.find((d) => d.id === dishId);
    if (!dish || !customModal) return;

    currentCustomizingDish = dish;

    if (customDishImg) customDishImg.src = dish.image;
    if (customDishBadge) {
      customDishBadge.className = `badge-diet ${dish.diet === "veg" ? "badge-veg" : "badge-nonveg"}`;
      customDishBadge.textContent = dish.diet === "veg" ? "🟢 Pure Veg" : "🔴 Non-Veg";
    }
    if (customModalTitle) customModalTitle.textContent = `Customize: ${dish.name}`;
    if (customDishDesc) customDishDesc.textContent = dish.desc;
    if (customBasePrice) customBasePrice.textContent = String(dish.price);
    if (customInstructions) customInstructions.value = "";

    // Size / Portion Radios
    if (sizeOptionsList) {
      sizeOptionsList.innerHTML = (dish.sizes || [])
        .map(
          (s, idx) => `
        <label class="custom-opt-label">
          <div>
            <input type="radio" name="dishSize" value="${escapeHtml(s.name)}" data-add="${s.add}" ${idx === 0 ? "checked" : ""}>
            <span>${escapeHtml(s.name)}</span>
          </div>
          <strong>${s.add > 0 ? `+₹${s.add}` : "Included"}</strong>
        </label>
      `
        )
        .join("");
    }

    // Addon Checkboxes
    if (addonsOptionsList) {
      addonsOptionsList.innerHTML = (dish.addons || [])
        .map(
          (a) => `
        <label class="custom-opt-label">
          <div>
            <input type="checkbox" name="dishAddon" value="${escapeHtml(a.name)}" data-price="${a.price}">
            <span>${escapeHtml(a.name)}</span>
          </div>
          <strong>+₹${a.price}</strong>
        </label>
      `
        )
        .join("");
    }

    recalcCustomPrice();

    customModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeCustomModal = () => {
    if (!customModal) return;
    customModal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    currentCustomizingDish = null;
  };

  const recalcCustomPrice = () => {
    if (!currentCustomizingDish) return;
    let price = currentCustomizingDish.price;

    const checkedSize = $('input[name="dishSize"]:checked', sizeOptionsList);
    if (checkedSize) {
      price += Number(checkedSize.dataset.add) || 0;
    }

    $$('input[name="dishAddon"]:checked', addonsOptionsList).forEach((chk) => {
      price += Number(chk.dataset.price) || 0;
    });

    if (customFinalPrice) customFinalPrice.textContent = String(price);
    return price;
  };

  sizeOptionsList?.addEventListener("change", recalcCustomPrice);
  addonsOptionsList?.addEventListener("change", recalcCustomPrice);
  closeCustomModalBtn?.addEventListener("click", closeCustomModal);
  customModal?.addEventListener("click", (e) => {
    if (e.target === customModal) closeCustomModal();
  });

  addCustomizedToCartBtn?.addEventListener("click", () => {
    if (!currentCustomizingDish) return;

    const sizeInput = $('input[name="dishSize"]:checked', sizeOptionsList);
    const sizeName = sizeInput ? sizeInput.value : "Standard";
    const selectedAddons = $$('input[name="dishAddon"]:checked', addonsOptionsList).map((chk) => chk.value);
    const note = customInstructions?.value.trim() || "";
    const unitPrice = recalcCustomPrice();

    addItemToCart({
      dishId: currentCustomizingDish.id,
      name: currentCustomizingDish.name,
      size: sizeName,
      addons: selectedAddons,
      note: note,
      unitPrice: unitPrice,
      qty: 1
    });

    closeCustomModal();
    openCartDrawer();
  });

  /* Menu Grid Action Delegation */
  menuGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const dishId = btn.dataset.id;
    const dish = MENU_DATA.find((d) => d.id === dishId);
    if (!dish) return;

    if (action === "customize") {
      openCustomModal(dishId);
    } else if (action === "add-direct") {
      addItemToCart({
        dishId: dish.id,
        name: dish.name,
        size: dish.sizes && dish.sizes[0] ? dish.sizes[0].name : "Standard",
        addons: [],
        note: "",
        unitPrice: dish.price,
        qty: 1
      });
      showToast(`Added ${dish.name} to cart! 🛒`);
    } else if (action === "inc") {
      changeItemQty(dishId, 1);
    } else if (action === "dec") {
      changeItemQty(dishId, -1);
    }
  });

  /* ==========================================================================
     SHOPPING CART MANAGEMENT & BILLING
     ========================================================================== */
  const cartIcon = $("#cartIcon");
  const closeCartBtn = $("#closeCart");
  const cartSidebar = $("#cartSidebar");
  const cartBackdrop = $("#cartBackdrop");
  const cartItemsContainer = $("#cartItems");
  const cartCountEl = $("#cartCount");
  const cartSidebarItemCount = $("#cartSidebarItemCount");
  const billSubtotal = $("#billSubtotal");
  const billDelivery = $("#billDelivery");
  const billDiscount = $("#billDiscount");
  const billTaxes = $("#billTaxes");
  const cartGrandTotal = $("#cartGrandTotal");
  const discountRow = $("#discountRow");
  const floatingCartBar = $("#floatingCartBar");
  const floatCartCount = $("#floatCartCount");
  const floatCartTotal = $("#floatCartTotal");
  const floatCartBtn = $("#floatCartBtn");

  const persistCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const openCartDrawer = () => {
    cartSidebar?.classList.add("active");
    cartBackdrop?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeCartDrawer = () => {
    cartSidebar?.classList.remove("active");
    cartBackdrop?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  };

  window.closeCartDrawer = closeCartDrawer;

  cartIcon?.addEventListener("click", openCartDrawer);
  closeCartBtn?.addEventListener("click", closeCartDrawer);
  cartBackdrop?.addEventListener("click", closeCartDrawer);
  floatCartBtn?.addEventListener("click", openCartDrawer);

  $("#cartEmptyExploreBtn")?.addEventListener("click", () => {
    closeCartDrawer();
    $("#menu")?.scrollIntoView({ behavior: "smooth" });
  });

  // Order Type selector (Delivery / Takeaway / Dine-in)
  $$('input[name="orderType"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      $$(".type-pill").forEach((pill) => pill.classList.remove("active"));
      radio.closest(".type-pill")?.classList.add("active");
      activeOrderType = radio.value;
      updateCartUI();
    });
  });

  const addItemToCart = (newItem) => {
    // Check if an identical item exists (same dishId, size, addons, notes)
    const matchIndex = cart.findIndex((item) => {
      return (
        item.dishId === newItem.dishId &&
        item.size === newItem.size &&
        JSON.stringify(item.addons || []) === JSON.stringify(newItem.addons || []) &&
        (item.note || "") === (newItem.note || "")
      );
    });

    if (matchIndex > -1) {
      cart[matchIndex].qty += newItem.qty;
    } else {
      cart.push(newItem);
    }

    persistCart();
    updateCartUI();
    renderMenu();

    if (cartCountEl) {
      cartCountEl.classList.remove("bounce");
      void cartCountEl.offsetWidth; // Trigger reflow
      cartCountEl.classList.add("bounce");
    }
  };

  const changeItemQty = (dishId, delta) => {
    const itemIndex = cart.findIndex((i) => i.dishId === dishId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    persistCart();
    updateCartUI();
    renderMenu();
  };

  const removeItemByIndex = (index) => {
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      persistCart();
      updateCartUI();
      renderMenu();
    }
  };

  const calculateBill = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

    let deliveryFee = activeOrderType === "Delivery" ? 40 : 0;
    if (subtotal >= 499 || subtotal === 0) deliveryFee = 0;

    let discount = 0;
    if (activeCoupon) {
      const c = COUPONS[activeCoupon];
      if (c && subtotal >= c.minOrder) {
        if (c.type === "flat") {
          discount = c.value;
        } else if (c.type === "percent") {
          discount = Math.min((subtotal * c.value) / 100, c.maxDiscount || 9999);
        } else if (c.type === "freedel") {
          deliveryFee = 0;
        }
      }
    }

    const taxes = Math.round(subtotal * 0.05); // 5% GST & packaging
    const grandTotal = Math.max(0, Math.round(subtotal + deliveryFee + taxes - discount));

    return { subtotal, deliveryFee, discount, taxes, grandTotal };
  };

  const updateCartUI = () => {
    const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const { subtotal, deliveryFee, discount, taxes, grandTotal } = calculateBill();

    if (cartCountEl) cartCountEl.textContent = String(totalItemsCount);
    if (cartSidebarItemCount) cartSidebarItemCount.textContent = `(${totalItemsCount} items)`;
    if (billSubtotal) billSubtotal.textContent = String(subtotal);
    if (billDelivery) billDelivery.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
    if (billTaxes) billTaxes.textContent = String(taxes);
    if (cartGrandTotal) cartGrandTotal.textContent = String(grandTotal);

    if (discountRow && billDiscount) {
      if (discount > 0) {
        discountRow.removeAttribute("hidden");
        billDiscount.textContent = String(discount);
      } else {
        discountRow.setAttribute("hidden", "");
      }
    }

    // Floating Mobile Bar
    if (floatingCartBar) {
      if (totalItemsCount > 0) {
        floatingCartBar.removeAttribute("hidden");
        if (floatCartCount) floatCartCount.textContent = `${totalItemsCount} Item${totalItemsCount > 1 ? "s" : ""}`;
        if (floatCartTotal) floatCartTotal.textContent = String(grandTotal);
      } else {
        floatingCartBar.setAttribute("hidden", "");
      }
    }

    // Cart Items Container
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-view">
          <span class="empty-cart-icon">🛒</span>
          <h4>Your cart is empty!</h4>
          <p>Add some delicious pizzas, burgers or pastas from our curated menu.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="closeCartDrawer(); window.location.hash='#menu';">Explore Menu</button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart
        .map((item, idx) => {
          const addonsText = item.addons && item.addons.length ? item.addons.join(", ") : "";
          return `
          <div class="cart-item-row">
            <div class="cart-item-details">
              <div class="cart-item-name">${escapeHtml(item.name)}</div>
              <div class="cart-item-notes">
                <span>${escapeHtml(item.size)}</span>
                ${addonsText ? ` • <span>+ ${escapeHtml(addonsText)}</span>` : ""}
                ${item.note ? ` • <span style="font-style:italic">"${escapeHtml(item.note)}"</span>` : ""}
              </div>
              <div class="cart-item-price">₹${item.unitPrice * item.qty}</div>
            </div>

            <div class="cart-item-controls">
              <button type="button" class="cart-item-delete" data-remove-index="${idx}" aria-label="Remove item">✕</button>
              <div class="card-qty-stepper">
                <button type="button" data-cart-dec="${idx}" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-inc="${idx}" aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        `;
        })
        .join("");
    }
  };

  // Cart item increment/decrement/remove delegation
  cartItemsContainer?.addEventListener("click", (e) => {
    const delBtn = e.target.closest("[data-remove-index]");
    if (delBtn) {
      removeItemByIndex(Number(delBtn.dataset.removeIndex));
      return;
    }

    const incBtn = e.target.closest("[data-cart-inc]");
    if (incBtn) {
      const idx = Number(incBtn.dataset.cartInc);
      if (cart[idx]) {
        cart[idx].qty += 1;
        persistCart();
        updateCartUI();
        renderMenu();
      }
      return;
    }

    const decBtn = e.target.closest("[data-cart-dec]");
    if (decBtn) {
      const idx = Number(decBtn.dataset.cartDec);
      if (cart[idx]) {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        persistCart();
        updateCartUI();
        renderMenu();
      }
      return;
    }
  });

  /* ==========================================================================
     PROMO CODE LOGIC
     ========================================================================== */
  const cartCouponInput = $("#cartCouponInput");
  const applyCouponBtn = $("#applyCouponBtn");
  const appliedCouponTag = $("#appliedCouponTag");
  const appliedCouponCode = $("#appliedCouponCode");
  const appliedCouponDiscountText = $("#appliedCouponDiscountText");
  const removeCouponBtn = $("#removeCouponBtn");

  const applyPromo = (code) => {
    const cleanCode = (code || "").toUpperCase().trim();
    if (!COUPONS[cleanCode]) {
      showToast("Invalid Promo Code. Try ROYAL50, FIRSTBITE, or FREEDEL.", "error");
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    const coupon = COUPONS[cleanCode];

    if (subtotal < coupon.minOrder) {
      showToast(`Add items worth ₹${coupon.minOrder - subtotal} more to use ${cleanCode}`, "error");
      return;
    }

    activeCoupon = cleanCode;
    if (appliedCouponTag) appliedCouponTag.removeAttribute("hidden");
    if (appliedCouponCode) appliedCouponCode.textContent = cleanCode;
    if (appliedCouponDiscountText) appliedCouponDiscountText.textContent = coupon.desc;
    if (cartCouponInput) cartCouponInput.value = cleanCode;

    updateCartUI();
    showToast(`Coupon ${cleanCode} applied successfully! 🎉`);
  };

  const removePromo = () => {
    activeCoupon = null;
    if (appliedCouponTag) appliedCouponTag.setAttribute("hidden", "");
    if (cartCouponInput) cartCouponInput.value = "";
    updateCartUI();
    showToast("Coupon removed.");
  };

  applyCouponBtn?.addEventListener("click", () => {
    applyPromo(cartCouponInput?.value);
  });

  removeCouponBtn?.addEventListener("click", removePromo);

  window.copyCouponCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Copied ${code}! Apply it in your cart. 🎁`);
      openCartDrawer();
      if (cartCouponInput) cartCouponInput.value = code;
    }).catch(() => {
      if (cartCouponInput) cartCouponInput.value = code;
      openCartDrawer();
    });
  };

  window.applyPromoCodeDirect = (code) => {
    window.copyCouponCode(code);
    applyPromo(code);
  };

  $$(".btn-copy-code").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.coupon;
      if (code) window.applyPromoCodeDirect(code);
    });
  });

  /* ==========================================================================
     WHATSAPP ORDER DISPATCH
     ========================================================================== */
  const whatsappCheckoutBtn = $("#whatsappCheckoutBtn");

  const buildWhatsAppOrderMessage = () => {
    if (cart.length === 0) return "";

    const { subtotal, deliveryFee, discount, taxes, grandTotal } = calculateBill();

    let msg = `👑 *ROYAL BITES — NEW ORDER* 👑\n`;
    msg += `--------------------------------\n`;
    msg += `📍 *Order Type:* ${activeOrderType}\n\n`;
    msg += `🍽️ *ITEMS ORDERED:*\n`;

    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}* (x${item.qty})\n`;
      msg += `   └ Portion: ${item.size}\n`;
      if (item.addons && item.addons.length) {
        msg += `   └ Extras: ${item.addons.join(", ")}\n`;
      }
      if (item.note) {
        msg += `   └ Note: ${item.note}\n`;
      }
      msg += `   └ Price: ₹${item.unitPrice * item.qty}\n`;
    });

    msg += `\n--------------------------------\n`;
    msg += `💰 *Subtotal:* ₹${subtotal}\n`;
    if (deliveryFee > 0) msg += `🛵 *Delivery:* ₹${deliveryFee}\n`;
    if (discount > 0) msg += `🎉 *Coupon (${activeCoupon}):* -₹${discount}\n`;
    msg += `🧾 *GST & Packaging (5%):* ₹${taxes}\n`;
    msg += `🔥 *GRAND TOTAL:* *₹${grandTotal}*\n`;
    msg += `--------------------------------\n`;
    msg += `Please confirm my order and share the live delivery ETA. Thank you!`;

    return msg;
  };

  whatsappCheckoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Please add items to your cart first!", "error");
      return;
    }
    const message = buildWhatsAppOrderMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  /* ==========================================================================
     DIRECT ONLINE IN-APP CHECKOUT MODAL
     ========================================================================== */
  const checkoutModal = $("#checkoutModal");
  const openCheckoutModalBtn = $("#openCheckoutModalBtn");
  const closeCheckoutModalBtn = $("#closeCheckoutModal");
  const directCheckoutForm = $("#directCheckoutForm");
  const checkoutItemsList = $("#checkoutItemsList");
  const checkPayableAmount = $("#checkPayableAmount");

  const openCheckoutModal = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }

    const { grandTotal } = calculateBill();
    if (checkPayableAmount) checkPayableAmount.textContent = String(grandTotal);

    if (checkoutItemsList) {
      checkoutItemsList.innerHTML = cart
        .map(
          (item) => `
        <div class="mini-check-row">
          <span>${item.qty}x ${escapeHtml(item.name)} (${escapeHtml(item.size)})</span>
          <strong>₹${item.unitPrice * item.qty}</strong>
        </div>
      `
        )
        .join("");
    }

    closeCartDrawer();
    checkoutModal?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeCheckoutModal = () => {
    checkoutModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  };

  openCheckoutModalBtn?.addEventListener("click", openCheckoutModal);
  closeCheckoutModalBtn?.addEventListener("click", closeCheckoutModal);
  checkoutModal?.addEventListener("click", (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Payment Option radio highlight
  $$(".pay-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      $$(".pay-option").forEach((p) => p.classList.remove("selected"));
      opt.classList.add("selected");
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  /* ==========================================================================
     ORDER CONFIRMATION & PRINTABLE INVOICE
     ========================================================================== */
  const orderSuccessModal = $("#orderSuccessModal");
  const invOrderId = $("#invOrderId");
  const invDateTime = $("#invDateTime");
  const invPayMode = $("#invPayMode");
  const invCustomerInfo = $("#invCustomerInfo");
  const invItemsBody = $("#invItemsBody");
  const invSubtotal = $("#invSubtotal");
  const invDelivery = $("#invDelivery");
  const invDiscount = $("#invDiscount");
  const invTaxes = $("#invTaxes");
  const invGrandTotal = $("#invGrandTotal");
  const printReceiptBtn = $("#printReceiptBtn");
  const trackThisOrderBtn = $("#trackThisOrderBtn");

  let latestOrderId = null;

  directCheckoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!directCheckoutForm.checkValidity()) {
      directCheckoutForm.reportValidity();
      return;
    }

    const fullName = $("#checkFullName")?.value.trim() || "Valued Guest";
    const phone = $("#checkPhone")?.value.trim() || "";
    const address = $("#checkAddress")?.value.trim() || "";
    const landmark = $("#checkLandmark")?.value.trim() || "";
    const pincode = $("#checkPincode")?.value.trim() || "201310";
    const payMode = $('input[name="payMethod"]:checked')?.value || "UPI";

    const { subtotal, deliveryFee, discount, taxes, grandTotal } = calculateBill();
    const orderId = `RB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    latestOrderId = orderId;

    const orderRecord = {
      orderId,
      customerName: fullName,
      phone,
      address: `${address}, ${landmark} (${pincode})`,
      payMode,
      items: [...cart],
      bill: { subtotal, deliveryFee, discount, taxes, grandTotal },
      timestamp: new Date().toLocaleString(),
      status: "Preparing"
    };

    // Save order
    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      orders.unshift(orderRecord);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 10)));
    } catch (err) {
      console.error(err);
    }

    // Populate Invoice Slip
    if (invOrderId) invOrderId.textContent = orderId;
    if (invDateTime) invDateTime.textContent = orderRecord.timestamp;
    if (invPayMode) invPayMode.textContent = payMode;
    if (invCustomerInfo) invCustomerInfo.textContent = `${fullName} (${phone}) - ${address}`;

    if (invItemsBody) {
      invItemsBody.innerHTML = cart
        .map(
          (item) => `
        <tr>
          <td>${escapeHtml(item.name)} <small>(${escapeHtml(item.size)})</small></td>
          <td>${item.qty}</td>
          <td>₹${item.unitPrice * item.qty}</td>
        </tr>
      `
        )
        .join("");
    }

    if (invSubtotal) invSubtotal.textContent = `₹${subtotal}`;
    if (invDelivery) invDelivery.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
    if (invDiscount) invDiscount.textContent = `-₹${discount}`;
    if (invTaxes) invTaxes.textContent = `₹${taxes}`;
    if (invGrandTotal) invGrandTotal.textContent = `₹${grandTotal}`;

    // Clear cart
    cart = [];
    persistCart();
    updateCartUI();
    renderMenu();

    closeCheckoutModal();
    orderSuccessModal?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  });

  printReceiptBtn?.addEventListener("click", () => {
    window.print();
  });

  trackThisOrderBtn?.addEventListener("click", () => {
    orderSuccessModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";

    if (latestOrderId) {
      const trackInput = $("#trackOrderIdInput");
      if (trackInput) trackInput.value = latestOrderId;
      trackOrderById(latestOrderId);
      $("#trackSection")?.scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ==========================================================================
     LIVE ORDER TRACKER
     ========================================================================== */
  const trackOrderForm = $("#trackOrderForm");
  const trackOrderIdInput = $("#trackOrderIdInput");
  const liveOrderTrackerCard = $("#liveOrderTrackerCard");
  const displayTrackerOrderId = $("#displayTrackerOrderId");
  const trackerCustomerName = $("#trackerCustomerName");
  const trackerEtaTime = $("#trackerEtaTime");
  const stepProgressBar = $("#stepProgressBar");

  const trackOrderById = (id) => {
    const cleanId = (id || "").trim().toUpperCase();
    if (!cleanId) return;

    if (displayTrackerOrderId) displayTrackerOrderId.textContent = cleanId;
    if (trackerCustomerName) trackerCustomerName.textContent = "Customer: Verified Diner";
    if (trackerEtaTime) trackerEtaTime.textContent = "22 Mins";

    // Dynamic Simulated Progression
    if (stepProgressBar) stepProgressBar.style.width = "66%";
    $("#step1")?.classList.add("active");
    $("#step2")?.classList.add("active");
    $("#step3")?.classList.add("active");
    $("#step4")?.classList.remove("active");

    liveOrderTrackerCard?.removeAttribute("hidden");
    showToast(`Tracking status updated for ${cleanId} 🛵`);
  };

  trackOrderForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = trackOrderIdInput?.value.trim();
    if (id) trackOrderById(id);
  });

  /* ==========================================================================
     TABLE RESERVATION SYSTEM
     ========================================================================== */
  const reservationForm = $("#reservationForm");
  const resDateInput = $("#resDate");
  const reservationSuccessModal = $("#reservationSuccessModal");
  const closeResSuccessModal = $("#closeResSuccessModal");
  const ticketBookingId = $("#ticketBookingId");
  const ticketName = $("#ticketName");
  const ticketGuests = $("#ticketGuests");
  const ticketDateTime = $("#ticketDateTime");
  const ticketArea = $("#ticketArea");
  const ticketOccasion = $("#ticketOccasion");
  const whatsappResShareBtn = $("#whatsappResShareBtn");

  if (resDateInput) {
    const today = new Date().toISOString().split("T")[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  reservationForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!reservationForm.checkValidity()) {
      reservationForm.reportValidity();
      return;
    }

    const name = $("#resName")?.value.trim() || "Guest";
    const phone = $("#resPhone")?.value.trim() || "";
    const email = $("#resEmail")?.value.trim() || "";
    const guests = $("#resGuests")?.value || "2";
    const date = $("#resDate")?.value || "";
    const time = $("#resTime")?.value || "";
    const area = $("#resArea")?.value || "Indoor AC Lounge";
    const occasion = $("#resOccasion")?.value || "Casual Dining";
    const notes = $("#resNotes")?.value.trim() || "";

    const bookingId = `RB-RES-${Math.floor(1000 + Math.random() * 9000)}`;

    if (ticketBookingId) ticketBookingId.textContent = bookingId;
    if (ticketName) ticketName.textContent = name;
    if (ticketGuests) ticketGuests.textContent = `${guests} Guests`;
    if (ticketDateTime) ticketDateTime.textContent = `${date} at ${time}`;
    if (ticketArea) ticketArea.textContent = area;
    if (ticketOccasion) ticketOccasion.textContent = occasion;

    if (whatsappResShareBtn) {
      const shareMsg = `👑 *Royal Bites Table Reservation Confirmation*\n\nBooking ID: ${bookingId}\nName: ${name}\nGuests: ${guests}\nDate & Time: ${date} at ${time}\nSeating: ${area}\nOccasion: ${occasion}${notes ? `\nSpecial Request: ${notes}` : ""}\n\nSee you soon at Royal Bites Greater Noida!`;
      whatsappResShareBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(shareMsg)}`;
    }

    reservationSuccessModal?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    reservationForm.reset();
  });

  closeResSuccessModal?.addEventListener("click", () => {
    reservationSuccessModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  });

  reservationSuccessModal?.addEventListener("click", (e) => {
    if (e.target === reservationSuccessModal) {
      reservationSuccessModal.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }
  });

  /* ==========================================================================
     CUSTOMER REVIEWS & LIVE SUBMISSION
     ========================================================================== */
  const defaultReviews = [
    {
      author: "Aarav Gupta",
      rating: 5,
      dish: "Truffle Cheese Burst Pizza",
      date: "2 days ago",
      text: "Hands down the best artisan pizza in Greater Noida! The truffle aroma and molten cheese crust blew us away. Fast delivery too!"
    },
    {
      author: "Meera Singhania",
      rating: 5,
      dish: "Royal Double Smash Burger",
      date: "1 week ago",
      text: "The brioche bun is ultra soft, patties are super juicy, and the crinkle fries were piping hot. Truly royal hospitality."
    },
    {
      author: "Dr. Rohan Verma",
      rating: 5,
      dish: "Truffle Alfredo Pasta & Lava Cake",
      date: "2 weeks ago",
      text: "Booked a table for our anniversary on the rooftop. Complimentary welcome drinks and outstanding white sauce pasta. 10/10 experience!"
    },
    {
      author: "Pooja Malhotra",
      rating: 5,
      dish: "Peri-Peri Paneer Pizza",
      date: "3 weeks ago",
      text: "Authentic wood-fired taste and genuine pure veg safety. We order almost every weekend from here now."
    }
  ];

  let reviewsList = [];
  try {
    const savedRev = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "null");
    reviewsList = Array.isArray(savedRev) && savedRev.length > 0 ? savedRev : defaultReviews;
  } catch {
    reviewsList = defaultReviews;
  }

  const reviewsGrid = $("#reviewsGrid");
  const renderReviews = () => {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = reviewsList
      .map(
        (rev) => `
      <article class="review-card">
        <div class="review-card-header">
          <div class="reviewer-profile">
            <div class="reviewer-avatar">${escapeHtml(rev.author.charAt(0))}</div>
            <div>
              <div class="reviewer-name">${escapeHtml(rev.author)}</div>
              <span class="verified-badge">✓ Verified Diner</span>
            </div>
          </div>
          <div class="review-stars">${"★".repeat(rev.rating)}</div>
        </div>

        ${rev.dish ? `<span class="review-dish-tag">Ordered: ${escapeHtml(rev.dish)}</span>` : ""}
        <p class="review-text">"${escapeHtml(rev.text)}"</p>
        <span class="review-date">${escapeHtml(rev.date)}</span>
      </article>
    `
      )
      .join("");
  };

  const reviewModal = $("#reviewModal");
  const writeReviewBtn = $("#writeReviewBtn");
  const closeReviewModalBtn = $("#closeReviewModal");
  const writeReviewForm = $("#writeReviewForm");
  const starRatingPicker = $("#starRatingPicker");
  let selectedReviewStars = 5;

  writeReviewBtn?.addEventListener("click", () => {
    reviewModal?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  });

  closeReviewModalBtn?.addEventListener("click", () => {
    reviewModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  });

  reviewModal?.addEventListener("click", (e) => {
    if (e.target === reviewModal) {
      reviewModal.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }
  });

  starRatingPicker?.addEventListener("click", (e) => {
    const starBtn = e.target.closest(".star-picker-btn");
    if (!starBtn) return;
    selectedReviewStars = Number(starBtn.dataset.stars) || 5;

    $$(".star-picker-btn", starRatingPicker).forEach((btn) => {
      const starVal = Number(btn.dataset.stars) || 0;
      btn.classList.toggle("active", starVal <= selectedReviewStars);
    });
  });

  writeReviewForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!writeReviewForm.checkValidity()) {
      writeReviewForm.reportValidity();
      return;
    }

    const author = $("#revAuthor")?.value.trim() || "Anonymous Diner";
    const dish = $("#revDish")?.value.trim() || "Special Menu Item";
    const comment = $("#revComment")?.value.trim() || "";

    const newRev = {
      author,
      rating: selectedReviewStars,
      dish,
      date: "Just now",
      text: comment
    };

    reviewsList.unshift(newRev);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviewsList.slice(0, 20)));

    renderReviews();
    writeReviewForm.reset();
    reviewModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";
    showToast("Thank you for sharing your royal review! ⭐");
  });

  /* ==========================================================================
     GALLERY LIGHTBOX
     ========================================================================== */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxDesc = $("#lightboxDesc");
  const closeLightboxBtn = $("#closeLightbox");

  const openLightbox = (src, title, desc) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || "Royal Bites Signature";
    if (lightboxDesc) lightboxDesc.textContent = desc || "";
    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.setAttribute("hidden", "");
    document.body.style.overflow = "";
  };

  $$(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.dataset.title;
      const desc = item.dataset.desc;
      if (img) openLightbox(img.src, title, desc);
    });
  });

  closeLightboxBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ==========================================================================
     FAQ ACCORDION
     ========================================================================== */
  $$(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      $$(".faq-question").forEach((otherBtn) => {
        otherBtn.setAttribute("aria-expanded", "false");
      });
      btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    });
  });

  /* ==========================================================================
     CONTACT FORM
     ========================================================================== */
  const contactForm = $("#contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const name = $("#contactName")?.value.trim() || "there";
    showToast(`Thank you ${name}! We have received your message and will respond shortly.`);
    contactForm.reset();
  });

  /* ==========================================================================
     DESKTOP CURSOR GLOW
     ========================================================================== */
  const glow = $(".cursor-glow");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (glow && canHover) {
    window.addEventListener(
      "pointermove",
      (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     KEYBOARD NAVIGATION (ESCAPE KEY CLOSES OVERLAYS)
     ========================================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeCustomModal();
    closeCartDrawer();
    closeCheckoutModal();
    closeLightbox();
    closeMobileNav();
    reviewModal?.setAttribute("hidden", "");
    reservationSuccessModal?.setAttribute("hidden", "");
    orderSuccessModal?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  });

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  renderMenu();
  renderReviews();
  updateCartUI();

})();
