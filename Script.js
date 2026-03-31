document.addEventListener("DOMContentLoaded", () => {

  /* ── ROLE TYPEWRITER ── */
  const roles = [
    "Product Designer",
    "Visual Designer",
    "Interaction Designer"
  ];

  let index = -1;
  const textElement = document.getElementById("role-text");

  if (textElement) {
    setInterval(() => {

      textElement.classList.add("fade-out");
      textElement.classList.remove("fade-in");

      setTimeout(() => {
        index = (index + 1) % roles.length;
        textElement.textContent = roles[index];

        textElement.classList.remove("fade-out");
        textElement.classList.add("fade-in");
      }, 500);

    }, 2500);
  }

  /* ── CONTACT FORM ── */

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkopjzkz";

  const form       = document.getElementById("contactForm");
  const submitBtn  = document.getElementById("submitBtn");
  const successBox = document.getElementById("formSuccess");
  const errorBox   = document.getElementById("formError");

  if (form) {

    function setError(inputId, errorId, show) {
      const input = document.getElementById(inputId);
      const msg   = document.getElementById(errorId);

      if (!input || !msg) return; // 🔴 prevents crash

      input.classList.toggle("invalid", show);
      msg.classList.toggle("visible", show);
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validate() {
      const name    = document.getElementById("contact-name")?.value.trim();
      const email   = document.getElementById("contact-email")?.value.trim();
      const subject = document.getElementById("contact-subject")?.value.trim();
      const message = document.getElementById("contact-message")?.value.trim();

      setError("contact-name",    "error-name",    !name);
      setError("contact-email",   "error-email",   !isValidEmail(email));
      setError("contact-subject", "error-subject", !subject);
      setError("contact-message", "error-message", !message);

      return !!(name && isValidEmail(email) && subject && message);
    }

    // SAFE input listeners
    ["contact-name", "contact-email", "contact-subject", "contact-message"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          setError(id, "error-" + id.replace("contact-", ""), false);
        });
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      successBox?.classList.remove("visible");
      errorBox?.classList.remove("visible");

      if (!validate()) return;

      submitBtn?.classList.add("loading");
      submitBtn.disabled = true;

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          successBox?.classList.add("visible");
          form.reset();
        } else {
          errorBox?.classList.add("visible");
        }
      } catch {
        errorBox?.classList.add("visible");
      } finally {
        submitBtn?.classList.remove("loading");
        submitBtn.disabled = false;
      }
    });
  }

  /* ── NAV BAR ── */
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (!toggle || !links) {
    console.error("Navbar elements not found");
    return;
  }

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    })
  );

});