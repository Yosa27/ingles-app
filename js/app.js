/* ============================================================
   ENGLISH GO — Lógica de la aplicación
   Almacenamiento local, repetición espaciada, audio (TTS),
   test adaptativo, flashcards, escritura, escucha y frases.
   ============================================================ */
(function () {
  "use strict";

  // ---------------- Utilidades de persistencia ----------------
  const LS = {
    words: "eg_words",
    state: "eg_state",
    days: "eg_days",
    phrase: "eg_phrase",
  };

  let SRS = loadJSON(LS.words, {});          // id -> {box,due,ok,n,last}
  let STATE = loadJSON(LS.state, {});        // level, levelIdx, goal
  let DAYS = loadJSON(LS.days, {});          // "YYYY-MM-DD" -> {n, ids[]}
  let PHRASE = loadJSON(LS.phrase, {});      // situacion -> count correct

  function loadJSON(k, def) {
    try { const v = JSON.parse(localStorage.getItem(k)); return v === null || v === undefined ? def : v; }
    catch (e) { return def; }
  }
  function saveWords() { localStorage.setItem(LS.words, JSON.stringify(SRS)); }
  function saveState() { localStorage.setItem(LS.state, JSON.stringify(STATE)); }
  function saveDays() { localStorage.setItem(LS.days, JSON.stringify(DAYS)); }
  function savePhrase() { localStorage.setItem(LS.phrase, JSON.stringify(PHRASE)); }

  // ---------------- Fechas ----------------
  function fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function todayStr() { return fmtDate(new Date()); }
  function addDaysDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return fmtDate(d);
  }

  // ---------------- Nivel ----------------
  const NIVEL_CLAVE = ["basico", "intermedio", "avanzado"];
  const NIVEL_NOMBRE = ["Básico (A1-A2)", "Intermedio (B1)", "Avanzado (B2-C1)"];
  const NIVEL_DESC = [
    "Empezamos por lo esencial: palabras de la vida diaria y frases simples.",
    "¡Buen nivel! Repasamos vocabulario útil y empezamos a sumar frases más naturales.",
    "Nivel alto. Perfeccionamos con phrasal verbs y expresiones de trabajo.",
  ];

  function levelIdx() {
    const i = parseInt(STATE.levelIdx, 10);
    return isNaN(i) ? 0 : i;
  }
  function nivelIndex() { return levelIdx(); }
  function unlocked(v) { return v.niv <= levelIdx() + 1; }

  // ---------------- TTS (texto a voz) ----------------
  function getVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /en(-US|_US)?$/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || voices[0];
  }
  function speakEN(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    const v = getVoice();
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
  window.speakText = function (e, text) {
    e && e.stopPropagation();
    speakEN(text);
  };

  // ---------------- Normalización de respuestas ----------------
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,!?¿¡'’"()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function checkAnswer(user, answer) {
    const u = norm(user);
    if (!u) return false;
    return String(answer).split("/").some(a => norm(a) === u);
  }

  // ---------------- Registro de estudio ----------------
  function recordStudy(id) {
    const k = todayStr();
    if (!DAYS[k]) DAYS[k] = { n: 0, ids: [] };
    if (DAYS[k].ids.indexOf(id) === -1) {
      DAYS[k].ids.push(id);
      DAYS[k].n++;
    }
    saveDays();
  }

  function getStreak() {
    const d = new Date();
    let cur = fmtDate(d);
    if (!DAYS[cur]) {
      d.setDate(d.getDate() - 1);
      cur = fmtDate(d);
    }
    let streak = 0;
    while (DAYS[cur]) {
      streak++;
      d.setDate(d.getDate() - 1);
      cur = fmtDate(d);
    }
    return streak;
  }

  function wordsToday() {
    const k = todayStr();
    return DAYS[k] ? DAYS[k].n : 0;
  }

  // ---------------- Repetición espaciada (SRS) ----------------
  const BOX_INTERVAL = [0, 1, 2, 4, 8, 16]; // días que esperamos tras subir de caja

  function gradeWord(id, g) {
    let w = SRS[id] || { box: 0, ok: 0, n: 0, last: 0 };
    w.n++;
    w.last = Date.now();
    if (g === 2) {
      w.ok++;
      w.box = Math.min(5, w.box + 1);
      w.due = addDaysDate(BOX_INTERVAL[w.box]);
    } else if (g === 1) {
      w.box = Math.max(1, w.box);
      w.due = addDaysDate(BOX_INTERVAL[w.box]);
    } else {
      w.box = 1;
      w.due = todayStr();
    }
    SRS[id] = w;
    saveWords();
    recordStudy(id);
  }

  function dueToday(due) {
    return !due || due <= todayStr();
  }

  // ============================================================
  //  MENSAJES MOTIVACIONALES Y RECORDATORIOS
  // ============================================================
  const MOTIV = [
    "Unos minutos al día valen más que una sesión larga a la semana. 💪",
    "Cada palabra nueva es un paso más hacia tu meta. 🌱",
    "No caigas en la perfección: la constancia gana. 🏆",
    "El idioma se aprende practicando, no memorizando. ✨",
    "Hoy puedes entender una frase que ayer no entendías. 🚀",
    "Pequeños avances, grandes resultados. 📈",
    "Tu cerebro ya está conectando el inglés… sigue así. 🧠",
    "Un día a la vez. Repite, escucha y verás la diferencia. 🔁",
    "La dificultad que sientes hoy es prueba de crecimiento. 🌿",
    "Hablar en voz alta te hace más dueño del idioma. 🗣️",
    "No nervios: en una frase nueva solo hay una oportunidad. 🌟",
    "La racha de hoy es el orgullo de mañana. 🔥",
  ];

  function getMotiv() {
    return MOTIV[Math.floor(Math.random() * MOTIV.length)];
  }
  function getPraise(streak) {
    if (streak >= 7) return "¡7 días seguidos! Tu constancia es admirable. 🔥🔥";
    if (streak >= 3) return "¡" + streak + " días de racha! Vas a otro nivel. 🔥";
    return "¡Sesión completada! Cada minuto cuenta. 💪";
  }

  // ---- Toast (aviso dentro de la app) ----
  let toastTimer = null;
  function toast(msg, ms) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), ms || 4000);
  }

  // ---- Notificaciones (recordatorio) ----
  function remCfg() {
    if (!STATE.recordatorio) STATE.recordatorio = { activo: false, hora: "19:00", ultimoDia: "" };
    return STATE.recordatorio;
  }

  function notifyAllowed() {
    return "Notification" in window && Notification.permission === "granted";
  }

  function showNotification(msj) {
    if (!notifyAllowed()) return;
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification("⏰ English Go — ¡Hora de practicar!", {
          body: msj,
          icon: "icons/icon-192.png",
          badge: "icons/icon-192.png",
          vibrate: [80, 40, 80],
          tag: "recordatorio",
        });
      }).catch(() => {});
      return;
    }
    try {
      const n = new Notification("⏰ English Go — ¡Hora de practicar!", { body: msj, icon: "icons/icon-192.png" });
      n.onclick = () => { window.focus(); go("inicio"); };
    } catch (e) {}
  }

  function checkReminder() {
    const cfg = remCfg();
    if (!cfg.activo) return;
    if (cfg.ultimoDia === todayStr()) return;
    const [h, m] = String(cfg.hora).split(":").map(Number);
    const now = new Date();
    if (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m)) {
      cfg.ultimoDia = todayStr();
      saveState();
      const msg = getMotiv();
      showNotification("Toca para abrir tu sesión… " + msg);
      toast("🔔 " + msg, 6000);
    }
  }

  function renderRemUI() {
    const cfg = remCfg();
    const toggle = document.getElementById("rem-toggle");
    const time = document.getElementById("rem-time");
    const status = document.getElementById("rem-status");
    if (!toggle) return;
    toggle.checked = cfg.activo;
    time.value = cfg.hora;
    if (!("Notification" in window)) {
      status.textContent = "Este navegador no admite notificaciones.";
      return;
    }
    if (Notification.permission === "granted") status.textContent = "Notificaciones activadas. ✅";
    else if (Notification.permission === "denied") status.textContent = "Bloqueaste las notificaciones en el navegador.";
    else status.textContent = cfg.activo ? "Pide permiso para notificarte…" : "";
  }

  function enableReminder() {
    const onChange = () => {
      const cfg = remCfg();
      cfg.hora = document.getElementById("rem-time").value || "19:00";
      cfg.ultimoDia = "";
      if (document.getElementById("rem-toggle").checked) {
        if (!("Notification" in window)) {
          document.getElementById("rem-toggle").checked = false;
          toast("Tu navegador no permite notificaciones. Usa Chrome o Edge. ⚠️");
          return;
        }
        if (Notification.permission === "default") {
          Notification.requestPermission().then(p => {
            cfg.activo = p === "granted";
            document.getElementById("rem-toggle").checked = cfg.activo;
            toast(cfg.activo ? "🔔 Recordatorio activado. ¡Nos vemos más tarde!" : "No activamos la notificación, pero seguirás viendo avisos en la app.");
            saveState();
            renderRemUI();
            checkReminder();
          });
        } else {
          cfg.activo = Notification.permission === "granted";
          if (!cfg.activo) toast("Recuerda: activa las notificaciones en la configuración del navegador. ⚠️");
          saveState();
          renderRemUI();
        }
      } else {
        cfg.activo = false;
        saveState();
        renderRemUI();
      }
    };
    document.getElementById("rem-toggle").onchange = onChange;
    document.getElementById("rem-time").onchange = () => {
      const cfg = remCfg();
      cfg.hora = document.getElementById("rem-time").value || "19:00";
      cfg.ultimoDia = "";
      saveState();
      toast("🔔 Recordatorio fijado a las " + cfg.hora);
    };
  }

  function scheduleReminderCheck() {
    checkReminder();
    setInterval(checkReminder, 30000);
  }

  // ============================================================
  //  NAVEGACIÓN
  // ============================================================
  const views = document.querySelectorAll(".view");
  const navBtns = document.querySelectorAll(".nav-btn");

  function go(view) {
    views.forEach(v => (v.hidden = v.id !== "view-" + view));
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.view === view));
    window.scrollTo(0, 0);
    if (view === "inicio") renderInicio();
    if (view === "flashcards") renderFCSetup();
    if (view === "practica") renderEscSetup();
    if (view === "escucha") renderEscuchSetup();
    if (view === "frases") renderFrases();
    if (view === "progreso") renderProgreso();
  }
  window.go = go;
  window.addEventListener("hashchange", () => {
    const h = location.hash.replace("#", "");
    if ([..."inicio,flashcards,practica,escucha,frases,progreso".split(",")].indexOf(h) > -1) go(h);
  });

  document.querySelectorAll("[data-go]").forEach(b =>
    b.addEventListener("click", () => go(b.dataset.go)));
  document.querySelectorAll("[data-back]").forEach(b =>
    b.addEventListener("click", () => go(b.dataset.back)));
  navBtns.forEach(b => b.addEventListener("click", () => go(b.dataset.view)));

  // ============================================================
  //  INICIO
  // ============================================================
  function renderInicio() {
    const hora = new Date().getHours();
    let saludo = "¡Buenas noches!";
    if (hora >= 5 && hora < 12) saludo = "¡Buenos días!";
    else if (hora >= 12 && hora < 20) saludo = "¡Buenas tardes!";
    document.getElementById("greeting").textContent =
      saludo + " Hoy es tu día para aprender algo nuevo. 🚀";

    const li = levelIdx();
    document.getElementById("lvl-name").textContent = NIVEL_NOMBRE[li];
    document.getElementById("lvl-desc").textContent = NIVEL_DESC[li];
    const hasTest = STATE.levelIdx !== undefined;
    document.getElementById("btn-retoque-level").textContent =
      hasTest ? "Rehacer test de nivel" : "Hacer test de nivel";

    document.getElementById("streak-num").textContent = getStreak();
    document.getElementById("today-count").textContent = wordsToday();
    const meta = parseInt(STATE.goal, 10) || 15;
    document.getElementById("goal-num").textContent = meta;
    document.getElementById("goal-fill").style.width =
      Math.min(100, (wordsToday() / meta) * 100) + "%";

    const pend = countPendientes();
    document.getElementById("badge-pendientes").textContent =
      pend > 0 ? pend + " pendientes" : "0 pendientes";

    const molde = document.getElementById("motiv-hoy");
    if (molde && !molde.textContent) molde.textContent = getMotiv();
    renderRemUI();
  }

  function countPendientes() {
    return VOCAB.filter(v => unlocked(v) && !SRS[v.id]).length;
  }

  document.getElementById("btn-retoque-level").addEventListener("click", openTest);

  // ============================================================
  //  TEST DE NIVEL ADAPTATIVO
  // ============================================================
  let t = null; // estado del test

  function openTest() {
    t = {
      levelIdx: 0,
      consec: 0,
      consecErr: 0,
      asked: 0,
      correct: 0,
      seen: [],
      blocked: false,
    };
    askNext();
  }

  function modalHTML() { return document.getElementById("modal-test"); }

  function crearModalBack() {
    const div = document.createElement("div");
    div.className = "modal-back";
    div.id = "modal-test";
    document.body.appendChild(div);
    return div;
  }

  function askNext() {
    const pool = TEST_LEVELS[t.levelIdx].preguntas;
    const q = pool.find(qq => t.seen.indexOf(qq) === -1);
    if (!q) {
      const back = modalHTML();
      if (back) return terminarTest(back);
      return finishTestModal();
    }
    t.seen.push(q);
    t.asked++;
    const max = 10;

    const back = modalHTML() || crearModalBack();
    back.innerHTML = `
      <div class="modal">
        <h2>🧠 Test de nivel</h2>
        <p class="muted">Pregunta ${t.asked} de ${max}</p>
        <div class="goal-bar" style="margin:6px 0 16px"><div id="test-fill" style="height:8px;width:${(t.asked / max) * 100}%"></div></div>
        <div style="text-align:left"><strong>${q.p}</strong></div>
        <div id="test-options" style="margin-top:14px">
          ${q.opciones.map((op, i) =>
            `<button class="btn btn-secondary modal-opt" data-i="${i}" data-ok="${norm(op) === norm(q.a)}" style="margin-top:8px">${op}</button>`).join("")}
        </div>
        <div id="test-feedback"></div>
      </div>`;

    back.querySelectorAll("#test-options .btn").forEach(btn => {
      btn.addEventListener("click", () => answerTest(q, btn, back), { once: true });
    });
  }

  function answerTest(q, btn, back) {
    if (t.blocked) return;
    t.blocked = true;
    const ok = btn.dataset.ok === "true";
    back.querySelectorAll("#test-options .btn").forEach(b => {
      b.disabled = true;
      if (b.dataset.ok === "true") b.classList.add("correcto");
      if (b === btn && !ok) b.classList.add("incorrecto");
    });

    if (ok) {
      t.correct++;
      t.consec++;
      t.consecErr = 0;
      if (t.consec >= 3 && t.levelIdx < 2) {
        t.levelIdx++;
        t.consec = 0;
      }
    } else {
      t.consec = 0;
      t.consecErr++;
      if (t.consecErr >= 2 && t.levelIdx > 0) {
        t.levelIdx--;
        t.consecErr = 0;
      }
    }

    const msg = ok ? "✅ ¡Correcto!" : "❌ La respuesta era: " + q.a;
    document.getElementById("test-feedback").innerHTML =
      `<div class="${ok ? "fb-bien" : "fb-mal"}" style="margin-top:14px">${msg}</div>`;

    const sig = document.createElement("button");
    sig.className = "btn btn-primary btn-block";
    sig.textContent = t.asked >= 10 ? "Ver mi resultado" : "Siguiente ➜";
    sig.addEventListener("click", () => {
      if (t.asked >= 10) return terminarTest(back);
      t.blocked = false;
      askNext();
    });
    document.getElementById("test-feedback").appendChild(sig);
  }

  function finishTestModal() {
    const back = modalHTML();
    if (back) return terminarTest(back);
  }

  function terminarTest(back) {
    STATE.levelIdx = t.levelIdx;
    saveState();
    const pct = Math.round((t.correct / t.asked) * 100);
    back.querySelector(".modal").innerHTML = `
      <h2>🎉 Tu nivel actual</h2>
      <div class="level-current" style="font-size:26px">${NIVEL_NOMBRE[t.levelIdx]}</div>
      <p>Acertaste ${t.correct} de ${t.asked} (${pct}%).</p>
      <p>${NIVEL_DESC[t.levelIdx]}</p>
      <button class="btn btn-primary modal-opt" id="test-cerrar">¡Empezar a practicar!</button>`;
    back.querySelector("#test-cerrar").addEventListener("click", () => {
      back.remove();
      go("inicio");
    });
  }

  // ============================================================
  //  FLASHCARDS
  // ============================================================
  let fc = { queue: [], cur: 0, phase: "front" };

  function renderFCSetup() {
    buildCatChips();
    const due = VOCAB.filter(v => SRS[v.id] && SRS[v.id].box >= 1 && dueToday(SRS[v.id].due));
    document.getElementById("review-info").innerHTML =
      `<div class="muted">${due.length} revisión(es) pendiente(s) hoy.</div>`;
    document.getElementById("btn-iniciar-fc").onclick = startFCSession;
    document.getElementById("fc-setup").hidden = false;
    document.getElementById("fc-session").hidden = true;
  }

  function buildCatChips() {
    const c = document.getElementById("fc-cat-new");
    c.innerHTML = "";
    [["ambos", "Ambos"], ["cotidiano", "Cotidiano"], ["trabajo", "Trabajo"]].forEach(([k, n]) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (k === "ambos" ? " active" : "");
      chip.textContent = n;
      chip.dataset.cat = k;
      chip.onclick = () => {
        c.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
        chip.classList.add("active");
      };
      c.appendChild(chip);
    });
  }

  function selectedCat() {
    const c = document.querySelector("#fc-cat-new .chip.active");
    return c ? c.dataset.cat : "ambos";
  }

  function startFCSession() {
    const cat = selectedCat();
    const pool = VOCAB.filter(v => unlocked(v) && (cat === "ambos" || v.cat === cat));
    const news = shuffle(pool.filter(v => !SRS[v.id]));
    const dues = shuffle(pool.filter(v => SRS[v.id] && SRS[v.id].box >= 1 && dueToday(SRS[v.id].due)));
    fc.queue = news.slice(0, 12).concat(dues.slice(0, 15));
    fc.cur = 0;
    fc.phase = "front";
    if (fc.queue.length === 0) {
      alert("No hay palabras nuevas por ahora. ¡Vienes al día! 🎉");
      return;
    }
    document.getElementById("fc-setup").hidden = true;
    document.getElementById("fc-session").hidden = false;
    showFCCard();
  }

  function showFCCard() {
    if (fc.cur >= fc.queue.length) return finishFCSession();
    const v = fc.queue[fc.cur];
    fc.phase = "front";
    document.getElementById("fc-count").textContent = (fc.cur + 1) + " / " + fc.queue.length;
    document.getElementById("fc-fill").style.width = ((fc.cur + 1) / fc.queue.length) * 100 + "%";
    document.getElementById("flashcard").classList.remove("flipped");
    document.getElementById("fc-side").innerHTML =
      `<div class="fc-word" id="fc-word">${v.en}</div>
       <button class="audio-btn" onclick="speakText(event, '${escJS(v.en)}')">🔊 Escuchar</button>`;
    document.getElementById("fc-answer").hidden = true;
    document.getElementById("fc-actions").hidden = true;
    document.getElementById("btn-fin-fc").style.display = "block";
    setTimeout(() => speakEN(v.en), 250);
  }

  window.flipCard = function (e) {
    if (fc.phase !== "front") return;
    const el = document.getElementById("flashcard");
    if (el.classList.contains("flipped")) return;
    fc.phase = "answer";
    el.classList.add("flipped");
    const v = fc.queue[fc.cur];
    document.getElementById("fc-side").innerHTML = `<div class="fc-word" style="font-size:22px">${v.en}</div>`;
    document.getElementById("fc-trans").textContent = v.es;
    document.getElementById("fc-example").textContent = v.ej + " → " + v.ex;
    document.getElementById("fc-answer").hidden = false;
    document.getElementById("fc-actions").hidden = false;
  };

  window.getFcText = function () {
    const v = fc.queue[fc.cur];
    return v ? v.en : "";
  };

  window.gradeCard = function (g) {
    const v = fc.queue[fc.cur];
    if (v) gradeWord(v.id, g);
    fc.cur++;
    showFCCard();
  };

  document.getElementById("btn-fin-fc").addEventListener("click", finishFCSession);

  function finishFCSession() {
    document.getElementById("fc-session").hidden = true;
    document.getElementById("fc-setup").hidden = false;
    toast(getPraise(getStreak()));
    go("inicio");
  }

  // ============================================================
  //  ESCRITURA Y TRADUCCIÓN
  // ============================================================
  let esc = { queue: [], cur: 0, dir: "both" };

  function renderEscSetup() {
    buildEscChips();
    document.getElementById("esc-session").hidden = true;
  }

  function buildEscChips() {
    const c = document.getElementById("cat-chips");
    c.innerHTML = "";
    [["ambos", "Ambos"], ["cotidiano", "Cotidiano"], ["trabajo", "Trabajo"]].forEach(([k, n]) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (k === "ambos" ? " active" : "");
      chip.textContent = n;
      chip.dataset.cat = k;
      chip.onclick = () => {
        c.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
        chip.classList.add("active");
      };
      c.appendChild(chip);
    });
  }

  document.querySelectorAll("#dir-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#dir-chips .chip").forEach(x => x.classList.remove("active"));
      chip.classList.add("active");
      esc.dir = chip.dataset.dir;
    });
  });

  function startEscSession() {
    const chip = document.querySelector("#cat-chips .chip.active");
    const cat = chip ? chip.dataset.cat : "ambos";
    const pool = VOCAB.filter(v => unlocked(v) && (cat === "ambos" || v.cat === cat));
    esc.queue = shuffle(pool).slice(0, 12);
    esc.cur = 0;
    if (esc.queue.length === 0) return;
    document.getElementById("esc-session").hidden = false;
    showEscCard();
  }

  document.getElementById("btn-iniciar-esc").addEventListener("click", startEscSession);
  document.getElementById("btn-check-esc").addEventListener("click", checkEsc);
  document.getElementById("btn-skip-esc").addEventListener("click", skipEsc);
  document.getElementById("btn-fin-esc").addEventListener("click", finishEscSession);

  function escDir() {
    if (esc.dir === "both") {
      return Math.random() < 0.5 ? "en-es" : "es-en";
    }
    return esc.dir;
  }

  function showEscCard() {
    if (esc.cur >= esc.queue.length) return finishEscSession();
    const v = esc.queue[esc.cur];
    const dir = escDir();
    document.getElementById("esc-dir").textContent =
      dir === "en-es" ? "Inglés → Español" : "Español → Inglés";
    document.getElementById("esc-word").textContent = dir === "en-es" ? v.en : v.es;
    document.getElementById("esc-audio").style.display = dir === "en-es" ? "inline-block" : "none";
    document.getElementById("esc-input").value = "";
    document.getElementById("esc-input").focus();
    document.getElementById("esc-feedback").innerHTML = "";
  }

  document.getElementById("esc-audio").addEventListener("click", () => {
    const v = esc.queue[esc.cur];
    if (v) speakEN(v.en);
  });

  function checkEsc() {
    const v = esc.queue[esc.cur];
    if (!v) return;
    const user = document.getElementById("esc-input").value;
    const dir = document.getElementById("esc-dir").textContent;
    const answer = dir.startsWith("Inglés") ? v.es : v.en;
    const ok = checkAnswer(user, answer);

    const fb = document.getElementById("esc-feedback");
    if (ok) {
      gradeWord(v.id, 2);
      fb.innerHTML = `<div class="fb-bien"><strong>✓ ¡Correcto!</strong><br>${v.en} = ${v.es}</div><div class="muted" style="margin-top:6px">${v.ej}</div>`;
    } else {
      gradeWord(v.id, 0);
      fb.innerHTML = `<div class="fb-mal"><strong>✗ Te faltó.</strong><br>Respuesta: ${answer}<br>${v.es}</div><div class="muted" style="margin-top:6px">${v.ej} → ${v.ex}</div>`;
      speakEN(v.en);
    }
    document.getElementById("btn-check-esc").textContent = "Siguiente ➜";
    document.getElementById("btn-check-esc").onclick = () => {
      esc.cur++;
      document.getElementById("btn-check-esc").textContent = "Comprobar ✓";
      document.getElementById("btn-check-esc").onclick = checkEsc;
      showEscCard();
    };
  }

  function skipEsc() {
    const v = esc.queue[esc.cur];
    if (v) {
      gradeWord(v.id, 0);
      document.getElementById("esc-feedback").innerHTML =
        `<div class="fb-mal">Respuesta: <strong>${document.getElementById("esc-dir").textContent.startsWith("Inglés") ? v.es : v.en}</strong></div><div class="muted" style="margin-top:6px">${v.ej} → ${v.ex}</div>`;
    }
    document.getElementById("esc-input").disabled = true;
    document.getElementById("btn-check-esc").textContent = "Siguiente ➜";
    document.getElementById("btn-check-esc").onclick = () => {
      document.getElementById("esc-input").disabled = false;
      esc.cur++;
      document.getElementById("btn-check-esc").textContent = "Comprobar ✓";
      document.getElementById("btn-check-esc").onclick = checkEsc;
      showEscCard();
    };
  }

  function finishEscSession() {
    document.getElementById("esc-session").hidden = true;
    toast(getPraise(getStreak()));
    go("inicio");
  }

  // ============================================================
  //  ESCUCHA Y PRONUNCIACIÓN
  // ============================================================
  let escuch = { mode: "comprender", queue: [], cur: 0, answered: false };

  function renderEscuchSetup() {
    document.getElementById("escuch-session").hidden = true;
    document.getElementById("escuch-options").innerHTML = "";
    document.getElementById("escuch-dictado").hidden = true;
    document.getElementById("escuch-repetir").hidden = true;
  }

  document.querySelectorAll("#escuch-mode-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#escuch-mode-chips .chip").forEach(x => x.classList.remove("active"));
      chip.classList.add("active");
      escuch.mode = chip.dataset.mode;
      startEscuchSession();
    });
  });

  function startEscuchSession() {
    escuch.cur = 0;
    if (escuch.mode === "comprender") {
      escuch.queue = shuffle(VOCAB.filter(v => unlocked(v))).slice(0, 10);
    } else {
      const all = Object.keys(PHRASES).reduce((acc, k) => acc.concat(PHRASES[k].frases.map(f => ({ en: f.en, es: f.es }))), []);
      escuch.queue = shuffle(all).slice(0, 10);
    }
    document.getElementById("escuch-session").hidden = false;
    document.getElementById("btn-fin-escuch").style.display = "block";
    showEscuchCard();
  }

  function showEscuchCard() {
    if (escuch.cur >= escuch.queue.length) return finishEscuchSession();
    if (escuch.mode === "comprender") startComprenderCard();
    else if (escuch.mode === "dictado") startDictadoCard();
    else startRepetirCard();
  }

  function startComprenderCard() {
    const item = escuch.queue[escuch.cur];
    escuch.answered = false;
    document.getElementById("escuch-title").textContent = "Escucha y elige la traducción";
    document.getElementById("escuch-options").style.display = "block";
    document.getElementById("escuch-dictado").hidden = true;
    document.getElementById("escuch-repetir").hidden = true;
    document.getElementById("escuch-feedback").innerHTML = "";

    const dist = shuffle(VOCAB.filter(v => v.id !== item.id && v.cat === item.cat)).slice(0, 3);
    const opts = shuffle(dist.map(d => d.es).concat([item.es]));
    document.getElementById("escuch-options").innerHTML = opts.map((op, i) =>
      `<button class="btn btn-secondary" data-es="${escJS(op)}" style="margin-top:8px;width:100%;text-align:left">${op}</button>`).join("");

    document.getElementById("escuch-options").querySelectorAll(".btn").forEach(b => {
      b.addEventListener("click", (ev) => {
        if (escuch.answered) return;
        escuch.answered = true;
        const right = b.dataset.es === escJS(item.es);
        document.getElementById("escuch-options").querySelectorAll(".btn").forEach(x => {
          x.disabled = true;
          if (x.dataset.es === escJS(item.es)) x.classList.add("correcto");
          if (x === b && !right) x.classList.add("incorrecto");
        });
        const fb = document.getElementById("escuch-feedback");
        fb.innerHTML = right
          ? `<div class="fb-bien">✅ ¡Correcto!<br><strong>${item.en}</strong> = ${item.es}</div>`
          : `<div class="fb-mal">❌ Era: <strong>${item.en}</strong> = ${item.es}</div>`;
        setTimeout(() => speakEN(item.en), 200);
      });
    });
    setTimeout(() => speakEN(item.en), 300);
  }

  function startDictadoCard() {
    const item = escuch.queue[escuch.cur];
    escuch.answered = false;
    document.getElementById("escuch-title").textContent = "Escribe lo que escuchaste (dictado)";
    document.getElementById("escuch-options").style.display = "none";
    document.getElementById("escuch-dictado").hidden = false;
    document.getElementById("escuch-repetir").hidden = true;
    document.getElementById("escuch-input").value = "";
    document.getElementById("escuch-feedback").innerHTML = "";
    document.getElementById("btn-reveal-escuch").style.display = "none";
    document.getElementById("btn-next-escuch").style.display = "none";
    document.getElementById("btn-check-escuch").style.display = "block";
    setTimeout(() => speakEN(item.en), 300);
  }

  document.getElementById("btn-check-escuch").addEventListener("click", () => {
    const item = escuch.queue[escuch.cur];
    if (!item || escuch.answered) return;
    escuch.answered = true;
    const user = document.getElementById("escuch-input").value;
    const ok = checkAnswer(user, item.en);
    const fb = document.getElementById("escuch-feedback");
    document.getElementById("btn-next-escuch").style.display = "block";
    fb.innerHTML = ok
      ? `<div class="fb-bien">✅ ¡Perfecto dictado!<br><strong>${item.en}</strong></div>`
      : `<div class="fb-mal">❌ La frase era:<br><strong>${item.en}</strong><br><span class="muted">${item.es}</span></div>`;
    setTimeout(() => speakEN(item.en), 200);
  });

  function startRepetirCard() {
    const item = escuch.queue[escuch.cur];
    escuch.answered = false;
    document.getElementById("escuch-title").textContent = "Escucha, repite en voz alta y verifica";
    document.getElementById("escuch-options").style.display = "none";
    document.getElementById("escuch-dictado").hidden = true;
    document.getElementById("escuch-repetir").hidden = false;
    document.getElementById("escuch-feedback").innerHTML = "";
    document.getElementById("btn-reveal-escuch").style.display = "block";
    document.getElementById("btn-next-escuch").style.display = "none";
    setTimeout(() => speakEN(item.en), 300);
  }

  document.getElementById("btn-reveal-escuch").addEventListener("click", () => {
    const item = escuch.queue[escuch.cur];
    document.getElementById("escuch-feedback").innerHTML =
      `<div class="fb-bien"><strong>${item.en}</strong></div><div class="muted" style="margin-top:6px">${item.es}</div>`;
    document.getElementById("btn-next-escuch").style.display = "block";
  });

  document.getElementById("btn-next-escuch").addEventListener("click", () => {
    escuch.cur++;
    showEscuchCard();
  });
  document.getElementById("btn-fin-escuch").addEventListener("click", finishEscuchSession);

  window.playCurrent = function (e) {
    const item = escuch.queue[escuch.cur];
    if (item) speakEN(item.en);
  };

  function finishEscuchSession() {
    document.getElementById("escuch-session").hidden = true;
    toast(getPraise(getStreak()));
    go("inicio");
  }

  // ============================================================
  //  FRASES DE CONVERSACIÓN
  // ============================================================
  let frActual = "saludos";

  function renderFrases() {
    const c = document.getElementById("fr-sitios");
    c.className = "chips fr-sitio-til";
    c.innerHTML = "";
    Object.keys(PHRASES).forEach(k => {
      const chip = document.createElement("button");
      chip.className = "chip" + (k === frActual ? " active" : "");
      chip.textContent = PHRASES[k].icono + " " + PHRASES[k].titulo;
      chip.onclick = () => {
        frActual = k;
        renderFrases();
      };
      c.appendChild(chip);
    });
    renderFrList();
  }

  function renderFrList() {
    const sect = PHRASES[frActual];
    const list = document.getElementById("fr-lista");
    list.innerHTML = `
      <button class="btn btn-primary btn-block" id="btn-fr-quiz" style="margin-bottom:12px">
        🎲 Practicar estas frases (${sect.frases.length} frases)
      </button>`;
    document.getElementById("btn-fr-quiz").addEventListener("click", () => frQuiz(sect));

    sect.frases.forEach((f, i) => {
      const d = document.createElement("div");
      d.className = "fr-item";
      d.innerHTML = `
        <div class="fr-en">
          <span>${f.en}</span>
          <button class="audio-btn" onclick="speakText(event, '${escJS(f.en)}')">🔊</button>
        </div>
        <div class="fr-es">${f.es}</div>`;
      list.appendChild(d);
    });
  }

  function frQuiz(sect) {
    const frases = sect.frases;
    const idxs = shuffle(frases.map((_, i) => i));
    const n = Math.min(6, idxs.length);
    let cur = 0, correct = 0;

    const back = document.createElement("div");
    back.className = "modal-back";
    document.body.appendChild(back);
    const box = document.createElement("div");
    box.className = "modal";
    back.appendChild(box);

    function showQ() {
      if (cur >= n) return finish();
      const f = frases[idxs[cur]];
      const dist = frases.filter(x => x.en !== f.en);
      const opts = shuffle(dist.slice(0, 3).map(x => x.en).concat([f.en]));
      box.innerHTML = `
        <h2>💬 ${sect.titulo}</h2>
        <p class="muted">Pregunta ${cur + 1} de ${n}</p>
        <div style="text-align:left;margin:10px 0"><strong>¿Cómo se dice…?</strong><br><em>${f.es}</em></div>
        <div>${opts.map(op => `<button class="btn btn-secondary modal-opt" data-ok="${escJS(op) === escJS(f.en)}" style="margin-top:8px">${op}</button>`).join("")}</div>
        <div id="fr-fb"></div>`;
      [...box.querySelectorAll("button[data-ok]")].forEach(b =>
        b.addEventListener("click", () => {
          [...box.querySelectorAll("button[data-ok]")].forEach(x => {
            x.disabled = true;
            if (x.dataset.ok === "true") x.classList.add("correcto");
            if (x === b && x.dataset.ok !== "true") x.classList.add("incorrecto");
          });
          if (b.dataset.ok === "true") correct++;
          PHRASE[frActual] = (PHRASE[frActual] || 0) + 1;
          savePhrase();
          document.getElementById("fr-fb").innerHTML =
            `<button class="btn btn-primary btn-block" style="margin-top:12px">${cur + 1 >= n ? "Ver resultado" : "Siguiente ➜"}</button>`;
          document.getElementById("fr-fb").querySelector("button").onclick = () => { cur++; showQ(); };
          if (b.dataset.ok === "true") speakEN(f.en);
        }, { once: true }));
    }

    function finish() {
      box.innerHTML = `
        <h2>📊 Resultado</h2>
        <div class="level-current">${correct} de ${n} correctas</div>
        <p>${correct === n ? "¡Dominas estas frases! 🔥" : correct >= n / 2 ? "¡Vas muy bien! Repite las que fallaste." : "Sigue practicando, ¡ya casi!"}</p>
        <button class="btn btn-primary modal-opt" id="fr-fin">Cerrar</button>`;
      box.querySelector("#fr-fin").addEventListener("click", () => back.remove());
    }

    showQ();
  }

  // ============================================================
  //  PROGRESO
  // ============================================================
  function renderProgreso() {
    const ids = Object.keys(SRS);
    const seen = ids.length;
    let ok = 0, tot = 0;
    ids.forEach(id => { const w = SRS[id]; ok += w.ok || 0; tot += w.n || 0; });
    document.getElementById("st-words").textContent = seen;
    document.getElementById("st-acierto").textContent = tot ? Math.round((ok / tot) * 100) + "%" : "—";
    document.getElementById("st-dias").textContent = Object.keys(DAYS).length;

    document.getElementById("level-current").innerHTML =
      `${NIVEL_NOMBRE[levelIdx()]} <small>(${NIVEL_DESC[levelIdx()]})</small>`;

    const mico = document.getElementById("motiv-progreso");
    if (mico) {
      const acc = tot ? Math.round((ok / tot) * 100) : 0;
      let mp = "Practica un poco hoy y mañana estarás más seguro. 🌱";
      if (acc >= 90 && seen >= 20) mp = "Tu precisión de " + acc + "% es de campeón. ¡Sigue así! 🏆";
      else if (seen >= 30) mp = "Ya llevas " + seen + " palabras en tu historia. El progreso se nota. 📈";
      else if (Object.keys(DAYS).length === 0) mp = "Tu primera sesión te espera. Hoy es el mejor día para empezar. 🚀";
      mico.textContent = mp;
    }

    // Gráfico de 7 días
    const chart = document.getElementById("week-chart");
    chart.innerHTML = "";
    const max = Math.max(1, ...Object.keys(DAYS).map(k => DAYS[k].n));
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = fmtDate(d);
      const val = DAYS[key] ? DAYS[key].n : 0;
      const name = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][d.getDay()];
      const div = document.createElement("div");
      div.className = "wc-day";
      div.innerHTML = `<div class="wc-bar" style="height:${Math.max(4, (val / max) * 60)}px"></div><div class="wc-lbl">${name}</div>`;
      chart.appendChild(div);
    }

    // Cajas SRS
    const boxes = [0, 0, 0, 0, 0, 0];
    ids.forEach(id => { boxes[SRS[id].box]++; });
    const names = ["Nueva", "Vista", "Aprendida", "Fija", "Segura", "¡Dominada!"];
    document.getElementById("box-track").innerHTML = boxes.map((b, i) =>
      `<div class="box ${i === 5 ? "master" : ""}"><div class="box-num">${b}</div><div class="box-name">${names[i]}</div></div>`).join("");

    // Palabras difíciles
    const weak = VOCAB.filter(v => SRS[v.id] && SRS[v.id].box <= 2 && SRS[v.id].last)
      .sort((a, b) => (SRS[a.id].ok || 0) - (SRS[b.id].ok || 0))
      .slice(0, 8);
    const wc = document.getElementById("weak-words");
    if (weak.length === 0) {
      wc.innerHTML = `<div class="muted">Aún no tienes palabras difíciles. ¡Sigue así! 💪</div>`;
    } else {
      wc.innerHTML = weak.map(v =>
        `<div class="weak-item"><div><div class="w-en">${v.en}</div><div class="w-es">${v.es}</div></div><button class="audio-btn" onclick="speakText(event,'${escJS(v.en)}')">🔊</button></div>`).join("");
    }
  }

  document.getElementById("btn-redo-test").addEventListener("click", openTest);
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("¿Seguro que quieres borrar todo tu progreso?")) {
      SRS = {}; DAYS = {}; PHRASE = {};
      localStorage.removeItem(LS.words);
      localStorage.removeItem(LS.days);
      localStorage.removeItem(LS.phrase);
      STATE = {}; saveState();
      go("inicio");
    }
  });

  // ============================================================
  //  AYUDAS
  // ============================================================
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function escJS(s) { return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, " "); }
  window.escJS = escJS;

  // Registrar service worker (para instalar como app y trabajar sin internet)
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  // ---------------- Arranque ----------------
  if ("speechSynthesis" in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = function () { getVoice(); };
  }
  enableReminder();
  scheduleReminderCheck();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkReminder();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const h = location.hash.replace("#", "");
    go(h && "inicio,flashcards,practica,escucha,frases,progreso".split(",").indexOf(h) > -1 ? h : "inicio");
  });

  // Exponer inicio de sesión de escritura
})();