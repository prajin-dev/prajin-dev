/**
 * Prajin AI Chatbot Client Script
 * Powered by Google Gemini 1.5 Flash (Free Tier)
 * Handles persona instruction, conversation memory, quick actions, and markdown parsing.
 */

(function () {
  // 1. CONFIGURATION & SYSTEM KNOWLEDGE PROMPT
  // Injected securely from .env during build:
  const GEMINI_API_KEY = "{{GEMINI_API_KEY}}";

  const SYSTEM_INSTRUCTION = `
You are "Prajin AI", the friendly, highly skilled, and professional virtual assistant for Prajin Dezaa and "Prajin and Team" (Full-Stack Web & Mobile App Development Studio based in Theni, Tamil Nadu, India).

ABOUT PRAJIN DEZAA & THE STUDIO:
- Name: Prajin Dezaa
- Role: Full-Stack Developer & Software Engineer
- Tagline: "I build websites & apps that grow businesses."
- Specializations: High-performance business websites, B2B ordering systems, e-commerce stores, Android PWAs, and technical SEO with sub-second page loads.
- Location: Theni, Tamil Nadu, India (working with global clients across USA, UK, UAE/Dubai, Australia, Canada, Singapore, Germany, and India).

VERIFIED PRODUCTION CASE STUDIES / PORTFOLIO:
1. Kalasam Jaikrishna Industries (https://kalasamjaikrishna.co.in) - Chemical and camphor manufacturing corporate portal with export inquiry workflows.
2. JKI Orders (https://jkiorders.in) - B2B ordering platform, distributor portal, Android APK, and desktop PWA.
3. Aparna Stores (https://aparnastores.shop) - Mobile-first grocery supermarket e-commerce store with bulk-pack pricing and WhatsApp order integration.

CONTACT & BOOKING CHANNELS:
- WhatsApp: +91 93609 70236 (wa.me/919360970236)
- Email: prajindezaa142@gmail.com
- LinkedIn: https://www.linkedin.com/in/prajin-dezaa-a3469543b
- GitHub: https://github.com/prajin-dev

YOUR RESPONSE GUIDELINES:
1. Be polite, welcoming, helpful, and confident. Keep answers concise (2 to 4 sentences) unless detailed technical details are requested.
2. If visitors ask about hiring, starting a project, or requesting a price quote, kindly guide them to reach out on WhatsApp (+91 93609 70236) or email.
3. Automatically match the user's language (English, Tamil தமிழ், Hindi हिन्दी, etc.).
4. Use neat markdown (bullet points or bold text) for readability.
`.trim();

  // Conversation history in Gemini format
  const chatHistory = [];

  // Helper: Format simple markdown (bold, links, breaks)
  function renderMarkdown(text) {
    if (!text) return "";
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Links [text](url)
    escaped = escaped.replace(
      /\[(.*?)\]\((https?:\/\/[^\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    // Line breaks
    escaped = escaped.replace(/\n/g, "<br>");
    return escaped;
  }

  // Helper: Get Current Time String (HH:MM)
  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // 2. BUILD THE UI DOM ELEMENTS
  function initChatbotUI() {
    // Floating Trigger Button
    const launcher = document.createElement("button");
    launcher.className = "ai-chat-launcher";
    launcher.id = "aiChatLauncher";
    launcher.setAttribute("aria-label", "Chat with Prajin AI");
    launcher.innerHTML = `
      <div class="ai-launcher-icon ai-icon-open">
        <img src="./assets/images/nav-emblem.png" alt="Prajin AI" class="ai-launcher-logo-img">
      </div>
      <div class="ai-launcher-icon ai-icon-close">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </div>
      <span class="ai-launcher-tooltip">
        <span class="ai-sparkle-dot"></span> Ask Prajin AI
      </span>
    `;

    // Chat Window Panel
    const panel = document.createElement("div");
    panel.className = "ai-chat-panel";
    panel.id = "aiChatPanel";
    panel.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-header-profile">
          <div class="ai-avatar">
            <img src="./assets/images/nav-emblem.png" alt="Prajin AI" class="ai-avatar-img">
            <span class="ai-status-indicator" title="Online"></span>
          </div>
          <div class="ai-header-info">
            <div class="ai-header-title">
              Prajin AI <span class="ai-tag">Assistant</span>
            </div>
            <div class="ai-header-subtitle">Available · Replies instantly</div>
          </div>
        </div>
        <button class="ai-close-btn" id="aiCloseBtn" aria-label="Close Chat">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div class="ai-chat-body" id="aiChatBody">
        <div class="ai-msg bot">
          <p>👋 Hello! I'm <strong>Prajin AI</strong>, virtual assistant for Prajin & Team.</p>
          <p>How can I help you today? You can ask about our <strong>services</strong>, <strong>past projects</strong>, or discuss your upcoming website/app project!</p>
          <span class="ai-msg-time">${getTimeString()}</span>
        </div>
        <div class="ai-typing-indicator" id="aiTypingIndicator">
          <span class="ai-dot"></span>
          <span class="ai-dot"></span>
          <span class="ai-dot"></span>
        </div>
      </div>

      <div class="ai-chips-container" id="aiChipsContainer">
        <button class="ai-chip" data-query="What services do you offer?">🛠️ Services</button>
        <button class="ai-chip" data-query="Show me your past projects & case studies">💼 Projects</button>
        <button class="ai-chip" data-query="How can I hire or contact Prajin?">📱 Contact</button>
        <button class="ai-chip" data-query="What tech stack do you specialize in?">⚡ Tech Stack</button>
      </div>

      <div class="ai-chat-footer">
        <input type="text" class="ai-input-field" id="aiInputField" placeholder="Ask anything about Prajin's work..." autocomplete="off">
        <button class="ai-send-btn" id="aiSendBtn" aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    setupChatbotListeners(launcher, panel);
  }

  // 3. EVENT LISTENERS & CHAT BEHAVIOR
  function setupChatbotListeners(launcher, panel) {
    const closeBtn = document.getElementById("aiCloseBtn");
    const inputField = document.getElementById("aiInputField");
    const sendBtn = document.getElementById("aiSendBtn");
    const chatBody = document.getElementById("aiChatBody");
    const typingIndicator = document.getElementById("aiTypingIndicator");
    const chips = document.querySelectorAll(".ai-chip");

    // Toggle Chat
    function toggleChat() {
      const isOpen = panel.classList.toggle("is-open");
      launcher.classList.toggle("is-active", isOpen);
      if (isOpen) {
        setTimeout(() => inputField.focus(), 200);
      }
    }

    launcher.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    // Send on click or Enter key
    sendBtn.addEventListener("click", handleSendMessage);
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    // Chip quick clicks
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        if (query) {
          inputField.value = query;
          handleSendMessage();
        }
      });
    });

    // Append Message to UI
    function appendMessage(text, sender = "user") {
      const msgDiv = document.createElement("div");
      msgDiv.className = `ai-msg ${sender}`;

      if (sender === "user") {
        msgDiv.textContent = text;
      } else {
        msgDiv.innerHTML = renderMarkdown(text);
      }

      const timeSpan = document.createElement("span");
      timeSpan.className = "ai-msg-time";
      timeSpan.textContent = getTimeString();
      msgDiv.appendChild(timeSpan);

      chatBody.insertBefore(msgDiv, typingIndicator);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Call Google Gemini API
    async function handleSendMessage() {
      const text = inputField.value.trim();
      if (!text) return;

      // Add user message to UI
      appendMessage(text, "user");
      inputField.value = "";
      sendBtn.disabled = true;

      // Show typing indicator
      typingIndicator.classList.add("is-visible");
      chatBody.scrollTop = chatBody.scrollHeight;

      // Check if API key is configured
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        setTimeout(() => {
          typingIndicator.classList.remove("is-visible");
          appendMessage(
            "⚠️ **API Key Missing**: Please set your free Gemini API Key in `src/assets/js/chatbot.js` to enable real-time replies!",
            "bot"
          );
          sendBtn.disabled = false;
        }, 600);
        return;
      }

      // Add to session history
      chatHistory.push({
        role: "user",
        parts: [{ text }]
      });

      try {
        // Fast-first resilient model cascade:
        // 1. gemini-3.1-flash-lite: fastest lightweight model (1-2s response)
        // 2. gemini-flash-latest: high performance fallback
        // 3. gemini-3.5-flash: smart multi-turn fallback
        const candidateModels = [
          "gemini-3.1-flash-lite",
          "gemini-flash-latest",
          "gemini-3.5-flash"
        ];

        let botReply = null;
        let lastError = null;

        for (const modelName of candidateModels) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s max per model

            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
              GEMINI_API_KEY
            )}`;

            const response = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_INSTRUCTION }]
                },
                contents: chatHistory.slice(-6),
                generationConfig: {
                  temperature: 0.5,
                  maxOutputTokens: 600
                }
              })
            });

            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              const candidate = data.candidates?.[0];
              const parts = candidate?.content?.parts || [];

              // Filter out internal reasoning / thought blocks and take the real text response
              const answerParts = parts.filter(p => !p.thought && typeof p.text === 'string' && p.text.trim());
              const candidateText = answerParts.map(p => p.text).join('\n\n').trim();

              // Clean any stray "Draft X (Mental Outline..." prefixes if returned
              if (candidateText) {
                botReply = candidateText.replace(/^Draft\s*\d+\s*(\([^)]*\))?:?\s*/i, '').trim();
                if (botReply) break; // Successfully got full clean reply!
              }
            } else {
              const errData = await response.json().catch(() => ({}));
              lastError = new Error(errData?.error?.message || `Status ${response.status}`);
            }
          } catch (modelErr) {
            lastError = modelErr;
          }
        }

        if (!botReply) {
          throw lastError || new Error("All AI models are currently busy.");
        }

        // Add bot reply to session history
        chatHistory.push({
          role: "model",
          parts: [{ text: botReply }]
        });

        typingIndicator.classList.remove("is-visible");
        appendMessage(botReply, "bot");
      } catch (err) {
        console.error("Prajin AI Error:", err);
        typingIndicator.classList.remove("is-visible");
        appendMessage(
          `⚠️ Unable to reach AI: ${err.message}. Please message Prajin directly via [WhatsApp](https://wa.me/919360970236).`,
          "bot"
        );
      } finally {
        sendBtn.disabled = false;
      }
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbotUI);
  } else {
    initChatbotUI();
  }
})();
