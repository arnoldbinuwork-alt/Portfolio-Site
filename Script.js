/* ── ROLE TYPEWRITER ── */
const roles = [
  "UI/UX Designer",
  "Product Designer",
  "Visual Designer",
  "Interaction Designer"
];

let index = 0;
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkopjzkz"; // 👈 replace with your endpoint

const form       = document.getElementById("contactForm");
const submitBtn  = document.getElementById("submitBtn");
const successBox = document.getElementById("formSuccess");
const errorBox   = document.getElementById("formError");

if (form) {

  function setError(inputId, errorId, show) {
    const input = document.getElementById(inputId);
    const msg   = document.getElementById(errorId);
    input.classList.toggle("invalid", show);
    msg.classList.toggle("visible", show);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    const name    = document.getElementById("contact-name").value.trim();
    const email   = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    setError("contact-name",    "error-name",    !name);
    setError("contact-email",   "error-email",   !isValidEmail(email));
    setError("contact-subject", "error-subject", !subject);
    setError("contact-message", "error-message", !message);

    return !!(name && isValidEmail(email) && subject && message);
  }

  // clear error as user types

  ["contact-name", "contact-email", "contact-subject", "contact-message"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
      setError(id, "error-" + id.replace("contact-", ""), false);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successBox.classList.remove("visible");
    errorBox.classList.remove("visible");

    if (!validate()) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        successBox.classList.add("visible");
        form.reset();
      } else {
        errorBox.classList.add("visible");
      }
    } catch {
      errorBox.classList.add("visible");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });
}