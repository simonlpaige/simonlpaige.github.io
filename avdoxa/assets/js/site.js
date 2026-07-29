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
