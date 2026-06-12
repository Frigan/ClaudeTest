/* ================================================================
   ROYAL RUMBLE SIMULATOR — app.js
   ================================================================ */

// ── Style advantage loop: key beats its value ──────────────────
const STYLE_BEATS = {
  Powerhouse:  'Brawler',
  Brawler:     'High-Flyer',
  'High-Flyer':'Technical',
  Technical:   'Powerhouse',
};

const STYLE_COLOR = {
  Powerhouse:  '#e63946',
  Brawler:     '#f4a261',
  'High-Flyer':'#2ec4b6',
  Technical:   '#74b9ff',
};

// ── Nickname pool ──────────────────────────────────────────────
const NICKNAMES = [
  'The Bone Crusher', 'The Architect of Chaos', 'The Iron Fist',
  'The Widowmaker', 'The Human Wrecking Ball', 'The Apex Predator',
  'The Destroyer', 'The Machine', 'The Nightmare', 'The Executioner',
  'The Juggernaut', 'The Phenom', 'The Viper', 'The Colossus',
  'The Beast Incarnate', 'The Centurion', 'The Masterpiece',
  'The Showstopper', 'The Living Legend', 'The Last Outlaw',
  'The Ironclad Menace', 'The Godfather of Chaos', 'The Warhorse',
  'The Franchise', 'The Crippler', 'The Natural',
];

// ── Commentary arrays ──────────────────────────────────────────
const CATCHPHRASES = [
  'BAH GAWD!',
  'AS GOD AS MY WITNESS, THAT MAN HAS A FAMILY!',
  'BUSINESS IS ABOUT TO PICK UP!',
  'SOMEBODY STOP THE DAMN MATCH!',
  'WILL YOU STOP?!',
  "IT'S A SLOBBERKNOCKER!",
  "HE'S BEEN BROKEN IN HALF!",
  'Unbelievable sequence! I have never seen anything like that!',
  'Somewhere Jack Tunney is smiling!',
  'THIS IS AWESOME! THIS IS AWESOME!',
  'The roof is about to come off this place!',
  "I've never seen anything like this in my entire life!",
  'What a maneuver!',
  'The crowd is absolutely ELECTRIC tonight!',
  'Can you IMAGINE the scenes right now?!',
  'This is why we LOVE professional wrestling!',
];

const ACTION_TEMPLATES = [
  '{A} drives {D} back into the turnbuckle with THUNDEROUS right hands!',
  '{A} measures {D} — and CONNECTS with a massive running clothesline!',
  '{D} reverses! A desperate counter that keeps them alive!',
  '{A} goes for the elimination — {D} HANGS ON with everything they have!',
  '{D} is fighting with the heart of a CHAMPION right now!',
  '{A} is absolutely relentless tonight, folks!',
  'The crowd goes BERSERK as {A} and {D} trade vicious blows!',
  '{A} with a THUNDEROUS shot — {D} staggers — nearly goes over!',
  '{D} ducks! {A} nearly eliminates THEMSELVES! This crowd LOVES it!',
  '{A} locks in a submission attempt — no rope breaks in a Royal Rumble!',
  '{D} SOMEHOW survives! How?! For the love of God, HOW?!',
  '{A} going old school — methodically grinding {D} down!',
  'WHAT A SEQUENCE from {A} and {D}! The crowd cannot believe it!',
  '{A} with a signature maneuver — the ring SHAKES from the impact!',
  '{D} is showing incredible resilience and heart right now!',
  'This crowd is SPLIT DOWN THE MIDDLE between {A} and {D}!',
  '{A} HAS {D} over the top — NO! {D} skins the cat back in!',
  'A MASSIVE spine-on-pine from {A} drives {D} into the corner!',
  '{D} is rocked! They are wobbling! Can they possibly survive?!',
  '{A} smells blood — they are going in for the KILL!',
  "The chemistry between {A} and {D} is absolutely ELECTRIC tonight!",
  '{A} with a running charge — {D} side-steps! BRILLIANT ring awareness!',
  'BACK AND FORTH — {A}! No — {D}! No — {A} again! This crowd is on its feet!',
  '{A} attempting to muscle {D} over — {D} WILL NOT give up the ropes!',
  'Shades of greatness from {A} as they target the legs of {D}!',
];

const NEAR_ELIM_TEMPLATES = [
  '{A} has {D} teetering on the apron — ONE FOOT NEARLY ON THE FLOOR!',
  '{D} is hanging by their FINGERNAILS over the apron! Both feet dangling!',
  '{A} DUMPS {D} — but they catch the top rope with one hand! UNBELIEVABLE!',
  'THIS IS IT FOR {D}… NO! They drag themselves back in! The crowd ERUPTS!',
  '{D} on the apron — {A} charges — {D} SKINS THE CAT! STILL ALIVE!',
  'OH MY GOD — {D} just hung on by one hand from the top rope! INCREDIBLE!',
  '{A} with the HURRICANRANA attempt — {D} hooks the ropes on the way down!',
  'BOTH COMPETITORS on the apron now — THIS IS INSANE! Either one could go!',
];

const ELIM_TEMPLATES = [
  '{A} LAUNCHES {D} over the top rope and DOWN TO THE FLOOR! ELIMINATED!',
  'OVER THE TOP ROPE — DOWN TO THE FLOOR! {D} has been eliminated by {A}!',
  '{A} with the MASSIVE elimination — {D} is GONE from this Rumble!',
  "{A} DUMPS {D} TO THE OUTSIDE! See ya — wouldn't wanna be ya!",
  'OH! {D} never saw it coming! Eliminated by {A}! OUT OF HERE!',
  '{D} is OUTTA HERE! {A} with the HUGE elimination! What a moment!',
  '{A} FINALLY does it — {D} hits the floor! ELIMINATED! The crowd EXPLODES!',
  'THREE HUNDRED AND SIXTY DEGREES and {D} flies over — eliminated by {A}!',
];

const ENTRANCE_TEMPLATES = [
  'The crowd ERUPTS as {W} makes their way to the ring!',
  'Entrant number {N} is {W} — and they mean BUSINESS tonight!',
  'HERE COMES {W}! The place is absolutely ELECTRIC right now!',
  '{W} storms down the aisle, eyes focused, ready for total WAR!',
  'LISTEN TO THAT REACTION as {W} slides under the bottom rope!',
  'Number {N} is here — it is {W} — and they look READY!',
];

const WIN_TEMPLATES = [
  'WE HAVE A WINNER! {W} HAS WON THE ROYAL RUMBLE!',
  '{W} IS THE LAST ONE STANDING! THEY HAVE WON THE ROYAL RUMBLE!',
  'OH MY GOD! {W} HAS DONE IT! THE ROYAL RUMBLE IS OVER!',
  'LISTEN TO THIS CROWD! {W} IS YOUR ROYAL RUMBLE WINNER!',
  'UNBELIEVABLE! {W} HAS SURVIVED THE ENTIRE FIELD AND WON!',
];

const INTERFERENCE_TEMPLATES = [
  "WAIT A MINUTE! IS THAT {I}?! They're coming through the crowd!",
  "OH MY GOD! {I} is CHARGING down the ramp — THIS IS ABSOLUTE CHAOS!",
  "NOBODY EXPECTED THIS! {I} has just cost {V} EVERYTHING!",
  "What in the world?! {I} has stormed the ring — the referee has LOST ALL CONTROL!",
];

const ELIMINATION_METHODS = [
  'massive clothesline over the top rope',
  'back body drop to the floor',
  'running charge over the apron',
  'brutal overhead suplex over the ropes',
  'desperation throw over the ropes',
  'relentless assault that sent them flying',
  'perfectly-timed elimination move',
  'stunning reversal and a shove to the floor',
];

const THIRD_WHEEL_LINES = [
  'Meanwhile {C} lurks in the corner, waiting for the perfect moment to strike…',
  '{C} is stalking both competitors — biding their time like a true ring general!',
  'Do NOT forget {C} is still in this match — watching every move!',
  '{C} circles the ring like a shark, letting the others do the damage!',
];

// ================================================================
// STATE
// ================================================================

let allWrestlers  = [];   // historical data from API
let rumbleRoster  = [];   // wrestlers added to THIS rumble
let inRing        = [];
let eliminated    = [];   // { wrestler, eliminatedBy, method, placement }
let entryQueue    = [];   // shuffled order
let entryIndex    = 0;
let rumbleRunning = false;
let entrantTimer  = null;
let finalTwoAnnounced = false;

// ================================================================
// UTILITIES
// ================================================================

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

function display(w) {
  if (!w) return 'Unknown';
  return w.nickname ? `${w.name} "${w.nickname}"` : w.name;
}

function hasAdvantage(attacker, defender) {
  return STYLE_BEATS[attacker.style] === defender.style;
}

function elimOdds(attacker, defender) {
  if (hasAdvantage(attacker, defender)) return 0.65;
  if (hasAdvantage(defender, attacker)) return 0.35;
  return 0.50;
}

// ================================================================
// API
// ================================================================

async function fetchWrestlers() {
  const res = await fetch('/api/wrestlers');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

async function saveResults(updates) {
  await fetch('/api/wrestlers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

// ================================================================
// UI HELPERS
// ================================================================

function addComment(text, cls = '') {
  const box = document.getElementById('commentary-content');
  const p = document.createElement('p');
  p.className = 'commentary-line' + (cls ? ' ' + cls : '');
  p.textContent = text;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

function addDivider() {
  const box = document.getElementById('commentary-content');
  const hr = document.createElement('hr');
  hr.className = 'commentary-divider';
  box.appendChild(hr);
}

function updateInRingDisplay() {
  const el = document.getElementById('in-ring-list');
  const count = document.getElementById('ring-count');
  count.textContent = inRing.length;
  el.innerHTML = inRing.map(w => `
    <div class="ring-wrestler" style="border-left-color:${STYLE_COLOR[w.style]}">
      <span class="wrestler-name">${w.name}</span>
      <span class="wrestler-style" style="color:${STYLE_COLOR[w.style]}">${w.style}</span>
    </div>
  `).join('');
}

function updateNextEntrantsDisplay() {
  const el = document.getElementById('next-list');
  const upcoming = entryQueue.slice(entryIndex, entryIndex + 3);
  if (upcoming.length === 0) {
    el.innerHTML = '<div class="no-next">No more entrants</div>';
    return;
  }
  el.innerHTML = upcoming.map((w, i) => `
    <div class="next-wrestler ${i === 0 ? 'next-up' : ''}">
      ${i === 0 ? '▶ ' : `${i + 1}. `}${w.name}
      <span style="color:${STYLE_COLOR[w.style]};font-size:0.7rem"> [${w.style}]</span>
    </div>
  `).join('');
}

function updateStatsDisplay() {
  const remaining = rumbleRoster.length - eliminated.length;
  document.getElementById('remaining-count').textContent = remaining;
  document.getElementById('eliminated-stat').textContent =
    `${eliminated.length} eliminated`;
}

function addToTicker(victimDisplay, eliminatorName) {
  const content = document.getElementById('ticker-content');
  const span = document.createElement('span');
  span.className = 'ticker-item';
  span.textContent = `${victimDisplay} [by: ${eliminatorName}]`;
  content.appendChild(span);
  // Auto-scroll ticker to end
  const track = document.getElementById('ticker-bar').querySelector('.ticker-track');
  track.scrollLeft = track.scrollWidth;
}

function updateRosterDisplay() {
  const list  = document.getElementById('roster-list');
  const count = document.getElementById('roster-count');
  count.textContent = rumbleRoster.length;
  list.innerHTML = rumbleRoster.map(w => {
    const hist    = w.lastRumble;
    const histTxt = hist ? `Last: ${ordinal(hist.placement)} place` : 'Debut';
    return `
      <div class="roster-item" data-style="${w.style}">
        <span class="roster-name">${w.name}${w.nickname
          ? ` <em>"${w.nickname}"</em>` : ''}</span>
        <span class="roster-style" style="color:${STYLE_COLOR[w.style]}">${w.style}</span>
        <span class="roster-hist">${histTxt}</span>
      </div>
    `;
  }).join('');
  document.getElementById('start-btn').disabled = rumbleRoster.length < 2;
}

// ================================================================
// NARRATIVE ENGINE
// ================================================================

async function entranceCommentary(wrestler, entrantNumber) {
  const template = pick(ENTRANCE_TEMPLATES);
  addComment(fill(template, { W: display(wrestler), N: entrantNumber }), 'entrance-line');

  // Historical reference (if has rumble history)
  if (wrestler.lastRumble) {
    const h = wrestler.lastRumble;
    await sleep(1400);
    let histLine;
    if (h.placement === 1) {
      histLine = `You'll remember ${display(wrestler)} WON the last Royal Rumble — can they make it back-to-back?!`;
    } else if (h.eliminatedBy) {
      histLine = `You'll remember they finished ${ordinal(h.placement)} last time, eliminated by ${h.eliminatedBy} with a ${h.method}! Does ${wrestler.name} get REVENGE tonight?!`;
    } else {
      histLine = `They finished ${ordinal(h.placement)} last time — looking to go one better tonight!`;
    }
    addComment(histLine, 'history-line');
  }

  // Occasional catchphrase on entrance
  if (Math.random() < 0.25) {
    await sleep(900);
    addComment(pick(CATCHPHRASES), 'catchphrase-line');
  }
}

function actionLine(attacker, defender) {
  const template = pick(ACTION_TEMPLATES);
  addComment(fill(template, { A: display(attacker), D: display(defender) }));
}

async function eliminationSequence(attacker, defender) {
  const numLines = 3 + Math.floor(Math.random() * 3); // 3–5 lines

  for (let i = 0; i < numLines; i++) {
    await sleep(2000 + Math.random() * 1200);

    if (!rumbleRunning) return;
    // Ensure both are still in the ring (could change during awaits)
    if (!inRing.find(w => w.name === attacker.name) ||
        !inRing.find(w => w.name === defender.name)) return;

    if (i === numLines - 1) {
      // Last line before elimination: near-elim
      addComment(
        fill(pick(NEAR_ELIM_TEMPLATES), { A: display(attacker), D: display(defender) }),
        'near-elim-line'
      );
    } else {
      actionLine(attacker, defender);

      // 20% chance to namedrop a third wrestler
      if (inRing.length >= 3 && Math.random() < 0.20) {
        const third = inRing.find(w => w.name !== attacker.name && w.name !== defender.name);
        if (third) addComment(fill(pick(THIRD_WHEEL_LINES), { C: display(third) }), 'catchphrase-line');
      }

      // Occasional catchphrase mid-sequence
      if (Math.random() < 0.15) {
        addComment(pick(CATCHPHRASES), 'catchphrase-line');
      }
    }
  }

  await sleep(1800);
  if (!rumbleRunning) return;
  if (!inRing.find(w => w.name === attacker.name) ||
      !inRing.find(w => w.name === defender.name)) return;

  // ── Interference check (5%) ──────────────────────────────────
  if (Math.random() < 0.05) {
    const interferer = pickInterferer(attacker, defender);
    if (interferer) {
      await runInterference(interferer, defender, attacker);
      return;
    }
  }

  // ── Resolve based on style odds ──────────────────────────────
  const attackerWins = Math.random() < elimOdds(attacker, defender);

  let winner, loser;
  if (attackerWins) {
    winner = attacker; loser = defender;
  } else {
    addComment(
      `${display(defender)} REVERSES! ${display(attacker)} is now in GRAVE DANGER!`,
      'reversal-line'
    );
    await sleep(1600);
    winner = defender; loser = attacker;
  }

  // Check both still in ring after the reversal pause
  if (!inRing.find(w => w.name === winner.name) ||
      !inRing.find(w => w.name === loser.name)) return;

  addComment(
    fill(pick(ELIM_TEMPLATES), { A: display(winner), D: display(loser) }),
    'elimination-line'
  );
  await sleep(1200);

  doElimination(loser, winner, pick(ELIMINATION_METHODS));
}

async function runInterference(interferer, victim, otherWrestler) {
  addComment(
    fill(pick(INTERFERENCE_TEMPLATES), { I: display(interferer), V: display(victim) }),
    'interference-line'
  );
  await sleep(2000);
  addComment(
    `${display(interferer)} WITH THE SNEAK ATTACK — ${display(victim)} GOES OVER THE TOP ROPE! ELIMINATED!`,
    'elimination-line'
  );
  await sleep(1200);

  const credName = interferer.name + ' (interference)';
  doElimination(victim, { name: credName }, pick(ELIMINATION_METHODS));

  addComment(
    `The referee cannot do anything — outside interference is PERFECTLY LEGAL in a Royal Rumble! ${display(otherWrestler)} is absolutely FURIOUS!`
  );
}

function pickInterferer(attacker, defender) {
  const candidates = [];

  // Wrestlers previously eliminated in this match
  for (const e of eliminated) {
    if (e.wrestler.name !== attacker.name && e.wrestler.name !== defender.name) {
      candidates.push(e.wrestler);
    }
  }

  // Historical wrestlers NOT in this rumble
  for (const w of allWrestlers) {
    const inThisRumble = rumbleRoster.some(r => r.name.toLowerCase() === w.name.toLowerCase());
    if (!inThisRumble &&
        w.name !== attacker.name &&
        w.name !== defender.name) {
      candidates.push({ ...w, nickname: w.nickname || null });
    }
  }

  return candidates.length > 0 ? pick(candidates) : null;
}

// ================================================================
// SIMULATION CORE
// ================================================================

function doElimination(victim, eliminator, method) {
  const idx = inRing.findIndex(w => w.name === victim.name);
  if (idx === -1) return; // already gone

  inRing.splice(idx, 1);

  const placement = rumbleRoster.length - eliminated.length;
  eliminated.push({ wrestler: victim, eliminatedBy: eliminator.name, method, placement });

  addToTicker(display(victim), eliminator.name);
  updateInRingDisplay();
  updateStatsDisplay();

  // Let a waiting entrant in after a short pause
  if (entryIndex < entryQueue.length) {
    setTimeout(() => {
      if (rumbleRunning && inRing.length < 6 && entryIndex < entryQueue.length) {
        enterWrestler();
      }
    }, 3500);
  }
}

async function enterWrestler() {
  if (entryIndex >= entryQueue.length) return;
  if (inRing.length >= 6) return;

  const wrestler = entryQueue[entryIndex];
  entryIndex++;
  inRing.push(wrestler);

  updateInRingDisplay();
  updateNextEntrantsDisplay();
  updateStatsDisplay();

  await entranceCommentary(wrestler, entryIndex);
}

async function actionLoop() {
  let ticksSinceElim = 0;

  while (rumbleRunning) {
    await sleep(2200 + Math.random() * 1600);
    if (!rumbleRunning) break;

    // ── Win condition ──────────────────────────────────────────
    if (inRing.length === 1 && entryIndex >= entryQueue.length) {
      await endRumble();
      break;
    }
    if (inRing.length === 0) break;
    if (inRing.length < 2) continue;

    // ── Final-two announcement ─────────────────────────────────
    if (inRing.length === 2 && entryIndex >= entryQueue.length && !finalTwoAnnounced) {
      finalTwoAnnounced = true;
      addDivider();
      addComment('WE ARE DOWN TO THE FINAL TWO COMPETITORS! IT ALL COMES DOWN TO THIS!', 'special-line');
      addDivider();
      await sleep(2000);
    }

    ticksSinceElim++;

    // ── Pick a pair ────────────────────────────────────────────
    const shuffled = shuffle(inRing);
    const attacker = shuffled[0];
    const defender = shuffled[1];

    // ── Decide: action line or elimination attempt ─────────────
    const ringFull   = inRing.length >= 6 && entryIndex < entryQueue.length;
    const elimThresh = inRing.length >= 5 ? 3 : (inRing.length >= 4 ? 4 : 6);
    const goForElim  = ringFull || ticksSinceElim >= elimThresh || Math.random() < 0.28;

    if (goForElim) {
      ticksSinceElim = 0;
      await eliminationSequence(attacker, defender);
    } else {
      actionLine(attacker, defender);
      if (Math.random() < 0.12) {
        addComment(pick(CATCHPHRASES), 'catchphrase-line');
      }
    }
  }
}

function startEntrantTimer() {
  // First entrant enters immediately
  enterWrestler();

  entrantTimer = setInterval(() => {
    if (!rumbleRunning) {
      clearInterval(entrantTimer);
      return;
    }
    if (entryIndex < entryQueue.length && inRing.length < 6) {
      enterWrestler();
    }
    if (entryIndex >= entryQueue.length) {
      clearInterval(entrantTimer);
    }
  }, 10000);
}

async function endRumble() {
  rumbleRunning = false;
  clearInterval(entrantTimer);

  const winner = inRing[0];
  if (!winner) return;

  await sleep(800);
  addDivider();
  addComment(fill(pick(WIN_TEMPLATES), { W: display(winner) }), 'win-line');
  await sleep(1800);
  addComment(
    `${display(winner)} raises their arms in TRIUMPH! An incredible performance tonight — one for the history books!`,
    'win-line'
  );

  // Record the winner (placement 1)
  eliminated.push({ wrestler: winner, eliminatedBy: null, method: null, placement: 1 });

  // Build and POST results
  const results = [...eliminated].map(e => ({
    name:       e.wrestler.name,
    style:      e.wrestler.style,
    nickname:   e.wrestler.nickname || null,
    lastRumble: {
      placement:   e.placement,
      eliminatedBy: e.eliminatedBy
        ? e.eliminatedBy.replace(' (interference)', '')
        : null,
      method: e.method || null,
    },
  }));

  await saveResults(results);
  await sleep(600);
  addComment('Results saved to the historical record. See you at the NEXT Royal Rumble!', 'system-line');
}

// ================================================================
// SETUP FLOW
// ================================================================

async function addWrestlerToRoster() {
  const nameEl  = document.getElementById('name-input');
  const styleEl = document.getElementById('style-select');
  const name    = nameEl.value.trim();
  const style   = styleEl.value;

  if (!name || !style) {
    nameEl.focus();
    return;
  }

  if (rumbleRoster.some(w => w.name.toLowerCase() === name.toLowerCase())) {
    alert(`${name} is already on the roster!`);
    return;
  }

  const historical = allWrestlers.find(
    w => w.name.toLowerCase() === name.toLowerCase()
  );

  const wrestler = {
    name,
    style,
    nickname:   historical?.nickname  || null,
    lastRumble: historical?.lastRumble || null,
  };

  rumbleRoster.push(wrestler);
  updateRosterDisplay();

  nameEl.value  = '';
  styleEl.value = '';
  nameEl.focus();
}

async function startRumble() {
  // Assign nicknames (12% chance) for wrestlers who don't have one
  for (const w of rumbleRoster) {
    if (!w.nickname && Math.random() < 0.12) {
      w.nickname = pick(NICKNAMES);
    }
  }

  entryQueue = shuffle(rumbleRoster);
  entryIndex = 0;
  inRing     = [];
  eliminated = [];
  finalTwoAnnounced = false;

  // Switch screens
  document.getElementById('setup-screen').hidden  = true;
  document.getElementById('rumble-screen').hidden = false;
  document.getElementById('ticker-bar').hidden    = false;

  updateNextEntrantsDisplay();
  updateStatsDisplay();

  // Pre-show commentary
  addComment('LADIES AND GENTLEMEN — WELCOME TO THE ROYAL RUMBLE!', 'opening-line');
  await sleep(1400);
  addComment(
    `${rumbleRoster.length} SUPERSTARS will enter this ring tonight, but only ONE will survive!`,
    'opening-line'
  );

  // Name-drop veterans
  const veterans = rumbleRoster.filter(w => w.lastRumble);
  if (veterans.length > 0) {
    await sleep(1400);
    const names = veterans.map(v => display(v)).join(', ');
    addComment(`Returning veterans in tonight's field include: ${names}!`, 'history-line');
  }

  await sleep(1600);
  addDivider();
  addComment("LET'S GET THIS PARTY STARTED!", 'opening-line');
  await sleep(1200);
  addDivider();

  // Launch simulation
  rumbleRunning = true;
  startEntrantTimer();
  actionLoop();
}

// ================================================================
// INIT
// ================================================================

document.addEventListener('DOMContentLoaded', async () => {
  try {
    allWrestlers = await fetchWrestlers();
  } catch {
    allWrestlers = [];
    console.warn('Could not load historical data — starting fresh.');
  }

  document.getElementById('add-btn').addEventListener('click', addWrestlerToRoster);

  document.getElementById('name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addWrestlerToRoster();
  });

  document.getElementById('start-btn').addEventListener('click', startRumble);
});
