// assests/js/contact-email.js
(function () {
  const SERVICE_ID = "service_koj0gcd";
  const TEMPLATE_ID = "template_8zgjv7m";
  const PUBLIC_KEY = "235c8bmBpiRQBYNTD";

  // EmailJS init
  emailjs.init(PUBLIC_KEY);

  const form = document.getElementById("contactForm");
  if (!form) return;

  const btn = document.getElementById("sendBtn");
  const statusEl = document.getElementById("formStatus");

  let isSending = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Prevent double-submit / double-click
    if (isSending) return;
    isSending = true;

    btn.disabled = true;
    btn.textContent = "Sending...";
    if (statusEl) statusEl.textContent = "Sending your message...";

    const params = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      message: document.getElementById("message").value.trim(),
      time: new Date().toLocaleString(),
      title: "Website Contact"
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);

      if (statusEl) statusEl.textContent = "✅ Message sent successfully!";
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      if (statusEl) statusEl.textContent = "❌ Failed to send. Please try again.";
      alert("❌ Failed to send. Open Console (F12) and check the error.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Send";
      isSending = false;

      if (statusEl) {
        setTimeout(() => { statusEl.textContent = ""; }, 4000);
      }
    }
  });
})();