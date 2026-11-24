/* ============================================================
   CONTACT FORM — Validation + Formspree submission
   ============================================================ */

(function () {
  "use strict";

  // ── Config ─────────────────────────────────────────────
  // Replace YOUR_FORM_ID with your Formspree form endpoint ID
  // Sign up free at https://formspree.io
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  // ── Validation rules ────────────────────────────────────
  const RULES = {
    name: {
      required: true,
      minLength: 2,
      label: "Name",
      messages: {
        required: "Please enter your name.",
        minLength: "Name must be at least 2 characters.",
      },
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      label: "Email",
      messages: {
        required: "Please enter your email address.",
        pattern: "Please enter a valid email address.",
      },
    },
    subject: {
      required: true,
      label: "Subject",
      messages: {
        required: "Please enter a subject.",
      },
    },
    message: {
      required: true,
      minLength: 20,
      label: "Message",
      messages: {
        required: "Please enter your message.",
        minLength: "Message must be at least 20 characters long.",
      },
    },
  };

  // ── Validate single field ───────────────────────────────
  function validateField(name, value) {
    const rule = RULES[name];
    if (!rule) return null;

    value = value.trim();

    if (rule.required && !value) {
      return rule.messages.required;
    }
    if (rule.minLength && value.length < rule.minLength) {
      return rule.messages.minLength;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.messages.pattern;
    }

    return null;
  }

  // ── Show / hide error for a field ──────────────────────
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (!field || !error) return;

    field.classList.add("error");
    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
    error.classList.add("visible");
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (!field || !error) return;

    field.classList.remove("error");
    field.setAttribute("aria-invalid", "false");
    error.textContent = "";
    error.classList.remove("visible");
  }

  // ── Validate entire form ────────────────────────────────
  function validateForm(form) {
    let valid = true;

    Object.keys(RULES).forEach(name => {
      const field = form.elements[name];
      if (!field) return;
      const error = validateField(name, field.value);
      if (error) {
        showError(`contact-${name}`, error);
        valid = false;
      } else {
        clearError(`contact-${name}`);
      }
    });

    return valid;
  }

  // ── Show form status message ────────────────────────────
  function showStatus(type, message) {
    const status = document.getElementById("form-status");
    if (!status) return;

    status.className = `form-status ${type}`;
    status.innerHTML = `
      <span>${type === "success" ? "✅" : "❌"}</span>
      <span>${message}</span>
    `;

    if (type === "success") {
      setTimeout(() => {
        status.className = "form-status";
        status.innerHTML = "";
      }, 6000);
    }
  }

  // ── Submit handler ──────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector("#contact-submit");

    if (!validateForm(form)) {
      // Focus first error field
      const firstError = form.querySelector(".error");
      if (firstError) firstError.focus();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const formData = new FormData(form);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showStatus("success", "Message sent! I'll get back to you soon 🚀");
        form.reset();
        Object.keys(RULES).forEach(name => clearError(`contact-${name}`));
      } else {
        const data = await response.json();
        const msg =
          data.errors?.map(e => e.message).join(", ") ||
          "Something went wrong. Please try again.";
        showStatus("error", msg);
      }
    } catch (err) {
      // Fallback: open mailto if fetch fails (e.g., no Formspree ID set)
      const name    = form.elements.name?.value    || "";
      const email   = form.elements.email?.value   || "";
      const subject = form.elements.subject?.value || "Portfolio Contact";
      const message = form.elements.message?.value || "";
      const mailtoLink = `mailto:veerakumar25122006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.location.href = mailtoLink;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  }

  // ── Real-time validation (on blur) ──────────────────────
  function attachRealtimeValidation(form) {
    Object.keys(RULES).forEach(name => {
      const field = form.elements[name];
      if (!field) return;

      field.addEventListener("blur", () => {
        const error = validateField(name, field.value);
        if (error) {
          showError(`contact-${name}`, error);
        } else {
          clearError(`contact-${name}`);
        }
      });

      field.addEventListener("input", () => {
        if (field.classList.contains("error")) {
          const error = validateField(name, field.value);
          if (!error) clearError(`contact-${name}`);
        }
      });
    });
  }

  // ── Init ────────────────────────────────────────────────
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", handleSubmit);
    attachRealtimeValidation(form);
  }

  // Run after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
  } else {
    initContactForm();
  }
})();
