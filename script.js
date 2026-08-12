(() => {
  "use strict";

  const WHATSAPP_NUMBER = "917909608370";
  const CART_KEY = "royalBitesCart";
  const THEME_KEY = "royalBitesTheme";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  /* ---------- Loader ---------- */
  const loader = $("#loader");
  const hideLoader = () => {
    if (!loader || loader.dataset.done === "1") return;
    loader.dataset.done = "1";
    loader.style.opacity = "0";
    window.setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  };

  // Hide quickly after paint; also force-hide if images on USB hang
  window.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(hideLoader, 900);
  });
  window.addEventListener("load", () => {
    window.setTimeout(hideLoader, 200);
  });
  window.setTimeout(hideLoader, 2500);

  /* ---------- Theme ---------- */
  const themeBtn = $("#themeToggle");
  const applyTheme = (mode) => {
    const isLight = mode === "light";
    document.body.classList.toggle("light", isLight);
    if (themeBtn) themeBtn.textContent = isLight ? "☀️" : "🌙";
    document.documentElement.style.colorScheme = isLight ? "light" : "dark";
  };

  applyTheme(localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark");

  themeBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------- Mobile nav ---------- */
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  const closeMobileNav = () => {
    navLinks?.classList.remove("active");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  $$(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  /* ---------- Scroll: progress + back to top ---------- */
  const progressBar = $("#progressBar");
  const topBtn = $("#topBtn");

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${progress}%`;

    if (topBtn) {
      if (scrollTop > 320) topBtn.removeAttribute("hidden");
      else topBtn.setAttribute("hidden", "");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = $$(
    ".about, .menu, .gallery, .stats, .reviews, .contact, .location, .reservation"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach((el) => {
      el.classList.add("hidden");
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add("show"));
  }

  /* ---------- Counters (when visible) ---------- */
  const counters = $$(".counter");
  let countersStarted = false;

  const runCounters = () => {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target) || 0;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(target * eased);

        if (t < 1) {
          counter.textContent = String(value);
          requestAnimationFrame(tick);
        } else if (target === 5000) {
          counter.textContent = "5000+";
        } else if (target === 5) {
          counter.textContent = "4.9★";
        } else {
          counter.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(tick);
    });
  };

  const statsSection = $(".stats");
  if (statsSection && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          runCounters();
          counterObserver.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    counterObserver.observe(statsSection);
  } else {
    runCounters();
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const closeLightboxBtn = $("#closeLightbox");

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Gallery image";
    lightbox.removeAttribute("hidden");
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.setAttribute("hidden", "");
    lightbox.classList.remove("open");
    if (lightboxImg) lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  $$(".gallery-container img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
    img.tabIndex = 0;
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  closeLightboxBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Cart ---------- */
  const cartIcon = $("#cartIcon");
  const cartSidebar = $("#cartSidebar");
  const closeCart = $("#closeCart");
  const cartItemsEl = $("#cartItems");
  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");
  const cartPopup = $("#cartPopup");
  const checkoutBtn = $("#checkoutBtn");

  let cart = [];

  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (Array.isArray(saved)) cart = saved;
  } catch {
    cart = [];
  }

  const persistCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const openCart = () => cartSidebar?.classList.add("active");
  const hideCart = () => cartSidebar?.classList.remove("active");

  cartIcon?.addEventListener("click", openCart);
  closeCart?.addEventListener("click", hideCart);

  const showCartToast = () => {
    if (!cartPopup) return;
    cartPopup.classList.add("show");
    window.setTimeout(() => cartPopup.classList.remove("show"), 1800);
  };

  const updateCart = () => {
    if (!cartItemsEl || !cartCount || !cartTotal) return;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    } else {
      cartItemsEl.innerHTML = cart
        .map(
          (item, index) => `
        <div class="cart-item">
          <p>${escapeHtml(item.name)}</p>
          <h4>₹${item.price}</h4>
          <button type="button" data-remove="${index}" aria-label="Remove ${escapeHtml(item.name)}">✕</button>
        </div>`
        )
        .join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartCount.textContent = String(cart.length);
    cartTotal.textContent = String(total);
    persistCart();
  };

  const addItemToCart = (name, price) => {
    const safePrice = Number(price);
    if (!name || Number.isNaN(safePrice)) return;

    cart.push({ name: String(name), price: safePrice });
    updateCart();
    showCartToast();
    openCart();
  };

  cartItemsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const index = Number(btn.dataset.remove);
    if (Number.isNaN(index)) return;
    cart.splice(index, 1);
    updateCart();
  });

  $$(".order-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "heroOrder") {
        openMenuPopup();
        return;
      }

      const name =
        button.dataset.name ||
        button.closest(".card")?.querySelector("h3")?.textContent?.trim();
      const price =
        button.dataset.price ||
        button
          .closest(".card")
          ?.querySelector("h4")
          ?.textContent?.replace(/[^\d]/g, "");

      addItemToCart(name, price);
    });
  });

  $$(".popupAdd").forEach((button) => {
    button.addEventListener("click", () => {
      addItemToCart(button.dataset.name, button.dataset.price);
    });
  });

  const buildWhatsAppOrderUrl = () => {
    let message = "Royal Bites Order\n\n";
    cart.forEach((item) => {
      message += `${item.name} - ₹${item.price}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal: ₹${total}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const checkout = () => {
    if (cart.length === 0) {
      showDialog("Cart is empty", "Add something delicious before checkout.");
      return;
    }
    window.open(buildWhatsAppOrderUrl(), "_blank", "noopener,noreferrer");
  };

  checkoutBtn?.addEventListener("click", checkout);
  updateCart();

  /* ---------- Full menu popup ---------- */
  const menuPopup = $("#menuPopup");
  const closeMenu = $("#closeMenu");
  const menuSearch = $("#menuSearch");

  const openMenuPopup = () => {
    if (!menuPopup) return;
    menuPopup.removeAttribute("hidden");
    menuPopup.classList.add("open");
    document.body.style.overflow = "hidden";
    menuSearch?.focus();
  };

  const closeMenuPopup = () => {
    if (!menuPopup) return;
    menuPopup.setAttribute("hidden", "");
    menuPopup.classList.remove("open");
    document.body.style.overflow = "";
    if (menuSearch) menuSearch.value = "";
    $$(".popup-item").forEach((item) => {
      item.style.display = "";
    });
    $$(".menu-category").forEach((cat) => {
      cat.style.display = "";
    });
  };

  ["#openMenu", "#exploreMenu"].forEach((sel) => {
    $(sel)?.addEventListener("click", (e) => {
      e.preventDefault();
      openMenuPopup();
    });
  });

  closeMenu?.addEventListener("click", closeMenuPopup);
  menuPopup?.addEventListener("click", (e) => {
    if (e.target === menuPopup) closeMenuPopup();
  });

  menuSearch?.addEventListener("input", () => {
    const query = menuSearch.value.trim().toLowerCase();

    $$(".menu-category").forEach((category) => {
      let visible = 0;
      $$(".popup-item", category).forEach((item) => {
        const haystack =
          (item.dataset.search || item.textContent || "").toLowerCase();
        const match = !query || haystack.includes(query);
        item.style.display = match ? "" : "none";
        if (match) visible += 1;
      });
      category.style.display = visible ? "" : "none";
    });
  });

  /* ---------- Dialogs ---------- */
  const successPopup = $("#successPopup");
  const successTitle = $("#successTitle");
  const successMessage = $("#successMessage");
  const closePopup = $("#closePopup");

  const showDialog = (title, message) => {
    if (!successPopup) return;
    if (successTitle) successTitle.textContent = title;
    if (successMessage) successMessage.textContent = message;
    successPopup.removeAttribute("hidden");
    successPopup.classList.add("open");
  };

  const hideDialog = () => {
    successPopup?.setAttribute("hidden", "");
    successPopup?.classList.remove("open");
  };

  closePopup?.addEventListener("click", hideDialog);
  successPopup?.addEventListener("click", (e) => {
    if (e.target === successPopup) hideDialog();
  });

  /* ---------- Reservation ---------- */
  const reservationForm = $("#reservationForm");
  const resDate = $("#resDate");

  if (resDate) {
    const today = new Date().toISOString().split("T")[0];
    resDate.min = today;
  }

  reservationForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!reservationForm.checkValidity()) {
      reservationForm.reportValidity();
      return;
    }

    const name = $("#resName")?.value.trim();
    const guests = $("#resGuests")?.value;
    const date = $("#resDate")?.value;
    const time = $("#resTime")?.value;

    showDialog(
      "Booking Successful!",
      `Thanks ${name}! Table for ${guests} on ${date} at ${time} is reserved.`
    );
    reservationForm.reset();
  });

  /* ---------- Contact ---------- */
  const contactForm = $("#contactForm");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = $("#contactName")?.value.trim() || "there";
    showDialog(
      "Message Sent!",
      `Thanks ${name}! We will get back to you shortly.`
    );
    contactForm.reset();
  });

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = $(".cursor-glow");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (glow && canHover) {
    glow.classList.add("active");
    window.addEventListener(
      "pointermove",
      (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      },
      { passive: true }
    );
  }

  /* ---------- Keyboard: Escape closes overlays ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    closeMenuPopup();
    hideDialog();
    hideCart();
    closeMobileNav();
  });
})();
