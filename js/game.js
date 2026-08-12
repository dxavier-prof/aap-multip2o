/* =============================================================
   PESCA DE NÚMEROS
   Juego educativo de tablas de multiplicar (1-10 + regla del 0)
   JavaScript vanilla — sin dependencias externas
   ============================================================= */

'use strict';

/* -------------------------------------------------------------
   1. CONFIGURACIÓN DE NIVELES
   ------------------------------------------------------------- */
const LEVELS = [
  {
    id: 0,
    name: 'Fácil',
    emoji: '🐟',
    subtitle: 'Tablas 1, 2, 5, 10',
    tables: [0, 1, 2, 5, 10],
    problemCount: 20,
    timeLimit: null,      // sin límite de tiempo
    shuffleOrder: false,
    twoDigitChance: 0,
    color: '#4ECDC4'
  },
  {
    id: 1,
    name: 'Medio',
    emoji: '🐠',
    subtitle: 'Tablas del 1 al 6',
    tables: [0, 1, 2, 3, 4, 5, 6],
    problemCount: 20,
    timeLimit: null,
    shuffleOrder: false,
    twoDigitChance: 0,
    color: '#4FB3D9'
  },
  {
    id: 2,
    name: 'Avanzado',
    emoji: '🦈',
    subtitle: 'Tablas del 1 al 10',
    tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    problemCount: 20,
    timeLimit: null,
    shuffleOrder: true,
    twoDigitChance: 0,
    color: '#FF9A4D'
  },
  {
    id: 3,
    name: 'Maestro',
    emoji: '🐋',
    subtitle: 'Tablas 1-10 + reto extra',
    tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    problemCount: 20,
    timeLimit: 150, // segundos para todo el nivel
    shuffleOrder: true,
    twoDigitChance: 0.18, // probabilidad de usar 11 o 12 como factor
    color: '#F14C4C'
  }
];

const ZERO_RULE_CHANCE = 0.14; // probabilidad de forzar un problema "x0"
const TOTAL_LIVES = 3;
const FISH_EMOJIS = ['🐟', '🐠', '🐡', '🦐', '🦑', '🐙'];
const WHEEL_COLORS = ['#7ECBE8', '#4ECDC4', '#FFD93D', '#FFB570', '#FF6B6B', '#B39DDB', '#6FE0C0', '#F7A6C4'];

/* -------------------------------------------------------------
   2. ESTADO DEL JUEGO
   ------------------------------------------------------------- */
const state = {
  levelIndex: 0,
  problemIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  lives: TOTAL_LIVES,
  currentProblem: null,
  startTime: null,
  elapsedSeconds: 0,
  timerInterval: null,
  timeRemaining: null,
  wheelRotation: 0,
  answering: false // evita doble click mientras se procesa una respuesta
};

/* -------------------------------------------------------------
   3. PERSISTENCIA (localStorage)
   ------------------------------------------------------------- */
const STORAGE_KEY = 'pescaDeNumeros_progreso';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlocked: [0], stars: {} };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.unlocked)) parsed.unlocked = [0];
    if (typeof parsed.stars !== 'object' || parsed.stars === null) parsed.stars = {};
    return parsed;
  } catch (e) {
    return { unlocked: [0], stars: {} };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    // Si localStorage no está disponible (modo privado, etc.) el juego sigue funcionando
    console.warn('No se pudo guardar el progreso:', e);
  }
}

function unlockLevel(levelIndex, starsEarned) {
  const progress = loadProgress();
  if (!progress.unlocked.includes(levelIndex)) progress.unlocked.push(levelIndex);
  const nextLevel = levelIndex + 1;
  if (nextLevel < LEVELS.length && !progress.unlocked.includes(nextLevel)) {
    progress.unlocked.push(nextLevel);
  }
  const prevStars = progress.stars[levelIndex] || 0;
  progress.stars[levelIndex] = Math.max(prevStars, starsEarned);
  saveProgress(progress);
  return progress;
}

/* -------------------------------------------------------------
   4. SONIDOS (Web Audio API — sin archivos externos)
   ------------------------------------------------------------- */
const AudioFX = (() => {
  let ctx = null;
  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    return ctx;
  }

  function tone(freq, duration, type = 'sine', delay = 0, gainValue = 0.15) {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = gainValue;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const startAt = audioCtx.currentTime + delay;
    osc.start(startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    osc.stop(startAt + duration + 0.02);
  }

  return {
    correct() { tone(660, 0.12, 'triangle', 0); tone(880, 0.16, 'triangle', 0.1); },
    wrong() { tone(180, 0.25, 'sawtooth', 0, 0.12); },
    spin() { tone(440, 0.08, 'square', 0, 0.05); },
    win() {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', i * 0.12));
    },
    click() { tone(520, 0.06, 'square', 0, 0.06); }
  };
})();

/* -------------------------------------------------------------
   5. UTILIDADES
   ------------------------------------------------------------- */
function $(selector) { return document.querySelector(selector); }
function $all(selector) { return Array.from(document.querySelectorAll(selector)); }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickRandom(arr) { return arr[randInt(0, arr.length - 1)]; }

function showScreen(id) {
  $all('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
}

/* -------------------------------------------------------------
   6. GENERACIÓN DE PROBLEMAS
   ------------------------------------------------------------- */
function generateProblem(level, forcedA) {
  let a = forcedA;
  let b = randInt(0, 10);

  // Regla especial del 0: a veces forzamos explícitamente un factor 0
  // (si "a" ya es 0, la regla se cubre de forma natural)
  if (a !== 0 && Math.random() < ZERO_RULE_CHANCE) {
    b = 0;
  }

  // Nivel Maestro: a veces usa un factor de dos dígitos simple (11 o 12)
  if (level.twoDigitChance && Math.random() < level.twoDigitChance) {
    a = pickRandom([11, 12]);
    b = randInt(1, 9);
  }

  let displayA = a;
  let displayB = b;

  // "Problemas en desorden": a veces invertimos el orden visual (a×b vs b×a)
  if (level.shuffleOrder && Math.random() < 0.5) {
    displayA = b;
    displayB = a;
  }

  const answer = a * b;

  return {
    a, b, answer,
    text: `${displayA} × ${displayB} = ?`,
    isZeroRule: (a === 0 || b === 0)
  };
}

function generateChoices(problem) {
  const correct = problem.answer;
  const choices = new Set([correct]);

  const candidateGenerators = [
    () => correct + pickRandom([1, 2, 3, -1, -2, -3]),
    () => problem.a * (problem.b + pickRandom([1, -1, 2, -2])),
    () => (problem.a + pickRandom([1, -1])) * problem.b,
    () => problem.a + problem.b,           // error común: suma en vez de producto
    () => correct + pickRandom([10, -10]),
    () => correct === 0 ? pickRandom([1, 2, 3]) : 0 // evita repetir "0" si ya es la respuesta
  ];

  let safety = 0;
  while (choices.size < 4 && safety < 50) {
    safety++;
    const gen = pickRandom(candidateGenerators);
    const value = gen();
    if (Number.isFinite(value) && value >= 0 && value <= 144) {
      choices.add(value);
    }
  }

  // Relleno de seguridad por si aún faltan opciones
  while (choices.size < 4) {
    choices.add(randInt(0, Math.max(20, correct + 10)));
  }

  return shuffleArray(Array.from(choices));
}

function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* -------------------------------------------------------------
   7. RULETA (SVG dinámico)
   ------------------------------------------------------------- */
function buildWheel(level) {
  const svg = $('#wheel');
  svg.innerHTML = '';
  const tables = level.tables;
  const n = tables.length;
  const cx = 150, cy = 150, r = 148;
  const anglePer = 360 / n;

  tables.forEach((tableValue, i) => {
    const startAngle = i * anglePer;
    const endAngle = startAngle + anglePer;
    const path = describeSlice(cx, cy, r, startAngle, endAngle);
    const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    slice.setAttribute('d', path);
    slice.setAttribute('fill', WHEEL_COLORS[i % WHEEL_COLORS.length]);
    slice.setAttribute('stroke', '#FFFDF6');
    slice.setAttribute('stroke-width', '2');
    svg.appendChild(slice);

    // Etiqueta de texto centrada en la porción
    const midAngle = startAngle + anglePer / 2;
    const labelR = r * 0.68;
    const pos = polarToCartesian(cx, cy, labelR, midAngle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x);
    text.setAttribute('y', pos.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-family', 'Baloo 2, sans-serif');
    text.setAttribute('font-weight', '700');
    text.setAttribute('font-size', n > 10 ? '15' : '20');
    text.setAttribute('fill', '#274156');
    text.textContent = `×${tableValue}`;
    svg.appendChild(text);
  });

  state.wheelTables = tables;
  state.wheelAnglePer = anglePer;
  state.wheelRotation = 0;
  svg.style.transform = 'rotate(0deg)';
}

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angleRad), y: cy + radius * Math.sin(angleRad) };
}

function describeSlice(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    'Z'
  ].join(' ');
}

function spinWheel() {
  if (state.spinning) return;
  state.spinning = true;
  $('#btn-spin').disabled = true;
  AudioFX.spin();

  const tables = state.wheelTables;
  const anglePer = state.wheelAnglePer;
  const targetIndex = randInt(0, tables.length - 1);

  // El puntero apunta hacia arriba (0°). Calculamos cuánto rotar para que
  // el centro de la porción elegida quede bajo el puntero.
  const targetSliceCenter = targetIndex * anglePer + anglePer / 2;
  const extraSpins = 360 * randInt(4, 6);
  const finalRotation = state.wheelRotation + extraSpins + (360 - targetSliceCenter) - (state.wheelRotation % 360);

  const svg = $('#wheel');
  svg.style.transform = `rotate(${finalRotation}deg)`;
  state.wheelRotation = finalRotation;

  setTimeout(() => {
    state.spinning = false;
    const chosenTable = tables[targetIndex];
    startProblem(chosenTable);
  }, 3300);
}

/* -------------------------------------------------------------
   8. FLUJO DE PREGUNTAS
   ------------------------------------------------------------- */
function startLevel(levelIndex) {
  state.levelIndex = levelIndex;
  state.problemIndex = 0;
  state.correctCount = 0;
  state.wrongCount = 0;
  state.lives = TOTAL_LIVES;
  state.startTime = Date.now();
  state.elapsedSeconds = 0;
  state.answering = false;

  const level = LEVELS[levelIndex];
  $('#pond').innerHTML = '';
  updateHUD();

  if (level.timeLimit) {
    state.timeRemaining = level.timeLimit;
    startCountdown();
  } else {
    stopCountdown();
    $('#hud-timer').hidden = true;
    $('#hud-timer-2').hidden = true;
  }

  buildWheel(level);
  showScreen('screen-wheel');
}

function startProblem(forcedTable) {
  const level = LEVELS[state.levelIndex];
  state.currentProblem = generateProblem(level, forcedTable);
  state.answering = false;
  renderProblem();
  showScreen('screen-quiz');
}

function renderProblem() {
  const problem = state.currentProblem;
  $('#problem-text').textContent = problem.text;
  $('#feedback').textContent = '';
  $('#feedback').className = 'feedback';

  const choices = generateChoices(problem);
  const grid = $('#answers-grid');
  grid.innerHTML = '';

  choices.forEach(value => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = value;
    btn.setAttribute('aria-label', `Respuesta ${value}`);
    btn.addEventListener('click', () => handleAnswer(value, btn));
    grid.appendChild(btn);
  });

  updateHUD();
}

function handleAnswer(selectedValue, btnEl) {
  if (state.answering) return;
  state.answering = true;

  const problem = state.currentProblem;
  const isCorrect = selectedValue === problem.answer;
  const allButtons = $all('.answer-btn');
  allButtons.forEach(b => (b.disabled = true));

  const feedback = $('#feedback');

  if (isCorrect) {
    btnEl.classList.add('correct');
    state.correctCount++;
    AudioFX.correct();
    feedback.textContent = pickRandom([
      '¡Genial! 🎉', '¡Excelente pesca! 🐟', '¡Correcto! 🌟', '¡Así se hace! 👏'
    ]);
    feedback.classList.add('feedback-good');
    addFishToPond();
  } else {
    btnEl.classList.add('wrong');
    state.wrongCount++;
    state.lives--;
    AudioFX.wrong();
    feedback.textContent = `Casi... la respuesta correcta es ${problem.answer}`;
    feedback.classList.add('feedback-bad');
    allButtons.forEach(b => {
      if (Number(b.textContent) === problem.answer) b.classList.add('correct');
    });
  }

  updateHUD();

  setTimeout(() => {
    if (state.lives <= 0) {
      endLevelGameOver();
      return;
    }
    state.problemIndex++;
    if (state.problemIndex >= LEVELS[state.levelIndex].problemCount) {
      endLevelVictory();
    } else {
      showScreen('screen-wheel');
    }
  }, isCorrect ? 950 : 1500);
}

function addFishToPond() {
  const pond = $('#pond');
  const span = document.createElement('span');
  span.className = 'fish-caught';
  span.textContent = pickRandom(FISH_EMOJIS);
  pond.appendChild(span);
}

/* -------------------------------------------------------------
   9. HUD (vidas, progreso, tiempo)
   ------------------------------------------------------------- */
function updateHUD() {
  const level = LEVELS[state.levelIndex];
  const heartsStr = '❤️'.repeat(Math.max(state.lives, 0)) + '🤍'.repeat(TOTAL_LIVES - Math.max(state.lives, 0));
  const progressStr = `${Math.min(state.problemIndex + 1, level.problemCount)} / ${level.problemCount}`;
  const levelLabel = `${level.emoji} ${level.name}`;

  ['#hud-lives', '#hud-lives-2'].forEach(sel => { $(sel).textContent = heartsStr; });
  ['#hud-progress', '#hud-progress-2'].forEach(sel => { $(sel).textContent = progressStr; });
  ['#hud-level-name', '#hud-level-name-2'].forEach(sel => { $(sel).textContent = levelLabel; });
}

function startCountdown() {
  stopCountdown();
  updateTimerDisplay();
  $('#hud-timer').hidden = false;
  $('#hud-timer-2').hidden = false;

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    updateTimerDisplay();
    if (state.timeRemaining <= 0) {
      stopCountdown();
      endLevelGameOver(true);
    }
  }, 1000);
}

function stopCountdown() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const t = state.timeRemaining;
  const mins = Math.floor(t / 60).toString().padStart(1, '0');
  const secs = (t % 60).toString().padStart(2, '0');
  const text = `⏱️ ${mins}:${secs}`;
  ['#hud-timer', '#hud-timer-2'].forEach(sel => {
    const el = $(sel);
    el.textContent = text;
    el.classList.toggle('warning', t <= 20);
  });
}

/* -------------------------------------------------------------
   10. FIN DE NIVEL: VICTORIA / GAME OVER
   ------------------------------------------------------------- */
function calculateStars() {
  const total = state.correctCount + state.wrongCount;
  const accuracy = total > 0 ? state.correctCount / total : 0;
  const usedAllLives = state.lives <= 0;
  if (usedAllLives) return 1;
  if (accuracy >= 0.9 && state.wrongCount <= 1) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
}

function endLevelVictory() {
  stopCountdown();
  state.elapsedSeconds = Math.round((Date.now() - state.startTime) / 1000);

  const stars = calculateStars();
  const progress = unlockLevel(state.levelIndex, stars);

  $('#stat-correct').textContent = state.correctCount;
  $('#stat-wrong').textContent = state.wrongCount;
  $('#stat-time').textContent = `${state.elapsedSeconds}s`;

  $all('#stars-row .star').forEach((starEl, i) => {
    starEl.classList.toggle('earned', i < stars);
  });

  const messages = {
    3: ['¡Eres un pescador experto de las tablas! 🏆', '¡Increíble! Dominas esta tabla al 100% 🌟'],
    2: ['¡Muy buen trabajo! Sigue practicando para 3 estrellas ⭐', '¡Vas muy bien! Un poco más de práctica y serás experto 🎣'],
    1: ['¡Completaste el nivel! Sigue practicando 💪', '¡Buen esfuerzo! Cada intento te hace mejor 🐠']
  };
  $('#victory-message').textContent = pickRandom(messages[stars]);

  const nextBtn = $('#btn-next-level');
  const isLastLevel = state.levelIndex >= LEVELS.length - 1;
  nextBtn.hidden = isLastLevel;
  nextBtn.style.display = isLastLevel ? 'none' : '';

  launchConfetti();
  AudioFX.win();
  showScreen('screen-victory');
  renderLevelGrid(); // refresca candados/estrellas del menú
}

function endLevelGameOver(byTimeout) {
  stopCountdown();
  $('#stat-correct-go').textContent = state.correctCount;
  $('#stat-wrong-go').textContent = state.wrongCount;
  $('#gameover-message').textContent = byTimeout
    ? '¡Se acabó el tiempo! Los pescadores expertos también necesitan práctica. Inténtalo de nuevo. ⏱️'
    : 'No te preocupes, ¡cada pescador experto también falla! Inténtalo de nuevo. 🌊';
  showScreen('screen-gameover');
}

function launchConfetti() {
  const container = $('#confetti');
  container.innerHTML = '';
  const pieces = ['🎉', '⭐', '🐟', '🎊', '💙', '🟡'];
  for (let i = 0; i < 26; i++) {
    const span = document.createElement('span');
    span.textContent = pickRandom(pieces);
    span.style.left = `${randInt(0, 100)}%`;
    span.style.animationDelay = `${(Math.random() * 0.6).toFixed(2)}s`;
    span.style.fontSize = `${randInt(14, 26)}px`;
    container.appendChild(span);
  }
}

/* -------------------------------------------------------------
   11. MENÚ PRINCIPAL: SELECCIÓN DE NIVEL
   ------------------------------------------------------------- */
let selectedLevelIndex = 0;

function renderLevelGrid() {
  const progress = loadProgress();
  const grid = $('#level-grid');
  grid.innerHTML = '';

  LEVELS.forEach((level, i) => {
    const isUnlocked = progress.unlocked.includes(i);
    const stars = progress.stars[i] || 0;

    const btn = document.createElement('button');
    btn.className = 'level-btn' + (isUnlocked ? '' : ' locked') + (i === selectedLevelIndex ? ' selected' : '');
    btn.dataset.level = i;
    btn.disabled = !isUnlocked;

    if (isUnlocked) {
      btn.innerHTML = `
        <span class="level-emoji">${level.emoji}</span>
        <span>${level.name}</span>
        <span class="level-sub">${level.subtitle}</span>
        <span class="level-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
      `;
      btn.addEventListener('click', () => {
        selectedLevelIndex = i;
        AudioFX.click();
        renderLevelGrid();
      });
    } else {
      btn.innerHTML = `
        <span class="lock-icon">🔒</span>
        <span>${level.name}</span>
        <span class="level-sub">Completa el nivel anterior</span>
      `;
    }
    grid.appendChild(btn);
  });
}

/* -------------------------------------------------------------
   12. EVENTOS DE INTERFAZ
   ------------------------------------------------------------- */
function initEvents() {
  $('#btn-play').addEventListener('click', () => {
    AudioFX.click();
    startLevel(selectedLevelIndex);
  });

  $('#btn-spin').addEventListener('click', () => {
    $('#btn-spin').disabled = true;
    spinWheel();
    setTimeout(() => { $('#btn-spin').disabled = false; }, 3400);
  });

  $('#btn-how-to-play').addEventListener('click', () => showScreen('screen-help'));
  $('#btn-help-back').addEventListener('click', () => showScreen('screen-start'));

  $('#btn-retry').addEventListener('click', () => startLevel(state.levelIndex));
  $('#btn-retry-go').addEventListener('click', () => startLevel(state.levelIndex));

  $('#btn-next-level').addEventListener('click', () => {
    const next = Math.min(state.levelIndex + 1, LEVELS.length - 1);
    startLevel(next);
  });

  $('#btn-menu-from-victory').addEventListener('click', backToMenu);
  $('#btn-menu-from-gameover').addEventListener('click', backToMenu);

  $('#btn-reset-progress').addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar todo tu progreso guardado?')) {
      localStorage.removeItem(STORAGE_KEY);
      selectedLevelIndex = 0;
      renderLevelGrid();
    }
  });
}

function backToMenu() {
  stopCountdown();
  renderLevelGrid();
  showScreen('screen-start');
}

/* -------------------------------------------------------------
   13. INICIALIZACIÓN
   ------------------------------------------------------------- */
function init() {
  renderLevelGrid();
  initEvents();
  showScreen('screen-start');
}

document.addEventListener('DOMContentLoaded', init);
