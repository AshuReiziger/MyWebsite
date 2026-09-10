/**
 * Sigma Companion — embeddable widget.
 *
 * Loaded sitewide from src/app/layout.tsx via next/script, at a relative /sigma-
 * companion-widget.js path — so it resolves its own origin from
 * document.currentScript and calls same-origin /api/companion. Ported in from the
 * original standalone sigma-companion-webapp delivery (meant for a separate
 * cross-origin deployment); the request/response shape and client logic are
 * unchanged, only the color palette and floating-launcher position were adjusted
 * to fit this site (permanently dark theme, and an existing WhatsApp launcher
 * already sitting at bottom-right).
 */
(function () {
  if (window.__sigmaCompanionLoaded) return;
  window.__sigmaCompanionLoaded = true;

  // Resolve the API base from this script's own src, so this file works
  // unmodified regardless of domain — same pattern as the original delivery.
  var thisScript = document.currentScript;
  var API_BASE = (function () {
    try {
      return new URL(thisScript.src).origin;
    } catch {
      return "";
    }
  })();
  var API_URL = API_BASE + "/api/companion";
  var STORAGE_KEY = "sigmaCompanionHistory";

  // Matches this site's .theme-dark-fixed token values (src/app/globals.css) —
  // the site is permanently dark, so the widget uses the same palette instead of
  // Sigma Companion's own standalone light-mode colors, to avoid a jarring light
  // panel against a dark page.
  var ACCENT = "#e6c279";
  var ACCENT_TEXT = "#0a0a0a"; // dark text on the light-gold accent, for contrast
  var BG = "#0a0a0a";
  var SURFACE = "#161616"; // header, assistant bubbles, input row
  var LINE = "#2a2a2a";
  var TEXT = "#ffffff";
  var MUTED = "#a1a1a1";

  // Positioned above the site's WhatsApp launcher (fixed bottom-6 right-6, 56px
  // tall — see src/components/WhatsAppButton.tsx) rather than stacking on top of
  // it: 96px bottom clears WhatsApp's 24px offset + 56px height with a 16px gap.
  var LAUNCHER_BOTTOM = "96px";
  var LAUNCHER_RIGHT = "24px";

  // ---------- styles ----------
  var style = document.createElement("style");
  style.textContent = [
    "#sigma-companion-launcher{position:fixed;bottom:" + LAUNCHER_BOTTOM + ";right:" + LAUNCHER_RIGHT + ";z-index:2147483000;",
    "background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border:none;border-radius:999px;padding:14px 20px;",
    "font:600 14px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;",
    "box-shadow:0 6px 20px rgba(0,0,0,.4);cursor:pointer;display:flex;align-items:center;gap:8px;}",
    "#sigma-companion-launcher:hover{filter:brightness(1.08);}",
    "#sigma-companion-panel{position:fixed;bottom:" + LAUNCHER_BOTTOM + ";right:" + LAUNCHER_RIGHT + ";width:360px;max-width:92vw;",
    "height:540px;max-height:80vh;background:" + BG + ";border:1px solid " + LINE + ";border-radius:16px;",
    "box-shadow:0 12px 40px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;",
    "z-index:2147483000;font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:" + TEXT + ";}",
    "#sigma-companion-panel.open{display:flex;}",
    "#sc-header{background:" + SURFACE + ";color:" + TEXT + ";padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid " + LINE + ";}",
    "#sc-header-title{font-weight:700;font-size:15px;}",
    "#sc-header-sub{font-size:11px;color:" + MUTED + ";margin-top:2px;}",
    "#sc-close{background:none;border:none;color:" + TEXT + ";font-size:20px;cursor:pointer;line-height:1;opacity:.8;}",
    "#sc-close:hover{opacity:1;}",
    "#sc-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;}",
    ".sc-msg{max-width:85%;padding:9px 12px;border-radius:12px;white-space:pre-wrap;word-wrap:break-word;}",
    ".sc-msg.user{align-self:flex-end;background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border-bottom-right-radius:3px;}",
    ".sc-msg.assistant{align-self:flex-start;background:" + SURFACE + ";border:1px solid " + LINE + ";border-bottom-left-radius:3px;}",
    ".sc-msg.system{align-self:center;background:transparent;color:" + MUTED + ";font-size:12px;text-align:center;max-width:100%;}",
    "#sc-inputrow{border-top:1px solid " + LINE + ";padding:10px;display:flex;gap:8px;background:" + SURFACE + ";}",
    "#sc-input{flex:1;background:" + BG + ";color:" + TEXT + ";border:1px solid " + LINE + ";border-radius:10px;padding:9px 11px;font:14px/1.3 inherit;resize:none;height:40px;max-height:100px;}",
    "#sc-input::placeholder{color:" + MUTED + ";}",
    "#sc-input:focus{outline:2px solid " + ACCENT + ";outline-offset:1px;}",
    "#sc-send{background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border:none;border-radius:10px;padding:0 16px;font-weight:600;cursor:pointer;}",
    "#sc-send:disabled{opacity:.5;cursor:default;}",
    "#sc-footer{font-size:10px;color:" + MUTED + ";text-align:center;padding:6px 8px 8px;background:" + SURFACE + ";}",
    ".sc-typing{align-self:flex-start;color:" + MUTED + ";font-size:13px;font-style:italic;}",
  ].join("");
  document.head.appendChild(style);

  // ---------- launcher ----------
  var launcher = document.createElement("button");
  launcher.id = "sigma-companion-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open Sigma Companion");
  launcher.innerHTML = "✨ Ask Sigma Companion";
  document.body.appendChild(launcher);

  // ---------- panel ----------
  var panel = document.createElement("div");
  panel.id = "sigma-companion-panel";
  panel.innerHTML =
    '<div id="sc-header">' +
    '<div><div id="sc-header-title">Sigma Companion</div>' +
    '<div id="sc-header-sub">Design &amp; brand decision support</div></div>' +
    '<button id="sc-close" type="button" aria-label="Close">×</button>' +
    "</div>" +
    '<div id="sc-messages"></div>' +
    '<div id="sc-inputrow">' +
    '<textarea id="sc-input" placeholder="Describe the decision you’re facing…" rows="1"></textarea>' +
    '<button id="sc-send" type="button">Send</button>' +
    "</div>" +
    '<div id="sc-footer">Built on Sigma Studio’s five-pillar design methodology — AI-assisted, not a replacement for a full studio engagement.</div>';
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector("#sc-messages");
  var inputEl = panel.querySelector("#sc-input");
  var sendBtn = panel.querySelector("#sc-send");
  var closeBtn = panel.querySelector("#sc-close");

  var history = loadHistory();
  if (history.length === 0) {
    addMessage(
      "assistant",
      "Hi, I'm Sigma Companion. Tell me about the design or brand decision you're working on — a logo, a slogan, a positioning question, a rebrand you're considering. I'll ask a few questions first so my feedback actually fits your situation, then work through it with you.",
      false
    );
  } else {
    history.forEach(function (m) {
      addMessage(m.role, m.content, false);
    });
  }

  launcher.addEventListener("click", function () {
    panel.classList.add("open");
    launcher.style.display = "none";
    inputEl.focus();
  });
  closeBtn.addEventListener("click", function () {
    panel.classList.remove("open");
    launcher.style.display = "flex";
  });

  inputEl.addEventListener("input", function () {
    inputEl.style.height = "40px";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + "px";
  });
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  sendBtn.addEventListener("click", send);

  function addMessage(role, content, persist) {
    var el = document.createElement("div");
    el.className = "sc-msg " + role;
    el.textContent = content;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    if (persist !== false) {
      history.push({ role: role, content: content });
      saveHistory();
    }
  }

  function loadHistory() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  function saveHistory() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20)));
    } catch {
      /* storage unavailable — conversation just won't persist across reloads */
    }
  }

  function send() {
    var text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    inputEl.style.height = "40px";
    addMessage("user", text);
    setBusy(true);

    var typingEl = document.createElement("div");
    typingEl.className = "sc-msg sc-typing";
    typingEl.textContent = "Thinking…";
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: history.slice(0, -1), // history before this latest user turn
      }),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        typingEl.remove();
        if (!res.ok || !res.data || !res.data.reply) {
          addMessage(
            "system",
            (res.data && res.data.error) || "Something went wrong. Please try again.",
            false
          );
          return;
        }
        addMessage("assistant", res.data.reply);
      })
      .catch(function () {
        typingEl.remove();
        addMessage("system", "Couldn't reach Sigma Companion. Check your connection and try again.", false);
      })
      .finally(function () {
        setBusy(false);
      });
  }

  function setBusy(busy) {
    sendBtn.disabled = busy;
    inputEl.disabled = busy;
  }
})();
