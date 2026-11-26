/* ============================================================
   MAIN.JS — Antigravity Ultra-Minimal Luxury Engine
   Matches Video Frame-by-Frame:
   1. Dot & Slanted Exclamation Mark Reveal
   2. Kinetic Letter Flip (VEERAKUMAR -> PORTFOLIO)
   3. Starfield Cosmic Snow Burst
   4. Low-Resolution Halftone Grid Portrait (60 Cols, Square Cells)
   5. Interactive Repulsion Physics & Staggered Ease-Out Assembly
   6. Custom Lagging Pointer Cursor & Floating Availability Badge
   7. Fullscreen Curtain Drawer & Services Accordion
   ============================================================ */

(function () {
  "use strict";

  // ============================================================
  // PORTFOLIO CONFIGURATION
  // Easily customize name, role, portrait image path & animation
  // Can also be overridden directly in index.html via window.PORTFOLIO_CONFIG
  // ============================================================
  window.PORTFOLIO_CONFIG = Object.assign({
    name: "VEERA KUMAR R",
    role: "Web Developer | AI & DS",
    imagePath: "assets/images/halftone_avatar.jpg",
    sampleCols: 60,         // Sampling resolution (~60 columns wide)
    assemblyDuration: 1500, // Staggered ease-out assembly duration (ms)
    scatterRadius: 20,      // Repulsion scatter outward distance (px)
    cursorLag: 0.16         // Custom cursor lerp factor
  }, window.PORTFOLIO_CONFIG || {});

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

  // ── 3. LOW-RESOLUTION SQUARE HALFTONE PORTRAIT ENGINE ─────
  function initHalftoneAvatar() {
    const canvas = document.getElementById("halftone-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = window.PORTFOLIO_CONFIG || {};
    const sampleCols = config.sampleCols || 60; // Sampling resolution: ~60 columns wide
    const assemblyDuration = config.assemblyDuration || 1500;
    const scatterRadius = config.scatterRadius || 20;

    const stage = canvas.parentElement || canvas;
    const avatarSrc = (typeof window.AVATAR_DATA_URI !== "undefined" && window.AVATAR_DATA_URI)
      ? window.AVATAR_DATA_URI
      : (config.imagePath || "assets/images/halftone_avatar.jpg");

    let isAssembling = false;
    let assemblyStartTime = 0;
    let hasTriggeredAssembly = false;

    // Trigger dispatcher hook (called from preloader sequence)
    window.PortfolioAnim.triggerAvatarAssembly = function () {
      hasTriggeredAssembly = true;
      isAssembling = true;
      assemblyStartTime = performance.now();
    };

    const img = new Image();
    img.src = avatarSrc;

    img.onload = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hasTriggeredAssembly || prefersReducedMotion) {
        isAssembling = true;
        assemblyStartTime = performance.now();
      }

      const naturalAspect = (img.naturalHeight || 668) / (img.naturalWidth || 461);
      const sampleRows = Math.round(sampleCols * naturalAspect);

      let renderWidth = 0;
      let renderHeight = 0;
      let drawWidth = 0;
      let drawHeight = 0;
      let offsetX = 0;
      let offsetY = 0;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);

      function setupCanvasSize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderWidth = stage.clientWidth || Math.min(window.innerWidth * 0.92, 540);
        renderHeight = stage.clientHeight || Math.round(Math.min(window.innerHeight * 0.65, 580));

        canvas.width = Math.round(renderWidth * dpr);
        canvas.height = Math.round(renderHeight * dpr);
        canvas.style.width = renderWidth + "px";
        canvas.style.height = renderHeight + "px";

        // Fit portrait centered within stage
        const maxWidth = renderWidth * 0.94;
        const maxHeight = renderHeight * 0.96;
        const drawScale = Math.min(maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);

        drawWidth = img.naturalWidth * drawScale;
        drawHeight = img.naturalHeight * drawScale;
        offsetX = (renderWidth - drawWidth) / 2;
        offsetY = (renderHeight - drawHeight) / 2;
      }

      setupCanvasSize();

      // Read pixel brightness from low-resolution hidden canvas
      let imgData = null;
      try {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = sampleCols;
        offCanvas.height = sampleRows;
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        offCtx.drawImage(img, 0, 0, sampleCols, sampleRows);
        imgData = offCtx.getImageData(0, 0, sampleCols, sampleRows).data;
      } catch (err) {
        console.warn("Could not read image pixel data:", err);
      }

      if (!imgData) return;

      const cells = [];
      const cellStepX = drawWidth / sampleCols;
      const cellStepY = drawHeight / sampleRows;
      const maxCellSize = Math.min(cellStepX, cellStepY) * 0.94;

      for (let row = 0; row < sampleRows; row++) {
        for (let col = 0; col < sampleCols; col++) {
          const idx = (row * sampleCols + col) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];
          if (a < 25) continue;

          // Standard photometric luminance
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Dark areas become tiny or empty cells so black background shows through
          if (brightness <= 0.08) continue;

          const normX = (col + 0.5) / sampleCols;
          const normY = (row + 0.5) / sampleRows;
          const targetX = offsetX + normX * drawWidth;
          const targetY = offsetY + normY * drawHeight;

          // Cool white-blue (#cfd8ff to #ffffff)
          const t = Math.max(0, Math.min(1, (brightness - 0.08) / (1 - 0.08)));
          const cellR = Math.round(207 + (255 - 207) * t);
          const cellG = Math.round(216 + (255 - 216) * t);
          const cellB = 255;

          // Brighter areas become larger, brighter cells
          const baseSize = Math.max(0.8, brightness * maxCellSize);
          const baseAlpha = Math.min(1.0, 0.4 + brightness * 0.6);

          // Scattered dust noise position (Stage 2)
          const angle = Math.random() * Math.PI * 2;
          const dustDist = 180 + Math.random() * Math.max(renderWidth, renderHeight) * 0.75;
          const startX = targetX + Math.cos(angle) * dustDist;
          const startY = targetY + Math.sin(angle) * dustDist;

          // Staggered ease-out timing (about 1.5s total)
          const staggerDelay = Math.random() * 500;
          const duration = prefersReducedMotion ? 0 : (1100 + Math.random() * 400);

          cells.push({
            normX,
            normY,
            targetX,
            targetY,
            startX,
            startY,
            baseX: prefersReducedMotion ? targetX : startX,
            baseY: prefersReducedMotion ? targetY : startY,
            dispX: 0,
            dispY: 0,
            vx: 0,
            vy: 0,
            staggerDelay,
            duration,
            brightness,
            baseSize,
            baseAlpha,
            r: cellR,
            g: cellG,
            b: cellB,
            shimmer: 0,
            assembled: prefersReducedMotion
          });
        }
      }

      function recalculateTargets() {
        setupCanvasSize();
        const currentStepX = drawWidth / sampleCols;
        const currentStepY = drawHeight / sampleRows;
        const currentMaxCell = Math.min(currentStepX, currentStepY) * 0.94;

        for (let i = 0; i < cells.length; i++) {
          const c = cells[i];
          c.targetX = offsetX + c.normX * drawWidth;
          c.targetY = offsetY + c.normY * drawHeight;
          c.baseSize = Math.max(0.8, c.brightness * currentMaxCell);
          if (c.assembled) {
            c.baseX = c.targetX;
            c.baseY = c.targetY;
          }
        }
      }

      window.addEventListener("resize", recalculateTargets, { passive: true });

      // Pointer Repulsion Interaction
      let pointerCanvasX = -9999;
      let pointerCanvasY = -9999;
      let pointerActive = false;

      function updateRepulsionPointer(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        pointerCanvasX = (clientX - rect.left) * (renderWidth / (rect.width || 1));
        pointerCanvasY = (clientY - rect.top) * (renderHeight / (rect.height || 1));
        pointerActive = true;
      }

      function clearRepulsionPointer() {
        pointerCanvasX = -9999;
        pointerCanvasY = -9999;
        pointerActive = false;
      }

      window.addEventListener("pointermove", (e) => {
        updateRepulsionPointer(e.clientX, e.clientY);
      }, { passive: true });

      window.addEventListener("pointerleave", clearRepulsionPointer, { passive: true });
      window.addEventListener("touchcancel", clearRepulsionPointer, { passive: true });

      // Fallback timer to trigger assembly if intro is skipped
      setTimeout(() => {
        if (!isAssembling) {
          isAssembling = true;
          assemblyStartTime = performance.now();
        }
      }, 1600);

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      const repulsionRadius = 95;
      const springStiffness = 0.14;
      const springDamping = 0.80;
      const parallaxFactor = 0.38;
      const fadeDistance = 420;

      function render() {
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, renderWidth, renderHeight);

        const now = performance.now();
        const scrollY = window.scrollY || window.pageYOffset || 0;

        // Scroll Parallax and Fadeout (parallaxes slower than text, fades out as next section arrives)
        const scrollFade = Math.max(0, 1 - scrollY / fadeDistance);
        const parallaxY = scrollY * parallaxFactor;
        stage.style.transform = `translateY(${parallaxY.toFixed(2)}px)`;
        stage.style.opacity = scrollFade.toFixed(3);
        stage.style.visibility = scrollFade <= 0.002 ? "hidden" : "visible";

        // Subtle Shimmer: a few random cells flicker brightness every frame
        const shimmerCount = Math.floor(Math.random() * 8) + 5;
        for (let s = 0; s < shimmerCount; s++) {
          const randIdx = Math.floor(Math.random() * cells.length);
          if (cells[randIdx]) {
            cells[randIdx].shimmer = 0.5 + Math.random() * 0.5;
          }
        }

        // Render each SQUARE cell
        for (let i = 0; i < cells.length; i++) {
          const c = cells[i];

          // 1. Assembly Progression
          if (isAssembling && !c.assembled) {
            const elapsed = now - assemblyStartTime - c.staggerDelay;
            if (elapsed > 0) {
              const p = Math.min(1.0, elapsed / c.duration);
              const ease = easeOutCubic(p);
              c.baseX = c.startX + (c.targetX - c.startX) * ease;
              c.baseY = c.startY + (c.targetY - c.startY) * ease;
              if (p >= 1.0) {
                c.assembled = true;
                c.baseX = c.targetX;
                c.baseY = c.targetY;
              }
            }
          }

          // 2. Proximity Repulsion Effect (~20px scatter then spring back)
          if (pointerActive) {
            const curX = c.baseX + c.dispX;
            const curY = c.baseY + c.dispY;
            const mdx = curX - pointerCanvasX;
            const mdy = curY - pointerCanvasY;
            const dist = Math.hypot(mdx, mdy);
            if (dist < repulsionRadius && dist > 0.001) {
              const force = (1 - dist / repulsionRadius);
              const angle = Math.atan2(mdy, mdx);
              const push = force * scatterRadius * 0.38;
              c.vx += Math.cos(angle) * push;
              c.vy += Math.sin(angle) * push;
            }
          }

          // Spring force back to base grid position
          c.vx += -c.dispX * springStiffness;
          c.vy += -c.dispY * springStiffness;
          c.vx *= springDamping;
          c.vy *= springDamping;
          c.dispX += c.vx;
          c.dispY += c.vy;

          // Clamp scatter offset to ~20px limit
          const dispDist = Math.hypot(c.dispX, c.dispY);
          if (dispDist > scatterRadius * 1.2) {
            const clampRatio = (scatterRadius * 1.2) / dispDist;
            c.dispX *= clampRatio;
            c.dispY *= clampRatio;
          }

          const drawX = c.baseX + c.dispX;
          const drawY = c.baseY + c.dispY;

          // 3. Shimmer decay & calculation
          if (c.shimmer > 0) {
            c.shimmer *= 0.88;
            if (c.shimmer < 0.01) c.shimmer = 0;
          }

          // 4. Draw Square Cell
          const currentCellSize = c.baseSize * (1 + c.shimmer * 0.32);
          const drawAlpha = Math.min(1.0, (c.baseAlpha + c.shimmer * 0.45) * scrollFade);

          if (drawAlpha > 0.02 &&
              drawX >= -20 && drawX <= renderWidth + 20 &&
              drawY >= -20 && drawY <= renderHeight + 20) {
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${drawAlpha})`;
            // Draw SQUARE dot/cell
            ctx.fillRect(
              drawX - currentCellSize / 2,
              drawY - currentCellSize / 2,
              currentCellSize,
              currentCellSize
            );
          }
        }

        ctx.restore();
        requestAnimationFrame(render);
      }

      render();
    };
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

  // ── 10. CUSTOM LAGGING CURSOR ─────────────────────────────
  function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isActive = false;
    const lag = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.cursorLag) || 0.16;

    window.addEventListener("pointermove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isActive) {
        isActive = true;
        cursor.classList.add("active");
      }
    }, { passive: true });

    window.addEventListener("pointerdown", () => {
      cursor.style.transform = `translate3d(${(currentX - 4).toFixed(2)}px, ${(currentY - 4).toFixed(2)}px, 0) scale(0.65)`;
    }, { passive: true });

    window.addEventListener("pointerup", () => {
      cursor.style.transform = `translate3d(${(currentX - 4).toFixed(2)}px, ${(currentY - 4).toFixed(2)}px, 0) scale(1)`;
    }, { passive: true });

    function renderCursor() {
      if (isActive) {
        currentX += (mouseX - currentX) * lag;
        currentY += (mouseY - currentY) * lag;
        cursor.style.transform = `translate3d(${(currentX - 4).toFixed(2)}px, ${(currentY - 4).toFixed(2)}px, 0)`;
      }
      requestAnimationFrame(renderCursor);
    }

    renderCursor();
  }

  // ── 11. DYNAMIC CONFIGURATION BINDING ─────────────────────
  function applyPortfolioConfig() {
    const config = window.PORTFOLIO_CONFIG;
    if (!config) return;
    if (config.name) {
      document.querySelectorAll(".nav-brand").forEach(el => {
        el.textContent = config.name;
      });
    }
  }

  // ── BOOTSTRAP ────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    applyPortfolioConfig();
    initPreloader();
    initCustomCursor();
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
