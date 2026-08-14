/* =========================================================
   PESCA DE NÚMEROS — Hoja de estilos principal
   Tema: aventura marina | Paleta: pastel alegre
   ========================================================= */

:root {
  /* Paleta pastel */
  --sky:        #7ECBE8;
  --sky-deep:   #4FB3D9;
  --aqua:       #4ECDC4;
  --aqua-deep:  #2FB6AC;
  --sun:        #FFD93D;
  --sun-deep:   #F5B700;
  --orange:     #FFB570;
  --orange-deep:#FF9A4D;
  --coral:      #FF6B6B;
  --coral-deep: #F14C4C;
  --ink:        #274156;
  --ink-soft:   #3E5C76;
  --white:      #FFFFFF;
  --cream:      #FFFDF6;
  --success:    #4CD787;
  --wood:       #C88B4A;
  --wood-deep:  #A96A2E;
  --shadow:     0 6px 0 rgba(39, 65, 86, 0.15);

  --radius-lg: 28px;
  --radius-md: 18px;
  --radius-sm: 12px;

  --font-display: 'Baloo 2', system-ui, sans-serif;
  --font-body: 'Nunito', system-ui, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

body {
  font-family: var(--font-body);
  color: var(--ink);
  background: linear-gradient(180deg, #BEE7F5 0%, #8FD3E8 45%, #6FC3DE 100%);
  overflow-x: hidden;
  position: relative;
}

h1, h2, h3, .btn, .hud-item, .problem-text, .stat-value {
  font-family: var(--font-display);
}

/* =========================================================
   FONDO OCEÁNICO DECORATIVO
   ========================================================= */
.ocean-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 22vh;
  min-height: 140px;
}
.wave path { fill: rgba(255,255,255,0.35); }
.wave-front path { fill: rgba(255,255,255,0.5); }
.wave-back { animation: wave-drift 12s ease-in-out infinite; opacity: .7; }
.wave-front { animation: wave-drift 8s ease-in-out infinite reverse; }

@keyframes wave-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-3%); }
}

.bubble {
  position: absolute;
  bottom: -40px;
  font-size: 1.4rem;
  opacity: 0.55;
  animation: rise 9s linear infinite;
}
.b1 { left: 12%; animation-delay: 0s; }
.b2 { left: 55%; animation-delay: 3s; font-size: 1rem; }
.b3 { left: 80%; animation-delay: 6s; font-size: 1.8rem; }

@keyframes rise {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .wave-back, .wave-front, .bubble { animation: none !important; }
}

/* =========================================================
   LAYOUT GENERAL
   ========================================================= */
#app {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 80px;
}

.screen {
  display: none;
  width: 100%;
  max-width: 640px;
}
.screen.active {
  display: block;
  animation: screen-in .35s ease both;
}

@keyframes screen-in {
  from { opacity: 0; transform: translateY(14px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.card {
  position: relative;
  background: var(--cream);
  border-radius: var(--radius-lg);
  padding: 28px 24px 32px;
  box-shadow: 0 14px 0 rgba(39,65,86,0.12), 0 20px 40px rgba(39,65,86,0.18);
  border: 4px solid var(--white);
  text-align: center;
}

.site-footer {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--ink-soft);
  font-size: .85rem;
  padding-bottom: 18px;
  opacity: 0.8;
}

/* Botón "Menú" presente en las pantallas de juego */
.btn-back {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 5;
  background: var(--white);
  border: none;
  border-radius: 100px;
  padding: 7px 14px;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: .82rem;
  color: var(--ink-soft);
  cursor: pointer;
  box-shadow: 0 3px 0 rgba(39,65,86,0.15);
}
.btn-back:active { transform: translateY(2px); box-shadow: none; }

/* =========================================================
   PANTALLA DE INICIO
   ========================================================= */
.game-title {
  font-size: clamp(1.8rem, 6vw, 2.6rem);
  font-weight: 800;
  color: var(--sky-deep);
  margin: 4px 0 6px;
  text-shadow: 2px 2px 0 rgba(255,255,255,0.6);
}
.title-fish { display: inline-block; animation: bob 2.4s ease-in-out infinite; }
@keyframes bob { 0%,100%{ transform: translateY(0) rotate(0deg);} 50%{ transform: translateY(-6px) rotate(-6deg);} }

.game-subtitle {
  font-size: 1rem;
  color: var(--ink-soft);
  margin: 0 0 22px;
  font-weight: 700;
}

.section-label {
  font-size: 1.05rem;
  color: var(--ink);
  margin: 0 0 14px;
  font-weight: 800;
}

.level-select { margin-bottom: 22px; }

.level-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.level-btn {
  position: relative;
  border: none;
  border-radius: var(--radius-md);
  padding: 16px 10px 14px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  color: var(--white);
  box-shadow: var(--shadow);
  transition: transform .12s ease, box-shadow .12s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.level-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 rgba(39,65,86,0.15); }
.level-btn .level-emoji { font-size: 1.6rem; }
.level-btn .level-sub { font-size: .72rem; font-weight: 600; opacity: .9; }

.level-btn[data-level="0"] { background: linear-gradient(180deg, var(--aqua) 0%, var(--aqua-deep) 100%); }
.level-btn[data-level="1"] { background: linear-gradient(180deg, var(--sky) 0%, var(--sky-deep) 100%); }
.level-btn[data-level="2"] { background: linear-gradient(180deg, var(--orange) 0%, var(--orange-deep) 100%); }
.level-btn[data-level="3"] { background: linear-gradient(180deg, var(--coral) 0%, var(--coral-deep) 100%); }

.level-btn.selected { outline: 4px solid var(--sun); outline-offset: 2px; transform: scale(1.04); }
.level-btn.locked { background: #C9D3DA; cursor: not-allowed; box-shadow: none; opacity: .8; }
.level-btn.locked:active { transform: none; }
.level-btn .lock-icon { font-size: 1.3rem; }

.level-stars { font-size: .8rem; letter-spacing: 1px; }

/* Botones generales */
.btn {
  font-family: var(--font-display);
  font-weight: 700;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
  color: var(--white);
}
.btn:active { transform: translateY(4px); }

.btn-huge {
  width: 100%;
  padding: 16px 20px;
  font-size: 1.25rem;
  background: linear-gradient(180deg, var(--sun) 0%, var(--sun-deep) 100%);
  color: var(--ink);
  box-shadow: 0 6px 0 #C98F00;
}
.btn-huge:active { box-shadow: 0 2px 0 #C98F00; }

.btn-primary {
  background: linear-gradient(180deg, var(--sky) 0%, var(--sky-deep) 100%);
  box-shadow: 0 6px 0 #2E85A8;
  padding: 14px 22px;
  font-size: 1.05rem;
}
.btn-primary:active { box-shadow: 0 2px 0 #2E85A8; }

.btn-secondary {
  background: linear-gradient(180deg, var(--aqua) 0%, var(--aqua-deep) 100%);
  box-shadow: 0 6px 0 #1F8E86;
  padding: 14px 22px;
  font-size: 1.05rem;
}
.btn-secondary:active { box-shadow: 0 2px 0 #1F8E86; }

.btn-link, .btn-link-btn {
  background: none;
  border: none;
  color: var(--sky-deep);
  font-family: var(--font-body);
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  font-size: .92rem;
  padding: 6px 10px;
}
.btn-link-muted { color: #9FB0BD; }

.start-footer {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

/* =========================================================
   PANTALLA DE AYUDA
   ========================================================= */
.section-title {
  color: var(--sky-deep);
  font-size: 1.5rem;
  margin-top: 4px;
}
.help-list {
  list-style: none;
  padding: 0;
  margin: 18px 0 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.help-list li {
  background: #EAF7FB;
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  font-weight: 700;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 10px;
}
.help-icon { font-size: 1.4rem; flex-shrink: 0; }

/* =========================================================
   HUD (encabezado del juego)
   ========================================================= */
.hud {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 30px 0 14px;
}
.hud-item {
  background: #EAF7FB;
  border-radius: 100px;
  padding: 6px 14px;
  font-weight: 700;
  font-size: .95rem;
  color: var(--ink);
}
.hud-lives { letter-spacing: 2px; }
.hud-timer { background: #FFE9D6; color: var(--orange-deep); }
.hud-timer.warning { background: #FFD6D6; color: var(--coral-deep); animation: pulse .8s infinite; }

@keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }

/* =========================================================
   RULETA
   ========================================================= */
.wheel-title {
  color: var(--sky-deep);
  margin: 4px 0 18px;
}
.wheel-wrapper {
  position: relative;
  width: min(280px, 78vw);
  aspect-ratio: 1/1;
  margin: 0 auto 24px;
}
.wheel-pointer {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  color: var(--coral-deep);
  z-index: 3;
  filter: drop-shadow(0 2px 1px rgba(0,0,0,0.2));
}
.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 8px var(--white), 0 10px 24px rgba(39,65,86,0.3);
  transition: transform 3.2s cubic-bezier(0.15, 0.85, 0.2, 1);
}
.wheel-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 54px;
  height: 54px;
  background: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.25);
  z-index: 2;
}

/* =========================================================
   ESTANQUE / BODEGA DE PROGRESO
   ========================================================= */
.pond {
  background: linear-gradient(180deg, #C9EEF7 0%, #9FDCEE 100%);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  min-height: 46px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 4px;
  margin-bottom: 16px;
  border: 3px solid var(--white);
}
.pond .fish-caught {
  font-size: 1.2rem;
  animation: pop-in .35s ease;
}
@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* =========================================================
   PREGUNTA / PROBLEMA (común a ruleta, disparo y cajas)
   ========================================================= */
.problem-box {
  background: linear-gradient(180deg, var(--sky) 0%, var(--sky-deep) 100%);
  border-radius: var(--radius-md);
  padding: 22px 16px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.problem-fish {
  position: absolute;
  font-size: 3rem;
  opacity: 0.25;
  top: -6px;
  right: -6px;
  transform: rotate(10deg);
}
.problem-text {
  color: var(--white);
  font-size: clamp(1.8rem, 8vw, 2.6rem);
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.12);
  position: relative;
}

.mode-hint {
  font-weight: 700;
  color: var(--ink-soft);
  font-size: .92rem;
  margin: 0 0 12px;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.answer-btn {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 18px 8px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--white);
  color: var(--ink);
  cursor: pointer;
  box-shadow: 0 5px 0 #D8E4EA, 0 6px 12px rgba(39,65,86,0.12);
  transition: transform .12s ease, box-shadow .12s ease, background .15s ease, color .15s ease;
}
.answer-btn:active { transform: translateY(3px); }
.answer-btn:disabled { cursor: default; }

.answer-btn.correct {
  background: var(--success);
  color: var(--white);
  box-shadow: 0 5px 0 #2FA968;
  animation: correct-pop .4s ease;
}
.answer-btn.wrong {
  background: var(--coral);
  color: var(--white);
  box-shadow: 0 5px 0 var(--coral-deep);
  animation: shake .4s ease;
}
@keyframes correct-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

.feedback {
  min-height: 34px;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--ink);
}
.feedback.feedback-good { color: #2FA968; }
.feedback.feedback-bad { color: var(--coral-deep); }

/* =========================================================
   NIVEL 2 — DISPARO SUBMARINO
   ========================================================= */
.shoot-problem { margin-bottom: 8px; }

.sea-scene {
  position: relative;
  height: 260px;
  background: linear-gradient(180deg, #6FC3DE 0%, #2E85A8 100%);
  border-radius: var(--radius-md);
  border: 3px solid var(--white);
  overflow: hidden;
  margin-bottom: 14px;
}
.sea-scene::before {
  /* Textura de burbujas/luz sutil en el agua */
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%),
              radial-gradient(circle at 80% 60%, rgba(255,255,255,0.1), transparent 45%);
  pointer-events: none;
}

.ship {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.6rem;
  filter: drop-shadow(0 4px 3px rgba(0,0,0,0.25));
  z-index: 2;
}

.target-mine {
  position: absolute;
  transform: translate(-50%, -50%);
  min-width: 52px;
  height: 52px;
  padding: 0 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #FFEFC2, var(--sun-deep) 75%);
  border: 3px solid var(--white);
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.25);
  animation: target-drift 3.4s ease-in-out infinite;
  z-index: 1;
}
.target-mine:nth-child(odd) { animation-direction: alternate; }
.target-mine:nth-child(3n) { animation-duration: 2.6s; }
.target-mine:nth-child(4n) { animation-duration: 4.1s; }

@keyframes target-drift {
  0%, 100% { margin-left: -14px; margin-top: -6px; }
  50% { margin-left: 14px; margin-top: 6px; }
}

.target-mine.hit {
  background: radial-gradient(circle, var(--success), #2FA968);
  animation: none;
  transform: translate(-50%, -50%) scale(1.25);
  opacity: 0;
  transition: transform .35s ease, opacity .35s ease;
}
.target-mine.miss {
  background: radial-gradient(circle, var(--coral), var(--coral-deep));
  animation: none;
}

.torpedo {
  position: absolute;
  font-size: 1.4rem;
  z-index: 3;
  pointer-events: none;
  transition: left .28s linear, top .28s linear;
  transform: translate(-50%, -50%);
}

.explosion {
  position: absolute;
  font-size: 1.8rem;
  z-index: 4;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.4);
  opacity: 1;
  animation: explode .45s ease forwards;
}
@keyframes explode {
  0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
  60% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
}

/* =========================================================
   NIVEL 3 — CAJAS DE CARGUERO
   ========================================================= */
.crate-scene {
  position: relative;
  background: linear-gradient(180deg, #E9D3A8 0%, var(--wood) 100%);
  border-radius: var(--radius-md);
  border: 3px solid var(--white);
  padding: 26px 16px 18px;
  margin-bottom: 14px;
  overflow: hidden;
}
.crate-deco {
  position: absolute;
  font-size: 2rem;
  opacity: 0.55;
}
.crate-deco-1 { bottom: 10px; left: 8%; transform: rotate(-8deg); }
.crate-deco-2 { bottom: 10px; right: 8%; transform: rotate(10deg); }

.crate {
  display: block;
  margin: 0 auto 10px;
  font-size: 4.4rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0 6px 4px rgba(0,0,0,0.25));
  animation: crate-bob 2.6s ease-in-out infinite;
  transition: transform .15s ease;
}
.crate:active { transform: scale(0.92); }
.crate.breaking {
  animation: crate-shake .4s ease;
}
.crate.broken {
  animation: crate-pop-out .35s ease forwards;
}

@keyframes crate-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes crate-shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  20% { transform: translateX(-6px) rotate(-4deg); }
  40% { transform: translateX(6px) rotate(4deg); }
  60% { transform: translateX(-5px) rotate(-3deg); }
  80% { transform: translateX(5px) rotate(3deg); }
}
@keyframes crate-pop-out {
  to { transform: scale(0); opacity: 0; }
}

.crate-question {
  animation: screen-in .3s ease both;
}

/* =========================================================
   VICTORIA
   ========================================================= */
.victory-title {
  color: var(--sun-deep);
  font-size: 1.7rem;
  margin: 4px 0 10px;
}
.stars-row {
  font-size: 2.6rem;
  margin-bottom: 10px;
  letter-spacing: 6px;
}
.stars-row .star { opacity: .25; display: inline-block; transition: opacity .2s ease, transform .2s ease; }
.stars-row .star.earned {
  opacity: 1;
  animation: star-pop .5s ease both;
}
@keyframes star-pop {
  0% { transform: scale(0) rotate(-30deg); }
  60% { transform: scale(1.3) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.victory-message {
  font-weight: 700;
  color: var(--ink-soft);
  margin-bottom: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 22px;
}
.gameover-card .stats-grid { grid-template-columns: repeat(2, 1fr); }

.stat {
  background: #EAF7FB;
  border-radius: var(--radius-sm);
  padding: 12px 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-value { font-size: 1.4rem; font-weight: 800; color: var(--sky-deep); }
.stat-label { font-size: .78rem; font-weight: 700; color: var(--ink-soft); }

.victory-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.confetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: var(--radius-lg);
}
.confetti span {
  position: absolute;
  top: -20px;
  font-size: 1.2rem;
  animation: confetti-fall 2.6s ease-in forwards;
}
@keyframes confetti-fall {
  to { transform: translateY(420px) rotate(320deg); opacity: 0; }
}

/* =========================================================
   GAME OVER
   ========================================================= */
.gameover-title {
  color: var(--coral-deep);
  font-size: 1.5rem;
}
.gameover-message {
  color: var(--ink-soft);
  font-weight: 700;
  margin-bottom: 18px;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (min-width: 480px) {
  .answers-grid { gap: 14px; }
  .answer-btn { font-size: 1.6rem; }
}

@media (min-width: 720px) {
  .card { padding: 40px 44px 44px; }
  .level-grid { grid-template-columns: repeat(4, 1fr); }
  .victory-actions { flex-direction: row; justify-content: center; }
  .victory-actions .btn { flex: 1; }
  .sea-scene { height: 300px; }
}

@media (max-width: 360px) {
  .card { padding: 20px 14px 26px; }
  .problem-text { font-size: 1.6rem; }
  .sea-scene { height: 220px; }
  .target-mine { min-width: 44px; height: 44px; font-size: .95rem; }
}

/* Accesibilidad: foco visible */
button:focus-visible {
  outline: 3px solid var(--sun-deep);
  outline-offset: 3px;
}
