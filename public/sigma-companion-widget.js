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
 *
 * File attachments (added after the initial port-in): a visitor can attach up to
 * MAX_ATTACHMENTS images/PDFs so Sigma Companion can look at an actual logo or
 * brand doc, not just a description of one. Attachments are single-turn only —
 * see the note above MAX_ATTACHMENTS below for why they're never stored in
 * `history`/sessionStorage or resent on later requests.
 *
 * Voice (added after attachments): the mic button uses the browser's built-in
 * Web Speech API (SpeechRecognition) to dictate a message — no new backend, no
 * third-party speech service. It's Chrome/Edge-only (no Safari/Firefox support),
 * so the button is simply hidden when the API isn't present rather than showing
 * a broken control. The header's speaker toggle uses the matching SpeechSynthesis
 * API to read Sigma Companion's replies aloud when turned on; both degrade to
 * plain typing/reading if the browser lacks either API.
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
  var VOICE_REPLIES_KEY = "sigmaCompanionVoiceReplies";

  // Web Speech API — Chrome/Edge only (webkitSpeechRecognition is the vendor-
  // prefixed name Chrome still ships). No polyfill/fallback service is used;
  // the mic button and speaker toggle just hide themselves where unsupported.
  var SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  var speechSynthesisSupported = "speechSynthesis" in window;

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

  // Mirrors the server's limits in src/app/api/companion/route.ts — client-side
  // checks are just for fast feedback, the server is the real source of truth.
  // Attachments never get pushed into `history` (only a plain-text "[Attached:
  // ...]" note does), so they're never persisted to sessionStorage and never
  // resent on a later turn — this keeps request size bounded no matter how long
  // a conversation runs, well under Vercel Functions' request body limit.
  var MAX_ATTACHMENTS = 3;
  var MAX_ATTACHMENTS_TOTAL_BYTES = 4000000;
  var MAX_IMAGE_DIMENSION = 1568; // Anthropic's recommended long edge for vision input
  var ALLOWED_TYPES = {
    "image/png": true,
    "image/jpeg": true,
    "image/webp": true,
    "image/gif": true,
    "application/pdf": true,
  };

  var pendingAttachments = []; // {name, mediaType, data (base64, no prefix), previewUrl, bytes}

  // ---------- styles ----------
  var style = document.createElement("style");
  style.textContent = [
    "#sigma-companion-launcher{position:fixed;bottom:" + LAUNCHER_BOTTOM + ";right:" + LAUNCHER_RIGHT + ";z-index:2147483000;",
    "background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border:none;border-radius:999px;padding:14px 20px;",
    "font:600 14px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;",
    "box-shadow:0 6px 20px rgba(0,0,0,.4);cursor:pointer;display:flex;align-items:center;gap:8px;}",
    "#sigma-companion-launcher:hover{filter:brightness(1.08);}",
    // The full pill (icon + label) is fine on desktop, where there's plenty of
    // margin around the fixed bottom-right corner. On narrow/mobile viewports
    // its ~200px width was wide enough to sit directly over page content
    // scrolled beneath it (e.g. Contact's Area of Interest field, Work's case
    // study titles) — collapsed to a plain 56px circle there instead, matching
    // WhatsAppButton.tsx's own compact treatment and footprint.
    "@media (max-width:767px){#sigma-companion-launcher{width:56px;height:56px;padding:0;justify-content:center;}",
    ".sc-launcher-label{display:none;}}",
    "#sigma-companion-panel{position:fixed;bottom:" + LAUNCHER_BOTTOM + ";right:" + LAUNCHER_RIGHT + ";width:360px;max-width:92vw;",
    "height:540px;max-height:80vh;background:" + BG + ";border:1px solid " + LINE + ";border-radius:16px;",
    "box-shadow:0 12px 40px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;",
    "z-index:2147483000;font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:" + TEXT + ";}",
    "#sigma-companion-panel.open{display:flex;}",
    "#sc-header{background:" + SURFACE + ";color:" + TEXT + ";padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid " + LINE + ";}",
    "#sc-header-title{font-weight:700;font-size:15px;}",
    "#sc-header-sub{font-size:11px;color:" + MUTED + ";margin-top:2px;}",
    "#sc-header-actions{display:flex;align-items:center;gap:10px;}",
    "#sc-voice-toggle{background:none;border:none;color:" + TEXT + ";font-size:16px;cursor:pointer;line-height:1;opacity:.8;}",
    "#sc-voice-toggle:hover{opacity:1;}",
    "#sc-close{background:none;border:none;color:" + TEXT + ";font-size:20px;cursor:pointer;line-height:1;opacity:.8;}",
    "#sc-close:hover{opacity:1;}",
    "#sc-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;}",
    ".sc-msg{max-width:85%;padding:9px 12px;border-radius:12px;white-space:pre-wrap;word-wrap:break-word;display:flex;flex-direction:column;gap:6px;}",
    ".sc-msg.user{align-self:flex-end;background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border-bottom-right-radius:3px;}",
    ".sc-msg.assistant{align-self:flex-start;background:" + SURFACE + ";border:1px solid " + LINE + ";border-bottom-left-radius:3px;}",
    ".sc-msg.system{align-self:center;background:transparent;color:" + MUTED + ";font-size:12px;text-align:center;max-width:100%;}",
    ".sc-msg-attachments{display:flex;flex-wrap:wrap;gap:6px;}",
    ".sc-msg-attachments img{width:64px;height:64px;object-fit:cover;border-radius:8px;display:block;}",
    ".sc-doc-chip{display:flex;align-items:center;font-size:12px;background:rgba(0,0,0,.15);border-radius:8px;padding:4px 8px;}",
    "#sc-attach-tray{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px 0;background:" + SURFACE + ";}",
    "#sc-attach-tray:empty{display:none;padding:0;}",
    ".sc-chip{display:flex;align-items:center;gap:6px;background:" + BG + ";border:1px solid " + LINE + ";border-radius:8px;padding:4px 6px;font-size:12px;color:" + TEXT + ";max-width:150px;}",
    ".sc-chip img{width:22px;height:22px;object-fit:cover;border-radius:4px;flex-shrink:0;}",
    ".sc-chip-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
    ".sc-chip-remove{background:none;border:none;color:" + MUTED + ";cursor:pointer;font-size:15px;line-height:1;padding:0;flex-shrink:0;}",
    ".sc-chip-remove:hover{color:" + TEXT + ";}",
    "#sc-inputrow{border-top:1px solid " + LINE + ";padding:10px;background:" + SURFACE + ";}",
    "#sc-input-pill{display:flex;align-items:flex-end;gap:2px;background:" + BG + ";border:1px solid " + LINE + ";border-radius:22px;padding:5px 5px 5px 14px;}",
    "#sc-input-pill:focus-within{border-color:" + ACCENT + ";}",
    "#sc-attach-btn,#sc-mic-btn{flex-shrink:0;background:none;border:none;border-radius:50%;width:32px;height:32px;font-size:16px;line-height:1;cursor:pointer;color:" + TEXT + ";display:flex;align-items:center;justify-content:center;}",
    "#sc-attach-btn:hover,#sc-mic-btn:hover{background:rgba(255,255,255,.08);}",
    "#sc-attach-btn:disabled,#sc-mic-btn:disabled{opacity:.4;cursor:default;background:none;}",
    "#sc-mic-btn.listening{background:" + ACCENT + ";color:" + ACCENT_TEXT + ";animation:sc-pulse 1.1s ease-in-out infinite;}",
    "@keyframes sc-pulse{0%,100%{opacity:1;}50%{opacity:.5;}}",
    "#sc-input{flex:1;min-width:0;background:none;color:" + TEXT + ";border:none;outline:none;padding:7px 6px;font:14px/1.3 inherit;resize:none;height:34px;max-height:100px;}",
    "#sc-input::placeholder{color:" + MUTED + ";}",
    "#sc-send{flex-shrink:0;background:" + ACCENT + ";color:" + ACCENT_TEXT + ";border:none;border-radius:50%;width:32px;height:32px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}",
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
  launcher.innerHTML =
    '<span aria-hidden="true">✨</span><span class="sc-launcher-label">Ask Sigma Companion</span>';
  document.body.appendChild(launcher);

  // ---------- panel ----------
  var panel = document.createElement("div");
  panel.id = "sigma-companion-panel";
  panel.innerHTML =
    '<div id="sc-header">' +
    '<div><div id="sc-header-title">Sigma Companion</div>' +
    '<div id="sc-header-sub">Design &amp; brand decision support</div></div>' +
    '<div id="sc-header-actions">' +
    '<button id="sc-voice-toggle" type="button" aria-label="Turn on spoken replies" aria-pressed="false">🔇</button>' +
    '<button id="sc-close" type="button" aria-label="Close">×</button>' +
    "</div>" +
    "</div>" +
    '<div id="sc-messages"></div>' +
    '<div id="sc-attach-tray"></div>' +
    '<div id="sc-inputrow">' +
    '<div id="sc-input-pill">' +
    '<button id="sc-attach-btn" type="button" aria-label="Attach a file">📎</button>' +
    '<input id="sc-file-input" type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif,application/pdf" style="display:none" />' +
    '<textarea id="sc-input" placeholder="Describe the decision you’re facing…" rows="1"></textarea>' +
    '<button id="sc-mic-btn" type="button" aria-label="Speak your message">🎤</button>' +
    '<button id="sc-send" type="button" aria-label="Send message">➤</button>' +
    "</div>" +
    "</div>" +
    '<div id="sc-footer">Built on Sigma Studio’s five-pillar design methodology — AI-assisted, not a replacement for a full studio engagement.</div>';
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector("#sc-messages");
  var attachTrayEl = panel.querySelector("#sc-attach-tray");
  var inputEl = panel.querySelector("#sc-input");
  var sendBtn = panel.querySelector("#sc-send");
  var closeBtn = panel.querySelector("#sc-close");
  var attachBtn = panel.querySelector("#sc-attach-btn");
  var fileInput = panel.querySelector("#sc-file-input");
  var micBtn = panel.querySelector("#sc-mic-btn");
  var voiceToggleBtn = panel.querySelector("#sc-voice-toggle");

  var recognition = null; // active SpeechRecognition instance while listening, else null
  var voiceRepliesEnabled = false;
  if (speechSynthesisSupported) {
    try {
      voiceRepliesEnabled = sessionStorage.getItem(VOICE_REPLIES_KEY) === "1";
    } catch {
      /* storage unavailable — spoken replies just default to off each load */
    }
  } else {
    voiceToggleBtn.style.display = "none";
  }
  updateVoiceToggleUI();

  if (!SpeechRecognitionCtor) {
    micBtn.style.display = "none";
  }

  var history = loadHistory();
  if (history.length === 0) {
    addMessage(
      "assistant",
      "Hi, I'm Sigma Companion. Tell me about the design or brand decision you're working on — a logo, a slogan, a positioning question, a rebrand you're considering. You can attach an image or PDF (like a logo or brand doc) with the 📎 button, or just describe it. I'll ask a few questions first so my feedback actually fits your situation, then work through it with you.",
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
    if (recognition) recognition.stop();
    if (speechSynthesisSupported) window.speechSynthesis.cancel();
  });

  inputEl.addEventListener("input", function () {
    inputEl.style.height = "34px";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + "px";
  });
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  sendBtn.addEventListener("click", send);

  attachBtn.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    handleFiles(fileInput.files);
    fileInput.value = ""; // allow re-picking the same file later
  });

  if (SpeechRecognitionCtor) {
    micBtn.addEventListener("click", function () {
      if (recognition) {
        recognition.stop(); // onend below finishes the turn
        return;
      }
      startListening();
    });
  }

  if (speechSynthesisSupported) {
    voiceToggleBtn.addEventListener("click", function () {
      voiceRepliesEnabled = !voiceRepliesEnabled;
      if (!voiceRepliesEnabled) window.speechSynthesis.cancel();
      try {
        sessionStorage.setItem(VOICE_REPLIES_KEY, voiceRepliesEnabled ? "1" : "0");
      } catch {
        /* storage unavailable — preference just won't persist across reloads */
      }
      updateVoiceToggleUI();
    });
  }

  // Dictates into #sc-input live (interim results included, so the visitor sees
  // words appear as they speak) and auto-sends on the final result — matching
  // how a voice assistant works rather than requiring a separate manual send.
  function startListening() {
    recognition = new SpeechRecognitionCtor();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    var finalTranscript = "";
    recognition.onresult = function (e) {
      var interim = "";
      for (var i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      inputEl.value = (finalTranscript + interim).trim();
      inputEl.style.height = "34px";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + "px";
    };
    recognition.onerror = function () {
      finalTranscript = ""; // don't auto-send a botched/interrupted attempt
    };
    recognition.onend = function () {
      recognition = null;
      micBtn.classList.remove("listening");
      micBtn.setAttribute("aria-label", "Speak your message");
      if (finalTranscript.trim()) {
        inputEl.value = finalTranscript.trim();
        send();
      }
    };
    recognition.start();
    micBtn.classList.add("listening");
    micBtn.setAttribute("aria-label", "Stop listening");
  }

  function updateVoiceToggleUI() {
    voiceToggleBtn.textContent = voiceRepliesEnabled ? "🔊" : "🔇";
    voiceToggleBtn.setAttribute(
      "aria-label",
      voiceRepliesEnabled ? "Turn off spoken replies" : "Turn on spoken replies"
    );
    voiceToggleBtn.setAttribute("aria-pressed", voiceRepliesEnabled ? "true" : "false");
  }

  function speak(text) {
    try {
      window.speechSynthesis.cancel(); // interrupt any reply still being read
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = navigator.language || "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      /* speech synthesis unavailable/blocked — reply is still shown as text */
    }
  }

  function handleFiles(fileList) {
    Array.prototype.forEach.call(fileList, function (file) {
      if (pendingAttachments.length >= MAX_ATTACHMENTS) {
        addMessage("system", "You can attach at most " + MAX_ATTACHMENTS + " files per message.", false);
        return;
      }
      if (!ALLOWED_TYPES[file.type]) {
        addMessage(
          "system",
          "“" + file.name + "” isn't a supported file type. Attach an image (PNG/JPEG/WebP/GIF) or a PDF.",
          false
        );
        return;
      }
      if (file.type === "application/pdf") {
        readFileAsBase64(file, function (base64) {
          addPendingAttachment(file.name, file.type, base64, null);
        });
      } else {
        resizeImage(file, function (base64, previewUrl) {
          addPendingAttachment(file.name, "image/jpeg", base64, previewUrl);
        });
      }
    });
  }

  function readFileAsBase64(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      cb(String(reader.result).split(",")[1] || "");
    };
    reader.onerror = function () {
      addMessage("system", "Couldn't read “" + file.name + "”.", false);
    };
    reader.readAsDataURL(file);
  }

  function resizeImage(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.width, img.height));
        var w = Math.max(1, Math.round(img.width * scale));
        var h = Math.max(1, Math.round(img.height * scale));
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        var dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        cb(dataUrl.split(",")[1] || "", dataUrl);
      };
      img.onerror = function () {
        addMessage("system", "Couldn't read “" + file.name + "” as an image.", false);
      };
      img.src = String(reader.result);
    };
    reader.onerror = function () {
      addMessage("system", "Couldn't read “" + file.name + "”.", false);
    };
    reader.readAsDataURL(file);
  }

  function addPendingAttachment(name, mediaType, base64Data, previewUrl) {
    if (!base64Data) return;
    var bytes = Math.floor((base64Data.length / 4) * 3);
    var currentTotal = pendingAttachments.reduce(function (sum, a) {
      return sum + a.bytes;
    }, 0);
    if (currentTotal + bytes > MAX_ATTACHMENTS_TOTAL_BYTES) {
      addMessage(
        "system",
        "“" + name + "” would put your attachments over the 4MB limit — remove one first.",
        false
      );
      return;
    }
    pendingAttachments.push({
      name: name,
      mediaType: mediaType,
      data: base64Data,
      previewUrl: previewUrl,
      bytes: bytes,
    });
    renderAttachTray();
  }

  function renderAttachTray() {
    attachTrayEl.innerHTML = "";
    pendingAttachments.forEach(function (att, i) {
      var chip = document.createElement("div");
      chip.className = "sc-chip";
      if (att.previewUrl) {
        var img = document.createElement("img");
        img.src = att.previewUrl;
        img.alt = "";
        chip.appendChild(img);
      } else {
        var icon = document.createElement("span");
        icon.textContent = "📄";
        chip.appendChild(icon);
      }
      var nameEl = document.createElement("span");
      nameEl.className = "sc-chip-name";
      nameEl.textContent = att.name;
      chip.appendChild(nameEl);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "sc-chip-remove";
      removeBtn.setAttribute("aria-label", "Remove " + att.name);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", function () {
        pendingAttachments.splice(i, 1);
        renderAttachTray();
      });
      chip.appendChild(removeBtn);
      attachTrayEl.appendChild(chip);
    });
  }

  // Renders the user's own bubble live at send time: thumbnails (from in-memory
  // preview data URLs) plus the typed text, no "[Attached: ...]" note — that note
  // is only for the plain-text copy pushed into `history` (see send()), so a
  // page-reload restore (which has no thumbnails) still shows what was attached.
  function addUserMessageEl(text, attachments) {
    var el = document.createElement("div");
    el.className = "sc-msg user";
    if (attachments.length > 0) {
      var thumbs = document.createElement("div");
      thumbs.className = "sc-msg-attachments";
      attachments.forEach(function (att) {
        if (att.previewUrl) {
          var img = document.createElement("img");
          img.src = att.previewUrl;
          img.alt = att.name;
          img.title = att.name;
          thumbs.appendChild(img);
        } else {
          var doc = document.createElement("span");
          doc.className = "sc-doc-chip";
          doc.textContent = "📄 " + att.name;
          thumbs.appendChild(doc);
        }
      });
      el.appendChild(thumbs);
    }
    if (text) {
      var textEl = document.createElement("div");
      textEl.textContent = text;
      el.appendChild(textEl);
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(role, content, persist) {
    var el = document.createElement("div");
    el.className = "sc-msg " + role;
    el.textContent = content;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    if (persist !== false) {
      history.push({ role: role, content: content });
      saveHistory();
      if (role === "assistant" && voiceRepliesEnabled) {
        speak(content);
      }
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
    var attachments = pendingAttachments;
    if (!text && attachments.length === 0) return;

    inputEl.value = "";
    inputEl.style.height = "34px";
    pendingAttachments = [];
    renderAttachTray();

    addUserMessageEl(text, attachments);

    // Plain-text copy for history/context — attachments themselves are never
    // stored or resent (single-turn only, see the note above MAX_ATTACHMENTS).
    var storedContent =
      text +
      (attachments.length > 0
        ? (text ? "\n\n" : "") +
          "[Attached: " +
          attachments
            .map(function (a) {
              return a.name;
            })
            .join(", ") +
          "]"
        : "");
    history.push({ role: "user", content: storedContent });
    saveHistory();

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
        attachments: attachments.map(function (a) {
          return { mediaType: a.mediaType, data: a.data };
        }),
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
    attachBtn.disabled = busy;
    micBtn.disabled = busy;
  }
})();
