const menuButton = document.querySelector("[data-menu-button]");
const mobileDrawer = document.querySelector("[data-mobile-drawer]");
const mobileLinks = mobileDrawer ? [...mobileDrawer.querySelectorAll("a")] : [];

function setMenu(open) {
  if (!menuButton || !mobileDrawer) return;
  menuButton.setAttribute("aria-expanded", String(open));
  mobileDrawer.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  if (open) mobileLinks[0]?.focus();
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileDrawer && !mobileDrawer.hidden) {
    setMenu(false);
    menuButton?.focus();
    return;
  }
  if (event.key !== "Tab" || mobileDrawer?.hidden) return;

  const focusable = [menuButton, ...mobileLinks].filter(Boolean);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 960) setMenu(false);
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
}

const serviceForm = document.querySelector("[data-service-form]");
const formStatus = document.querySelector("[data-form-status]");

serviceForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(serviceForm);
  const organization = String(data.get("organization") || "").trim();
  const priority = String(data.get("priority") || "").trim();
  const subject = `AVDOXA service request - ${organization} - ${priority}`;
  const labels = [
    ["Organization", "organization"],
    ["Contact name", "contactName"],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Site location", "site"],
    ["Equipment", "equipment"],
    ["Symptoms", "symptoms"],
    ["Troubleshooting performed", "troubleshooting"],
    ["Priority", "priority"],
    ["Needed by", "neededBy"],
    ["Preferred contact", "preferredContact"]
  ];

  const body = labels
    .map(([label, key]) => `${label}:\n${String(data.get(key) || "Not provided").trim()}`)
    .join("\n\n");

  if (formStatus) {
    formStatus.hidden = false;
    formStatus.textContent = "Your service request is ready. Your email application should open with the details filled in.";
  }

  window.location.href = `mailto:info@avdoxa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const galleryDialog = document.querySelector("[data-gallery-dialog]");
const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];

if (galleryDialog && galleryItems.length) {
  const dialogImage = galleryDialog.querySelector("[data-gallery-image]");
  const dialogCaption = galleryDialog.querySelector("[data-gallery-caption]");
  const dialogCount = galleryDialog.querySelector("[data-gallery-count]");
  const closeButton = galleryDialog.querySelector("[data-gallery-close]");
  const previousButton = galleryDialog.querySelector("[data-gallery-previous]");
  const nextButton = galleryDialog.querySelector("[data-gallery-next]");
  let activeIndex = 0;
  let opener = null;
  let touchStartX = 0;

  const showGalleryItem = (index) => {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeIndex];
    const src = item.dataset.gallerySrc || "";
    const alt = item.dataset.galleryAlt || "AVDOXA project image";
    if (dialogImage) {
      dialogImage.src = src;
      dialogImage.alt = alt;
    }
    if (dialogCaption) dialogCaption.textContent = alt;
    if (dialogCount) dialogCount.textContent = `${activeIndex + 1} of ${galleryItems.length}`;
  };

  const openGallery = (item, index) => {
    opener = item;
    showGalleryItem(index);
    if (typeof galleryDialog.showModal === "function") galleryDialog.showModal();
    else galleryDialog.setAttribute("open", "");
    document.body.classList.add("gallery-open");
    closeButton?.focus();
  };

  const closeGallery = () => {
    if (typeof galleryDialog.close === "function") galleryDialog.close();
    else {
      galleryDialog.removeAttribute("open");
      document.body.classList.remove("gallery-open");
      opener?.focus();
    }
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openGallery(item, index));
  });

  closeButton?.addEventListener("click", closeGallery);
  previousButton?.addEventListener("click", () => showGalleryItem(activeIndex - 1));
  nextButton?.addEventListener("click", () => showGalleryItem(activeIndex + 1));

  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) closeGallery();
  });

  galleryDialog.addEventListener("close", () => {
    document.body.classList.remove("gallery-open");
    opener?.focus();
  });
  galleryDialog.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });
  galleryDialog.addEventListener("touchend", (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) < 48) return;
    showGalleryItem(activeIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!galleryDialog.open) return;
    if (event.key === "ArrowLeft") showGalleryItem(activeIndex - 1);
    if (event.key === "ArrowRight") showGalleryItem(activeIndex + 1);
  });
}
