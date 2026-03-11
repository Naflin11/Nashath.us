const chatbotButton = document.getElementById("chatbotButton");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const quickButtons = document.querySelectorAll(".quick-btn");

let hasShownWelcome = false;

function toggleChat() {
  chatbotWindow.classList.toggle("open");

  if (chatbotWindow.classList.contains("open") && !hasShownWelcome) {
    showWelcomeMessages();
    hasShownWelcome = true;
  }
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, type = "bot") {
  const msg = document.createElement("div");
  msg.className = `chat-message ${type}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  scrollToBottom();
  return msg;
}

function showWelcomeMessages() {
  addMessage(
    "Hello! Welcome to Nash Tax & Bookkeeping. How can I help you today?",
    "bot"
  );
  addMessage(
    "You can choose one of the quick options below or type your question.",
    "bot"
  );
}

async function sendMessage(messageText = null) {
  const message = (messageText || chatInput.value).trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  const typingMsg = addMessage("Typing...", "bot");
  typingMsg.classList.add("typing");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    typingMsg.remove();

    if (!response.ok) {
      addMessage(
        data.error || "Sorry, something went wrong. Please try again.",
        "bot"
      );
      return;
    }

    addMessage(
      data.reply ||
        "Sorry, I couldn't generate a response right now. Please try again.",
      "bot"
    );
  } catch (error) {
    typingMsg.remove();
    addMessage(
      "Sorry, I couldn't connect right now. Please try again in a moment.",
      "bot"
    );
  }
}

chatbotButton.addEventListener("click", toggleChat);
chatClose.addEventListener("click", toggleChat);

chatSend.addEventListener("click", () => sendMessage());

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.getAttribute("data-question");
    sendMessage(question);
  });
});