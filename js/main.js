/* ============================================================
   MAIN.JS — Antigravity Ultra-Minimal Luxury Engine
   Matches Video 2026-10-23 Frame-by-Frame:
   1. Dot & Slanted Exclamation Mark Reveal
   2. Kinetic Letter Flip (VEERAKUMAR -> PORTFOLIO)
   3. Starfield Cosmic Snow Burst
   4. Dispersed Particle Cloud Magnetic Face Assembly (00:08 - 00:10)
   5. Dynamic Scroll Dispersion & Interactive Halftone Shimmer
   6. Fullscreen Curtain Drawer & Services Accordion
   7. Interactive LED Dot Matrix Banner
   ============================================================ */

(function () {
  "use strict";

  // Global event dispatcher for cross-animation triggers
  window.PortfolioAnim = {
    triggerStarfieldBurst: null,
    triggerAvatarAssembly: null
  };

  // ── 1. CINEMATIC PRELOADER SEQUENCE ──────────────────────
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const preloaderBar = document.getElementById("preloader-bar");
    const preloaderDot = document.getElementById("preloader-dot");
    const preloaderTitle = document.getElementById("preloader-title");
    const preloaderExclamation = document.getElementById("preloader-exclamation");
    const skipBtn = document.getElementById("preloader-skip");

    if (!preloader) return;

    let isCompleted = false;

    function finishIntro() {
      if (isCompleted) return;
      isCompleted = true;

      preloader.classList.add("fade-out");

      // Trigger the cosmic starfield burst & avatar particle assembly
      if (typeof window.PortfolioAnim.triggerStarfieldBurst === "function") {
        window.PortfolioAnim.triggerStarfieldBurst();
      }
      if (typeof window.PortfolioAnim.triggerAvatarAssembly === "function") {
        setTimeout(() => {
          window.PortfolioAnim.triggerAvatarAssembly();
        }, 300);
      }

      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", finishIntro);
    }

    // Step 1: Glowing Dot breathes in center
    setTimeout(() => {
      if (preloaderDot) preloaderDot.classList.add("pulse");
    }, 200);

    // Step 2: Slanted Exclamation Bar drops & rotates into place (00:01 - 00:02)
    setTimeout(() => {
      if (preloaderBar) preloaderBar.classList.add("active");
    }, 700);

    // Step 3: Reveal "VEERA KUMAR" around the mark (00:02 - 00:03)
    setTimeout(() => {
      if (preloaderTitle) {
        // Construct letters
        const word = "VEERAKUMAR";
        preloaderTitle.innerHTML = word.split("").map((ch) => `<span class="preloader-char">${ch}</span>`).join("");
        preloaderTitle.classList.add("visible");
      }
      if (preloaderExclamation) {
        preloaderExclamation.style.opacity = "0";
      }
    }, 1300);

    // Step 4: Kinetic Character Flip into "PORTFOLIO" (00:04 - 00:06)
    setTimeout(() => {
      if (preloaderTitle) {
        const targetWord = "PORTFOLIO";
        const chars = preloaderTitle.querySelectorAll(".preloader-char");

        // Staggered 3D character flip
        chars.forEach((charEl, idx) => {
          setTimeout(() => {
            charEl.classList.add("flipping");
            setTimeout(() => {
              charEl.textContent = targetWord[idx] || "";
              charEl.classList.remove("flipping");
              charEl.classList.add("glow");
            }, 250);
          }, idx * 60);
        });
      }
    }, 2400);

    // Step 5: Starfield Burst & Smooth Exit (00:06 - 00:07)
    setTimeout(() => {
      finishIntro();
    }, 3800);

    // Safety timeout
    setTimeout(() => {
      finishIntro();
    }, 5500);
  }

  // ── 2. STARFIELD CANVAS WITH COSMIC RUSH BURST ───────────
  function initStarfield() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = [];
    const count = Math.min(Math.floor((width * height) / 5500), 220);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.75 + 0.25,
        baseSpeed: Math.random() * 0.45 + 0.15,
        drift: (Math.random() - 0.5) * 0.15,
        pulseVal: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.008
      });
    }

    let burstMultiplier = 1.0;
    let isBursting = false;

    // Cosmic rush trigger
    window.PortfolioAnim.triggerStarfieldBurst = function () {
      burstMultiplier = 9.5;
      isBursting = true;
    };

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth decay of burst speed
      if (isBursting) {
        burstMultiplier += (1.0 - burstMultiplier) * 0.035;
        if (Math.abs(burstMultiplier - 1.0) < 0.05) {
          burstMultiplier = 1.0;
          isBursting = false;
        }
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += s.baseSpeed * burstMultiplier;
        s.x += s.drift;
        s.pulseVal += s.pulseSpeed;

        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        const dynamicAlpha = Math.min(1.0, Math.max(0.15, s.alpha + Math.sin(s.pulseVal) * 0.25));

        ctx.beginPath();
        // Elongate slightly during burst
        if (burstMultiplier > 2.0) {
          ctx.ellipse(s.x, s.y, s.radius, s.radius * (burstMultiplier * 0.4), 0, 0, Math.PI * 2);
        } else {
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        if (s.radius > 1.2 || burstMultiplier > 3) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(render);
    }

    render();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });
  }

  // ── 3. BORDERLESS HIGH-CLARITY 3D PARTICLE PORTRAIT ───
  function initHalftoneAvatar() {
    const canvas = document.getElementById("halftone-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hero = document.getElementById("hero") || canvas.parentElement || document.body;
    const heroImg = document.getElementById("hero-portrait-img");

    let isAssembling = false;
    let assembleProgress = 0;
    let hasTriggeredAssembly = false;

    // Trigger dispatcher hook (ready even before any loading)
    window.PortfolioAnim.triggerAvatarAssembly = function () {
      hasTriggeredAssembly = true;
      isAssembling = true;
      if (heroImg) heroImg.classList.add("assembled");
    };

    let sampleCols = 104;
    let sampleRows = 151;
    let naturalAspect = 1.4519;

    if (window.AVATAR_DIMS) {
      sampleCols = window.AVATAR_DIMS.cols || sampleCols;
      sampleRows = window.AVATAR_DIMS.rows || sampleRows;
      naturalAspect = window.AVATAR_DIMS.aspect || naturalAspect;
    }

    let renderWidth = 0;
    let renderHeight = 0;
    let drawWidth = 0;
    let drawHeight = 0;
    let offsetX = 0;
    let offsetY = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function updateDimensions() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderWidth = hero.clientWidth || window.innerWidth;
      renderHeight = hero.clientHeight || window.innerHeight;

      canvas.width = renderWidth * dpr;
      canvas.height = renderHeight * dpr;
      canvas.style.width = renderWidth + "px";
      canvas.style.height = renderHeight + "px";

      // Fit portrait to viewport dimensions:
      const fitScale = Math.min(
        (renderWidth * 0.95) / (sampleCols * 4.4),
        (renderHeight * 0.94) / (sampleRows * 4.4)
      );

      drawWidth = sampleCols * 4.4 * fitScale;
      drawHeight = sampleRows * 4.4 * fitScale;

      if (renderHeight > 650 && drawHeight < renderHeight * 0.75) {
        drawHeight = Math.min(renderHeight * 0.90, renderWidth * 0.95 * naturalAspect);
        drawWidth = drawHeight / naturalAspect;
      }

      offsetX = (renderWidth - drawWidth) / 2;
      offsetY = (renderHeight - drawHeight) / 2;
    }

    updateDimensions();

    function decodeBase64Points(b64) {
      try {
        const binary = atob(b64);
        const len = binary.length;
        const raw = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          raw[i] = binary.charCodeAt(i);
        }
        const pts = [];
        for (let i = 0; i < len; i += 5) {
          const x = raw[i];
          const y = raw[i + 1];
          const r = raw[i + 2];
          const g = raw[i + 3];
          const b = raw[i + 4];
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          pts.push({
            normX: (x + 0.5) / sampleCols,
            normY: (y + 0.5) / sampleRows,
            r, g, b, brightness
          });
        }
        return pts;
      } catch (err) {
        console.warn("Could not decode avatar data:", err);
        return [];
      }
    }

    let rawPoints = [];
    if (window.AVATAR_DATA) {
      rawPoints = decodeBase64Points(window.AVATAR_DATA);
    }

    function buildParticles(points) {
      const parts = [];
      const baseColStep = drawWidth / sampleCols;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const targetX = offsetX + pt.normX * drawWidth;
        const targetY = offsetY + pt.normY * drawHeight;
        const baseSize = Math.max(0.7, pt.brightness * (baseColStep * 0.95));

        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterRadius = 250 + Math.random() * 550;
        const scatterZ = (Math.random() - 0.5) * 600;

        parts.push({
          normX: pt.normX,
          normY: pt.normY,
          origX: targetX,
          origY: targetY,
          origZ: 0,
          x: targetX + Math.cos(scatterAngle) * scatterRadius,
          y: targetY + Math.sin(scatterAngle) * scatterRadius,
          z: scatterZ,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: (Math.random() - 0.5) * 2,
          baseSize: baseSize,
          brightness: pt.brightness,
          alpha: 0.1,
          targetAlpha: Math.min(1.0, 0.45 + pt.brightness * 0.55),
          r: pt.r,
          g: pt.g,
          b: pt.b,
          isStar: pt.brightness > 0.85 && Math.random() < 0.15,
          seedX: Math.cos(scatterAngle),
          seedY: Math.sin(scatterAngle),
          seedZ: (Math.random() - 0.5) * 2
        });
      }
      return parts;
    }

    let particles = buildParticles(rawPoints);

    // If precomputed data was not available, try reading from image (when served via HTTP)
    if (!particles.length) {
      const img = new Image();
      img.src = "assets/images/halftone_avatar.jpg";
      img.onload = () => {
        try {
          const offCanvas = document.createElement("canvas");
          const offCtx = offCanvas.getContext("2d");
          offCanvas.width = sampleCols;
          offCanvas.height = sampleRows;
          offCtx.drawImage(img, 0, 0, sampleCols, sampleRows);
          const imgData = offCtx.getImageData(0, 0, sampleCols, sampleRows).data;
          const fallbackPts = [];
          for (let y = 0; y < sampleRows; y++) {
            for (let x = 0; x < sampleCols; x++) {
              const idx = (y * sampleCols + x) * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];
              const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              if (brightness > 0.08) {
                fallbackPts.push({
                  normX: (x + 0.5) / sampleCols,
                  normY: (y + 0.5) / sampleRows,
                  r, g, b, brightness
                });
              }
            }
          }
          particles = buildParticles(fallbackPts);
        } catch (e) {
          console.warn("Canvas getImageData skipped (CORS/file://):", e.message);
        }
      };
    }

    function recalculateTargets() {
      updateDimensions();
      const currentStep = drawWidth / sampleCols;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.origX = offsetX + p.normX * drawWidth;
        p.origY = offsetY + p.normY * drawHeight;
        p.baseSize = Math.max(0.7, p.brightness * (currentStep * 0.95));
      }
    }

    window.addEventListener("resize", recalculateTargets, { passive: true });

    // Cursor / Touch 3D Radial Physics Force across the full hero section
    let mouse = { x: -9999, y: -9999, radius: 120 };

    function updateMousePos(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (clientX - rect.left) * (renderWidth / (rect.width || 1));
      mouse.y = (clientY - rect.top) * (renderHeight / (rect.height || 1));
    }

    hero.addEventListener("mousemove", (e) => {
      updateMousePos(e.clientX, e.clientY);
    });

    hero.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    hero.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener("touchend", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Scroll-Triggered Assembly & Dispersion
    let scrollOffset = 0;
    window.addEventListener("scroll", () => {
      scrollOffset = window.scrollY;
    }, { passive: true });

    const fov = 550; // 3D Camera Field of View

    // Safety timeout to ensure assembly if preloader was skipped or completed early
    setTimeout(() => {
      isAssembling = true;
      if (heroImg) heroImg.classList.add("assembled");
    }, 4200);

    function animate() {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, renderWidth, renderHeight);

      if (isAssembling && assembleProgress < 1.0) {
        assembleProgress += 0.024;
        if (assembleProgress > 1.0) assembleProgress = 1.0;
      }

      // Scroll dispersion factor: after passing hero threshold, particles scatter back into 3D space
      const scrollStart = Math.max(50, renderHeight * 0.15);
      const scrollDispersion = Math.max(0, scrollOffset - scrollStart) * 1.1;
      const scrollFade = scrollOffset <= scrollStart ? 1.0 : Math.max(0, 1 - (scrollOffset - scrollStart) / (renderHeight * 0.65));

      if (heroImg && isAssembling) {
        heroImg.style.opacity = (0.85 * scrollFade * assembleProgress).toFixed(3);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isAssembling) {
          // Target position incorporates scroll dispersion in 3D
          const targetX = p.origX + (p.seedX * scrollDispersion * 0.85);
          const targetY = p.origY + (p.seedY * scrollDispersion * 0.65) - (scrollDispersion * 0.3);
          const targetZ = p.origZ + (p.seedZ * scrollDispersion * 1.5);

          // Magnetic attraction force toward 3D target coordinates
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dz = targetZ - p.z;

          p.vx += dx * (0.045 + assembleProgress * 0.05);
          p.vy += dy * (0.045 + assembleProgress * 0.05);
          p.vz += dz * (0.045 + assembleProgress * 0.05);

          // Friction damping
          p.vx *= 0.83;
          p.vy *= 0.83;
          p.vz *= 0.83;

          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          p.alpha = Math.min(p.targetAlpha, p.alpha + 0.035);
        } else {
          // Ambient drift before assembly
          p.x += p.vx * 0.25;
          p.y += p.vy * 0.25;
          p.z += p.vz * 0.25;
        }

        // 3D Perspective Projection Calculation
        const scale = fov / Math.max(20, fov + p.z);
        const projX = (renderWidth / 2) + (p.x - (renderWidth / 2)) * scale;
        const projY = (renderHeight / 2) + (p.y - (renderHeight / 2)) * scale;
        const projSize = Math.max(0.4, p.baseSize * scale);

        // Cursor / Touch 3D Radial Physics Force
        const mdx = projX - mouse.x;
        const mdy = projY - mouse.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist < mouse.radius) {
          const force = (mouse.radius - mdist) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          p.vx += Math.cos(angle) * force * 12;
          p.vy += Math.sin(angle) * force * 12;
          p.vz += (Math.random() - 0.5) * force * 45; // Depth explosion
        }

        const drawAlpha = Math.max(0, p.alpha * scrollFade * Math.min(1.2, scale));

        if (drawAlpha > 0.02 && projX >= -10 && projX <= renderWidth + 10 && projY >= -10 && projY <= renderHeight + 10) {
          ctx.beginPath();
          ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
          ctx.globalAlpha = drawAlpha;

          if (p.isStar) {
            ctx.shadowBlur = Math.min(10, 5 * scale);
            ctx.shadowColor = "#ffffff";
          }
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        }
      }

      ctx.restore();
      requestAnimationFrame(animate);
    }

    animate();
  }

  // ── 4. FULLSCREEN CURTAIN NAVIGATION MENU ────────────────
  function initNavigation() {
    const burger = document.getElementById("nav-burger");
    const menuOverlay = document.getElementById("fullscreen-menu");
    const menuClose = document.getElementById("menu-close");
    const menuLinks = document.querySelectorAll(".menu-nav-link");

    if (!burger || !menuOverlay) return;

    function openMenu() {
      burger.classList.add("active");
      menuOverlay.classList.add("open");
      menuOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      burger.classList.remove("active");
      menuOverlay.classList.remove("open");
      menuOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    burger.addEventListener("click", () => {
      if (menuOverlay.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (menuClose) {
      menuClose.addEventListener("click", closeMenu);
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOverlay.classList.contains("open")) {
        closeMenu();
      }
    });

    const navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      }, { passive: true });
    }
  }

  // ── 5. SERVICES / WHAT I DO ACCORDION ─────────────────────
  function initAccordion() {
    const items = document.querySelectorAll(".accordion-item");
    if (!items.length) return;

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");
      if (!header || !content) return;

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            const otherHeader = other.querySelector(".accordion-header");
            const otherContent = other.querySelector(".accordion-content");
            if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          header.setAttribute("aria-expanded", "false");
          content.style.maxHeight = null;
        } else {
          item.classList.add("open");
          header.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  // ── 6. INTERACTIVE LED / DOT MATRIX CANVAS ───────────────
  function initDotMatrix() {
    const canvas = document.getElementById("led-matrix-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const wordPattern = [
      "10001 11111 10000 10000 01110",
      "10001 10000 10000 10000 10001",
      "11111 11110 10000 10000 10001",
      "10001 10000 10000 10000 10001",
      "10001 11111 11111 11111 01110"
    ];

    const cols = 35;
    const rows = 9;
    const startRow = 2;
    const startCol = 3;

    let width = (canvas.width = Math.min(canvas.parentElement.clientWidth || 600, 700));
    let height = (canvas.height = 140);
    const dotSpacing = width / cols;
    const dotRadius = Math.max(2, dotSpacing * 0.28);

    const grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = { active: false, glow: 0 };
      }
    }

    let curCol = startCol;
    for (let charIdx = 0; charIdx < 5; charIdx++) {
      for (let r = 0; r < 5; r++) {
        const rowStr = wordPattern[r].split(" ")[charIdx];
        for (let c = 0; c < rowStr.length; c++) {
          if (rowStr[c] === "1" && r + startRow < rows && curCol + c < cols) {
            grid[r + startRow][curCol + c].active = true;
          }
        }
      }
      curCol += 6;
    }

    let mouse = { x: -9999, y: -9999 };

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dot = grid[r][c];
          const x = c * dotSpacing + dotSpacing / 2;
          const y = r * (height / rows) + (height / rows) / 2;

          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          if (dist < 32) {
            dot.glow = 1.0;
          } else {
            dot.glow = Math.max(0, dot.glow - 0.05);
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (dot.glow > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + dot.glow * 0.6})`;
            ctx.shadowBlur = 10 * dot.glow;
            ctx.shadowColor = "#ffffff";
          } else if (dot.active) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const c = Math.floor(clickX / dotSpacing);
      const r = Math.floor(clickY / (height / rows));

      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        grid[r][c].active = !grid[r][c].active;
        grid[r][c].glow = 1.5;
      }
    });
  }

  // ── 7. SCROLL FADE-IN OBSERVER ───────────────────────────
  function observeElements() {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }
  window.observeElements = observeElements;

  // ── 8. COPY TO CLIPBOARD HELPER ──────────────────────────
  function initCopyButtons() {
    const copyBtns = document.querySelectorAll("[data-copy-target]");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const textToCopy = btn.getAttribute("data-copy-target");
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalContent = btn.innerHTML;
          btn.innerHTML = `<span>Copied! ✓</span>`;
          btn.classList.add("copied");
          setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.classList.remove("copied");
          }, 2000);
        }).catch(() => {
          window.prompt("Copy this:", textToCopy);
        });
      });
    });
  }

  // ── 9. BACK TO TOP BUTTON ────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      }
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── BOOTSTRAP ────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initStarfield();
    initHalftoneAvatar();
    initNavigation();
    initAccordion();
    initDotMatrix();
    observeElements();
    initCopyButtons();
    initBackToTop();
  });
})();
