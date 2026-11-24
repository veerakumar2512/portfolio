/* ============================================================
   PROJECTS DATA — Veera Kumar R Portfolio
   High-End Showcase matching the Code & Chill / Hasibul Template
   ============================================================ */

const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "GREENPULSE",
    titleSuffix: "farmer-to-customer direct selling",
    desc: "A project focused on enabling direct selling between farmers and customers, helping bridge the gap between agricultural producers and end users.",
    longDesc: "GreenPulse is a direct selling platform concept for farmers to connect with customers more efficiently. The project aims to simplify access to fresh produce while supporting transparent buyer-seller exchange and local agricultural commerce.",
    tags: ["Web Development", "Agriculture", "Platform Design", "Python"],
    category: "web",
    date: "Feb 2026",
    github: null,
    live: null,
    outcome: "✦ Presented at Sasurie College",
    image: null,
    emoji: "🌾",
    color: "#22c55e",
    featured: true
  },
  {
    id: 2,
    number: "02",
    title: "Q-SYNC",
    titleSuffix: "smart traffic analysis",
    desc: "A smart traffic analysis concept designed to identify suitable routes and support smoother movement for emergency vehicles.",
    longDesc: "Q-Sync focuses on efficient route analysis and decision support for emergency vehicles. The concept evaluates traffic conditions to help reduce delays and improve the flow of critical movement in urban environments.",
    tags: ["Data Science", "Traffic Analysis", "Route Planning", "Python"],
    category: "data",
    date: "Sep 2026",
    github: null,
    live: null,
    outcome: "✦ Presented at SNS College",
    image: null,
    emoji: "🚑",
    color: "#3b82f6",
    featured: true
  },
  {
    id: 3,
    number: "03",
    title: "CARBON CONTROL",
    titleSuffix: "industrial sustainability",
    desc: "An industrial sustainability project focused on controlling and reducing carbon emissions in manufacturing and industrial settings.",
    longDesc: "This project explores ways to reduce carbon emissions in industries through monitoring, optimization, and sustainability-focused solutions. It reflects a practical interest in balancing industrial growth with environmental responsibility.",
    tags: ["Sustainability", "Data Analysis", "Industry", "Research"],
    category: "data",
    date: "Aug 2026",
    github: null,
    live: null,
    outcome: "✦ Presented at JCT College",
    image: null,
    emoji: "🌍",
    color: "#10b981",
    featured: true
  },
  {
    id: 4,
    number: "04",
    title: "PORTFOLIO",
    titleSuffix: "personal brand website",
    desc: "A personal portfolio website showcasing projects, academic background, and contact details in a polished and modern format.",
    longDesc: "This portfolio was designed to present Veera Kumar's work, learning journey, and technical interests in a clean digital format. It highlights web design, development skills, and project-based learning.",
    tags: ["HTML5", "CSS3", "JavaScript", "Portfolio"],
    category: "web",
    date: "Nov 2026",
    github: null,
    live: null,
    outcome: "✦ Personal website",
    image: null,
    emoji: "⚡",
    color: "#f59e0b",
    featured: false
  }
];

// ── Category filter mapping ─────────────────────────────
const CATEGORIES = [
  { key: "all",    label: "All Projects" },
  { key: "web",    label: "Web Dev" },
  { key: "python", label: "Python" },
  { key: "data",   label: "Data / SQL" }
];

// ── Helper: Hex to RGBA ──────────────────────────────────
function hexToRgba(hex, alpha = 1) {
  if (!hex || hex[0] !== "#") return `rgba(255,255,255,${alpha})`;
  let c = hex.slice(1);
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

// ── Render Filter Buttons ────────────────────────────────
function renderFilterButtons() {
  const container = document.getElementById("filter-btns");
  if (!container) return;

  container.innerHTML = CATEGORIES.map((cat) => `
    <button class="filter-btn ${cat.key === "all" ? "active" : ""}"
            data-filter="${cat.key}"
            role="tab"
            aria-selected="${cat.key === "all" ? "true" : "false"}">
      ${cat.label}
    </button>
  `).join("");

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderProjects(btn.dataset.filter);
    });
  });
}

// ── Render Projects Showcase ─────────────────────────────
function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => {
    const hasImage = Boolean(p.image);
    return `
      <article class="luxury-project-card fade-in"
               data-category="${p.category}"
               data-id="${p.id}"
               role="article"
               aria-label="Project: ${p.title}">
        
        <!-- Media Showcase -->
        <div class="project-media-wrap">
          ${hasImage ? `
            <img src="${p.image}" alt="${p.title} Preview" class="project-media-img" loading="lazy" />
          ` : `
            <div class="project-media-placeholder" style="background: radial-gradient(circle at center, ${hexToRgba(p.color, 0.18)}, #08080c 80%);">
              <span class="placeholder-emoji">${p.emoji}</span>
              <div class="placeholder-meta">${p.tags.slice(0, 3).join(" • ")}</div>
            </div>
          `}
          <div class="project-media-badge">
            <span>${p.number}</span>
          </div>
        </div>

        <!-- Project Info -->
        <div class="project-info-wrap">
          <div class="project-head">
            <span class="project-num-tag">${p.number}</span>
            <h3 class="project-title">
              <strong>${p.title}</strong> <em>${p.titleSuffix}</em>
            </h3>
          </div>

          <p class="project-desc">${p.desc}</p>

          ${p.outcome ? `
            <div class="project-metric">
              ${p.outcome}
            </div>
          ` : ""}

          <!-- Tag Cloud -->
          <div class="project-tags">
            ${p.tags.map((t) => `<span class="project-tag-pill">${t}</span>`).join("")}
          </div>

          <!-- Action Buttons -->
          <div class="project-actions">
            ${p.live ? `
              <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn-luxury btn-luxury-primary">
                Live Demo <span class="arrow">↗</span>
              </a>
            ` : ""}
            ${p.github ? `
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-luxury btn-luxury-outline">
                GitHub <span class="arrow">↗</span>
              </a>
            ` : ""}
            <button class="btn-luxury btn-luxury-ghost open-details-btn" data-id="${p.id}">
              Details
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach modal trigger listeners
  grid.querySelectorAll(".open-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = parseInt(btn.dataset.id, 10);
      openProjectModal(pid);
    });
  });

  // Re-observe newly rendered cards for animations
  if (window.observeElements) {
    window.observeElements();
  }
}

// ── Open Modal with Full Details ─────────────────────────
function openProjectModal(id) {
  const p = PROJECTS.find((item) => item.id === id);
  if (!p) return;

  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-body-content");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-project-wrap">
      ${p.image ? `
        <div class="modal-img-wrap">
          <img src="${p.image}" alt="${p.title}" class="modal-preview-img" />
        </div>
      ` : ""}

      <div class="modal-project-header">
        <span class="modal-num">${p.number} // ${p.date}</span>
        <h2 class="modal-title">${p.title} <em>${p.titleSuffix}</em></h2>
      </div>

      <p class="modal-long-desc">${p.longDesc || p.desc}</p>

      ${p.outcome ? `
        <div class="modal-highlight-box">
          <strong>Key Impact:</strong> ${p.outcome}
        </div>
      ` : ""}

      <div class="modal-section-title">Technologies Used</div>
      <div class="project-tags" style="margin-bottom: 2rem;">
        ${p.tags.map((t) => `<span class="project-tag-pill">${t}</span>`).join("")}
      </div>

      <div class="modal-actions">
        ${p.live ? `
          <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn-luxury btn-luxury-primary">
            Visit Live Project ↗
          </a>
        ` : ""}
        ${p.github ? `
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-luxury btn-luxury-outline">
            Source Code on GitHub ↗
          </a>
        ` : ""}
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// ── Close Modal ──────────────────────────────────────────
function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ── Init Modal Event Listeners ───────────────────────────
function initModalListeners() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
}

// ── DOM Content Loaded ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderFilterButtons();
  renderProjects("all");
  initModalListeners();
});
