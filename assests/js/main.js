/* ===========================
   NAVBAR (Premium) + Mobile
=========================== */

const menuBtn = document.getElementById("menuBtn");
const mnav = document.getElementById("mnav");

const navDrop = document.getElementById("navDrop");
const dropBtn = document.getElementById("dropBtn");

const mDropBtn = document.getElementById("mDropBtn");
const mDropPanel = document.getElementById("mDropPanel");

// Mobile menu toggle
menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = mnav.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Desktop dropdown click support (touch)
dropBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = navDrop.classList.toggle("is-open");
  dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Mobile dropdown Services
mDropBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = mDropPanel.classList.toggle("isOpen");
  mDropBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close everything on outside click
document.addEventListener("click", () => {
  mnav?.classList.remove("show");
  menuBtn?.setAttribute("aria-expanded", "false");

  navDrop?.classList.remove("is-open");
  dropBtn?.setAttribute("aria-expanded", "false");
});

// Close menus when clicking a link
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  if (mnav && mnav.contains(a)) {
    mnav.classList.remove("show");
    menuBtn?.setAttribute("aria-expanded", "false");
  }

  if (navDrop && navDrop.contains(a)) {
    navDrop.classList.remove("is-open");
    dropBtn?.setAttribute("aria-expanded", "false");
  }
});

// Sticky glass on scroll
(() => {
  const navBar = document.getElementById("navBar");
  if (!navBar) return;

  const onScroll = () => navBar.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ===========================
   FORMS (Mock submit)
=========================== */

function fakeSubmit(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mock submitted ✅ (No backend connected)");
    form.reset();
  });
}

fakeSubmit("miniForm");
fakeSubmit("contactForm");


/* ===========================
   FAQ Accordion
=========================== */

document.querySelectorAll(".accItem").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".accItem").forEach((b) => {
      if (b !== btn) b.classList.remove("isOpen");
    });
    btn.classList.toggle("isOpen");
  });
});


/* ===========================
   Chatbot (sample) - UI only
=========================== */
(() => {
  const fab = document.getElementById("chatFab");
  const box = document.getElementById("chatBox");
  const closeBtn = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const body = document.getElementById("chatBody");

  if (!fab || !box || !closeBtn || !form || !input || !body) return;

  const openChat = () => {
    box.classList.add("isOpen");
    setTimeout(() => input.focus(), 50);
  };

  const closeChat = () => box.classList.remove("isOpen");

  const addMsg = (text, who = "bot") => {
    const div = document.createElement("div");
    div.className = `msg msg--${who}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const botReply = (userText) => {
    const t = userText.toLowerCase();

    if (t.includes("price") || t.includes("cost")) {
      addMsg("Pricing depends on your needs. Want help with Individual Tax, Business Tax, or Bookkeeping?", "bot");
      return;
    }
    if (t.includes("book")) {
      addMsg("Sure — do you need monthly bookkeeping, cleanup, or payroll support?", "bot");
      return;
    }
    if (t.includes("tax")) {
      addMsg("Got it — is this for Individual Tax filing or Business Tax planning?", "bot");
      return;
    }

    addMsg("Thanks! Share a bit more (tax, bookkeeping, payroll) and we’ll guide you.", "bot");
  };

  // Toggle open/close
  fab.addEventListener("click", (e) => {
    e.stopPropagation();
    box.classList.contains("isOpen") ? closeChat() : openChat();
  });

  closeBtn.addEventListener("click", closeChat);

  // Close when clicking outside the widget
  document.addEventListener("click", (e) => {
    const widget = document.getElementById("chatWidget");
    if (!widget) return;
    if (box.classList.contains("isOpen") && !widget.contains(e.target)) closeChat();
  });

  // Submit message
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;

    addMsg(val, "user");
    input.value = "";
    setTimeout(() => botReply(val), 350);
  });

  // Chip buttons
  body.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    const topic = btn.getAttribute("data-chip") || btn.textContent;
    addMsg(topic, "user");
    setTimeout(() => botReply(topic), 250);
  });
})();
