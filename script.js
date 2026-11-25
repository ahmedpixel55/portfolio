// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toast feedback
const toastEl = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2400);
}

// Copy email or phone number
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.getAttribute("data-copy");
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied: ${value}`);
    } catch {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast(`Copied: ${value}`);
    }
  });
});

// Light project details modal
const projectsData = {
  landing: {
    stack: "HTML5 • CSS3",
    title: "Minimal Silver Landing Page",
    desc: "A clean single-page layout built to practise silver-toned visual contrast, section hierarchy, and responsive spacing.",
    points: [
      "Used semantic HTML5 sections for clear structure",
      "Aligned cards and spacing using CSS Flexbox and Grid",
      "Checked responsiveness across mobile and desktop widths"
    ]
  },
  pricing: {
    stack: "HTML5 • CSS3 • JavaScript",
    title: "Plan & Pricing Cards",
    desc: "Simple pricing cards with an interactive billing switch to practise basic DOM state updates.",
    points: [
      "Updated card prices on toggle click with JavaScript",
      "Styled hover and active states cleanly",
      "Maintained equal height and alignment across plans"
    ]
  },
  checklist: {
    stack: "HTML5 • CSS3 • JavaScript",
    title: "Daily Checklist Widget",
    desc: "A lightweight task checklist created to practise adding, toggling, and removing items dynamically.",
    points: [
      "Handled form submission to append new tasks",
      "Toggled completed styling and deleted finished items",
      "Kept JavaScript functions small and readable"
    ]
  },
  faq: {
    stack: "HTML5 • CSS3 • JavaScript",
    title: "FAQ & Contact Layout",
    desc: "A clean support page combining expandable FAQ items with a simple contact form.",
    points: [
      "Built simple expand/collapse toggles for FAQ items",
      "Added clear input labels and form submission feedback",
      "Focused on readable spacing and form usability"
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalStack = document.getElementById("modalStack");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPoints = document.getElementById("modalPoints");

document.querySelectorAll(".open-project-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-project");
    const project = projectsData[key];
    if (!project || !modal) return;

    modalStack.textContent = project.stack;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalPoints.innerHTML = project.points.map((item) => `<li>${item}</li>`).join("");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Quick contact form message
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("nameInput").value.trim();
    formFeedback.textContent = `Thanks, ${name}! You can reach me directly at ahmed575moumen@gmail.com or 01092994431.`;
    contactForm.reset();
  });
}
